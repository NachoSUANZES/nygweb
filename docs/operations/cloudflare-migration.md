# Cloudflare Workers migration

## Current and target architecture

- Baseline: Cloudflare DNS proxying the apex domain to GitHub Pages.
- Target: Cloudflare Workers Static Assets serving the Astro `dist/` directory.
- The Worker normalises `www.nyginvest.com` to the canonical apex domain before serving assets.
- No public origin server, database or runtime secret is required for the static site.

## Safe deployment sequence

1. Build and verify locally with `npm run check`, `npm run build`, `npm run check:seo` and `npm run deploy:dry`.
2. Publish the Worker without attaching the production custom domain.
3. Verify the `workers.dev` preview on mobile and desktop, including headers, redirects, the contact path and the custom 404.
4. Record the existing DNS records and GitHub Pages configuration before changing any production route.
5. Attach `nyginvest.com` and `www.nyginvest.com` as Worker custom domains.
6. Verify HTTPS, canonical URLs, redirects, robots, sitemap and public pages from an external network.
7. Remove obsolete GitHub Pages records only after the Worker custom domains are healthy.

The pre-cutover DNS export is stored outside the repository at `/home/micro/backups/cloudflare/nyginvest.com/dns-before-workers-2026-09-18.json` with owner-only permissions.

Production deployments are intentionally explicit (`npm run deploy`) until a least-privilege Cloudflare token is created for CI. GitHub validates every change, but the broad operational token is not copied into repository secrets.

## Rollback

1. Detach the Worker custom domains.
2. Restore the recorded GitHub Pages DNS records.
3. Confirm that Cloudflare serves the prior GitHub Pages origin.
4. Keep the Worker deployment available for diagnosis; a rollback must not delete the last known-good release.

## Required evidence

- HTTP 200 for `/`, `/portfolio/` and `/privacy/`.
- HTTP 404 with the branded error page for an unknown path.
- HTTP 301 for each historical `.html` route.
- One canonical URL per indexable page.
- `robots.txt`, `sitemap-index.xml`, `llms.txt` and security headers visible in production.
- No browser-console error at 390px and 1440px widths.
