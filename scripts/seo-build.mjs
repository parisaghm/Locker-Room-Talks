/**
 * Post-build SEO step. Runs after `vite build`.
 *
 * Reads dist/index.html as a template and writes one real HTML file per route
 * with that route's title, description, canonical, Open Graph, Twitter and
 * JSON-LD tags baked into <head>. Also emits 404.html, sitemap.xml and the
 * 1200x630 social cards.
 *
 * Why bake the head rather than rely on the runtime hook: Facebook, LinkedIn,
 * WhatsApp, Slack and X never execute JavaScript, so they only ever see the
 * HTML as served. Prerendering real files per route is also what stops Vercel
 * hard-404ing every URL except "/".
 *
 * Route metadata comes from src/seo/routes.ts -- the same module the browser
 * uses -- loaded through Vite's Node API so the "@/" alias resolves from
 * vite.config.ts. No extra dependency, no second source of truth.
 */
import { createServer } from "vite";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DIST = path.join(ROOT, "dist");
const PUBLIC = path.join(ROOT, "public");

const SEO_START = "<!-- seo:start -->";
const SEO_END = "<!-- seo:end -->";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

function fail(message) {
  console.error(`\n[seo-build] FATAL: ${message}\n`);
  process.exit(1);
}

/** Loads the shared TS SEO module through Vite so "@/" aliases resolve. */
async function loadSeoModules() {
  const server = await createServer({
    configFile: path.join(ROOT, "vite.config.ts"),
    mode: "production",
    logLevel: "warn",
    appType: "custom",
    // Without these, chokidar keeps the process alive after close() on Windows
    // and the build hangs forever.
    server: { middlewareMode: true, hmr: false, watch: null },
  });
  try {
    const routes = await server.ssrLoadModule("/src/seo/routes.ts");
    const head = await server.ssrLoadModule("/src/seo/head.ts");
    const data = await server.ssrLoadModule("/src/data/journalArticles.ts");
    return {
      seoRoutes: routes.buildRouteSeo(),
      notFound: routes.notFoundRoute(),
      ogSourceFor: routes.ogSourceFor,
      isPublished: routes.isPublished,
      renderHeadTags: head.renderHeadTags,
      articles: data.journalArticles,
    };
  } finally {
    await server.close();
  }
}

/** Swaps the marker region for this route's tags. */
function renderPage(template, seo, renderHeadTags) {
  const start = template.indexOf(SEO_START);
  const end = template.indexOf(SEO_END);
  if (start === -1 || end === -1) {
    fail(
      `dist/index.html is missing the ${SEO_START} / ${SEO_END} markers. ` +
        `Did index.html get edited without them?`
    );
  }
  return (
    template.slice(0, start) +
    SEO_START +
    "\n" +
    renderHeadTags(seo) +
    "\n\t\t" +
    template.slice(end)
  );
}

/** "/journal/x" -> "dist/journal/x/index.html"; "/" -> "dist/index.html". */
function outputPathFor(routePath) {
  if (!routePath.startsWith("/")) {
    fail(`route path must start with "/": ${routePath}`);
  }
  if (routePath === "/") return path.join(DIST, "index.html");
  const segments = routePath.slice(1).split("/");
  if (segments.some((s) => s === "" || s === "." || s === "..")) {
    fail(`malformed route path: ${routePath}`);
  }
  return path.join(DIST, ...segments, "index.html");
}

function buildSitemap(routes) {
  const entries = routes
    .filter((r) => r.sitemap !== false)
    .map((r) => {
      const lastmod = r.sitemap.lastmod
        ? `\n    <lastmod>${r.sitemap.lastmod}</lastmod>`
        : "";
      return `  <url>\n    <loc>${r.canonical}</loc>${lastmod}\n  </url>`;
    });
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries.join("\n") +
    "\n</urlset>\n"
  );
}

/**
 * Generates the 1200x630 social cards.
 *
 * Every sharp call is wrapped: sharp is a native module with platform-specific
 * optional deps, and a failure on the deploy runner must degrade (copy the
 * source through, or skip) rather than break the build.
 */
