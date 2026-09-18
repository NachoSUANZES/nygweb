# NYG International Investment

Public corporate website for NYG International Investment. The site is built as a static Astro application and deployed through Cloudflare Workers Static Assets.

## Local development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run check
npm run build
npm run check:seo
npm run deploy:dry
```

The public routes are `/`, `/portfolio/`, `/privacy/` and `/404.html`. Historical HTML routes are permanently redirected by `public/_redirects`.

## Deployment

The production build is generated in `dist/`. A push to `main` deploys automatically only after the GitHub Actions quality gate succeeds, then verifies the public endpoints. Operational deployment, rollback and domain-cutover instructions live in [docs/operations/cloudflare-migration.md](docs/operations/cloudflare-migration.md).
