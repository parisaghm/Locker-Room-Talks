/** Metadata for one route, shared by the runtime hook and the prerender script. */
export interface RouteOgImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface RouteArticleMeta {
  publishedTime: string;
  modifiedTime: string;
  author: string;
  section: string;
}

export interface RouteSeo {
  /** Route path as it appears in App.tsx, e.g. "/journal/some-slug". */
  path: string;
  title: string;
  description: string;
  canonical: string;
  ogType: "website" | "article";
  ogImage: RouteOgImage;
  robots: "index" | "noindex";
  article?: RouteArticleMeta;
  jsonLd: unknown[];
  /** false = keep out of sitemap.xml. */
  sitemap: false | { lastmod: string };
}
