import { readFile, access } from 'node:fs/promises';

const pages = [
  ['dist/index.html', 'https://nyginvest.com/'],
  ['dist/portfolio/index.html', 'https://nyginvest.com/portfolio/'],
  ['dist/privacy/index.html', 'https://nyginvest.com/privacy/'],
];
const errors = [];

for (const [path, canonical] of pages) {
  const html = await readFile(path, 'utf8');
  const checks = [
    [/<html lang="en">/, 'language'],
    [/<title>[^<]{20,}[^<]*<\/title>/, 'title'],
    [/<meta name="description" content="[^"]{80,}"/, 'meta description'],
    [new RegExp(`<link rel="canonical" href="${canonical.replaceAll('/', '\\/')}"`), 'canonical'],
    [/<meta property="og:image" content="https:\/\/nyginvest\.com\//, 'Open Graph image'],
    [/<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>/, 'H1'],
  ];
  for (const [pattern, label] of checks) if (!pattern.test(html)) errors.push(`${path}: missing or invalid ${label}`);
}

for (const file of ['dist/robots.txt', 'dist/sitemap-index.xml', 'dist/llms.txt', 'dist/404.html', 'dist/_headers', 'dist/_redirects']) {
  try { await access(file); } catch { errors.push(`${file}: missing`); }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`SEO checks passed for ${pages.length} indexable pages.`);
