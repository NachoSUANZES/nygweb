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

The production build is generated in `dist/`. Operational migration, rollback and domain-cutover instructions live in [docs/operations/cloudflare-migration.md](docs/operations/cloudflare-migration.md).
