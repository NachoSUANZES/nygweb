# Cloudflare Workers migration

## Current and target architecture

- Previous baseline: Cloudflare DNS proxying the apex domain to GitHub Pages.
- Current production: Cloudflare Workers Static Assets serving the Astro `dist/` directory.
- The Worker normalises `www.nyginvest.com` to the canonical apex domain before serving assets.
- No public origin server, database or runtime secret is required for the static site.

The production cutover completed on 18 September 2026. Worker version `0b2d4c42-e4b5-48c7-a58e-cc82cdc920eb` was verified before GitHub Pages was disabled.

## Safe deployment sequence

1. Build and verify locally with `npm run check`, `npm run build`, `npm run check:seo` and `npm run deploy:dry`.
2. Publish the Worker without attaching the production custom domain.
3. Verify the `workers.dev` preview on mobile and desktop, including headers, redirects, the contact path and the custom 404.
4. Record the existing DNS records and GitHub Pages configuration before changing any production route.
5. Attach `nyginvest.com` and `www.nyginvest.com` as Worker custom domains.
6. Verify HTTPS, canonical URLs, redirects, robots, sitemap and public pages from an external network.
7. Remove obsolete GitHub Pages records only after the Worker custom domains are healthy.

The pre-cutover DNS export is stored outside the repository at `/home/micro/backups/cloudflare/nyginvest.com/dns-before-workers-2026-09-18.json` with owner-only permissions.

Production deployments are automatic after every push to `main`. The GitHub Actions workflow first completes the full quality gate, then rebuilds the locked dependency tree, deploys through Wrangler and verifies the public production endpoints. Pull requests run validation only and cannot access the production deployment job.

GitHub stores a dedicated Cloudflare credential in Actions secrets. It is restricted to account read access, Workers editing and Workers routes for the `nyginvest.com` zone; the broad operational token is not copied into GitHub. The Cloudflare account ID is also stored as an Actions secret. A failed quality gate prevents deployment, while a failed deployment or smoke test leaves an explicit failed workflow run for investigation.

Manual deployment remains available for an authorised recovery operation with `npm run deploy`; authenticate Wrangler through an injected `CLOUDFLARE_API_TOKEN` and never write the token to the repository or shell history.

## Rollback

1. Prefer a Cloudflare Worker version rollback to the last known-good deployment; this preserves the custom domains and avoids DNS changes.
2. Revert the faulty commit on `main` and push the revert so the normal pipeline rebuilds, deploys and verifies the restored source state.
3. For a complete pre-migration rollback, restore commit `aaacfcd3f048a956d6f58012beca837fd6f42d10` on a recovery branch and re-enable GitHub Pages from that branch.
4. Detach the Worker custom domains, then restore only the five recorded GitHub Pages web records from the DNS export. Do not alter MX or TXT records.
5. Confirm that Cloudflare serves the recovered GitHub Pages origin before retiring the Worker deployment.

## Required evidence

- HTTP 200 for `/`, `/portfolio/` and `/privacy/`.
- HTTP 404 with the branded error page for an unknown path.
- HTTP 301 for each historical `.html` route.
- One canonical URL per indexable page.
- `robots.txt`, `sitemap-index.xml`, `llms.txt` and security headers visible in production.
- No browser-console error at 390px and 1440px widths.
