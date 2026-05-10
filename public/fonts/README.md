# Web fonts

**Required for tagline:** place FF Market Web in this folder so `@font-face` in `src/index.css` loads without 404:

-   **ff-market-web.woff2** (required) — normal, weight 400
-   **ff-market-web.woff** (optional fallback)

Then in DevTools → select the “Conversations.” span → Computed → `font-family` should show **ff-market-web**.

FF Market is a commercial font (FontFont). If you have a license, export woff2/woff from your font tool, or use [Adobe Fonts](https://fonts.adobe.com/fonts/ff-market) and link the kit in `index.html` instead of self-hosting.

Gilroy-Bold is loaded from CDN in `src/index.css`; no local files needed.
