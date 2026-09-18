# Changelog

## Unreleased

### Security and operations

- Removed the embedded GitHub credential from the local remote configuration and moved redesign work to an isolated branch.
- Recorded the migration path from GitHub Pages to Cloudflare Workers Static Assets with a reversible domain cutover.
- Migrated the apex and `www` hostnames to the verified Worker, preserved mail DNS and disabled the obsolete GitHub Pages deployment.
- Added automatic production deployment after the `main` quality gate, using a dedicated scoped Cloudflare credential and post-deploy endpoint checks.

### Architecture

- Rebuilt the site as a clean Astro static application with dedicated home, portfolio, privacy and 404 routes.
- Added reproducible checks, Cloudflare Workers Static Assets configuration, hardened response headers and legacy redirects.
- Added canonical metadata, Open Graph assets, JSON-LD, `robots.txt`, sitemap generation and `llms.txt`.

### Design

- Defined the “Measured conviction” product and visual direction for NYG International Investment.
- Corrected NYG's positioning from third-party wealth management to a privately held company investing its own capital.
- Replaced the legacy template with a responsive, mobile-first editorial experience and accessible contact flow.
- Replaced every portfolio mark with its official light-background asset from the corresponding company repository and normalised optical sizing without suppressing brand colours.
- Added a clearly separated Venture studio · Seed chapter for MakiLab and its current products, Makinotes and Akorto, without mixing early-stage work into the mature holdings list.

### Security

- Removed jQuery, Font Awesome and all legacy runtime scripts and public template/demo pages.
- Pinned audited dependencies and generated CSP hashes for build-time inline styles and structured data.

### Verification

- `npm audit --audit-level=low`: 0 vulnerabilities.
- `npm run check`: 0 errors.
- `npm run build`: 4 static routes built successfully.
- `npm run check:seo`: all indexable routes passed.
- `npm run deploy:dry`: Workers bundle accepted.
- Lighthouse mobile: Performance 99, Accessibility 100, Best Practices 100, SEO 100.