async function generateOgImages(ogSourceFor, isPublished, articles) {
  const outDir = path.join(DIST, "og");
  await fs.mkdir(outDir, { recursive: true });

  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch (error) {
    console.warn(
      `[seo-build] sharp unavailable (${error.message}); skipping OG image generation`
    );
    return;
  }

  // Brand default card: the site mark centred on the paper background.
  try {
    const mark = await fs.readFile(path.join(PUBLIC, "favicon.svg"));
    const logo = await sharp(mark, { density: 384 })
      .resize(380, 380, { fit: "contain" })
      .png()
      .toBuffer();
    await sharp({
      create: {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        channels: 3,
        background: "#F6F5F2",
      },
    })
      .composite([{ input: logo, gravity: "centre" }])
      .jpeg({ quality: 88 })
      .toFile(path.join(outDir, "default.jpg"));
    console.log("[seo-build] og/default.jpg");
  } catch (error) {
    console.warn(`[seo-build] default OG card failed: ${error.message}`);
  }

  for (const article of articles.filter(isPublished)) {
    const source = ogSourceFor(article);
    if (!source) continue;
    const from = path.join(PUBLIC, source.replace(/^\//, ""));
    const to = path.join(outDir, `${article.slug}.jpg`);
    try {
      // Treatment depends on the source shape.
      //
      // Landscape sources have height to spare, so a "cover" crop with the
      // attention strategy composes well.
      //
      // Portrait sources do not: filling 1200x630 from a 1025x1091 photo throws
      // away half the height, and every crop anchor tried cut the subject's
      // face (attention picks hair texture over faces; top clips the chin).
      // Containing the whole photo on the site's paper colour shows the full
      // image, can never decapitate anyone, and reads as a deliberate editorial
      // frame rather than a broken crop.
      const meta = await sharp(from).metadata();
      const isPortrait = (meta.height ?? 0) >= (meta.width ?? 0);
      await sharp(from)
        .resize(OG_WIDTH, OG_HEIGHT, {
          fit: isPortrait ? "contain" : "cover",
          position: isPortrait ? "centre" : "attention",
          background: "#F6F5F2",
        })
        .flatten({ background: "#F6F5F2" })
        .jpeg({ quality: 86 })
        .toFile(to);
      console.log(
        `[seo-build] og/${article.slug}.jpg (${
          isPortrait ? "portrait/contain" : "landscape/attention"
        })`
      );
    } catch (error) {
      console.warn(
        `[seo-build] OG crop failed for ${article.slug} (${error.message}); copying source`
      );
      try {
        await fs.copyFile(from, to);
      } catch (copyError) {
        console.warn(
          `[seo-build] OG fallback copy also failed for ${article.slug}: ${copyError.message}`
        );
      }
    }
  }
}

async function main() {
  const templatePath = path.join(DIST, "index.html");
  let template;
  try {
    template = await fs.readFile(templatePath, "utf8");
  } catch {
    fail("dist/index.html not found -- run `vite build` first.");
  }

  const {
    seoRoutes,
    notFound,
    ogSourceFor,
    isPublished,
    renderHeadTags,
    articles,
  } = await loadSeoModules();

  if (seoRoutes.length === 0) fail("buildRouteSeo() returned no routes.");

  for (const seo of seoRoutes) {
    const outPath = outputPathFor(seo.path);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, renderPage(template, seo, renderHeadTags));
  }
  console.log(`[seo-build] ${seoRoutes.length} route pages written`);

  // Served with a real 404 status by Vercel for any unmatched URL. The bundle
  // still boots, so React Router renders the branded NotFound page.
  await fs.writeFile(
    path.join(DIST, "404.html"),
    renderPage(template, notFound, renderHeadTags)
  );
  console.log("[seo-build] 404.html written");

  const sitemap = buildSitemap(seoRoutes);
  await fs.writeFile(path.join(DIST, "sitemap.xml"), sitemap);
  console.log(
    `[seo-build] sitemap.xml written (${
      seoRoutes.filter((r) => r.sitemap !== false).length
    } urls)`
  );

  await generateOgImages(ogSourceFor, isPublished, articles);
}

main().catch((error) => {
  console.error(error);
  fail(error.message);
});
