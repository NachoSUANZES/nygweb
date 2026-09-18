import { createHash } from 'node:crypto';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const headersPath = new URL('../dist/_headers', import.meta.url);

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const output = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) output.push(...await htmlFiles(path));
    if (entry.isFile() && entry.name.endsWith('.html')) output.push(path);
  }
  return output;
}

function hashes(markup, tag) {
  const pattern = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'gi');
  return [...markup.matchAll(pattern)]
    .map((match) => match[1])
    .filter(Boolean)
    .map((content) => `'sha256-${createHash('sha256').update(content).digest('base64')}'`);
}

const styleHashes = new Set();
const scriptHashes = new Set();
for (const file of await htmlFiles(dist)) {
  const markup = await readFile(file, 'utf8');
  hashes(markup, 'style').forEach((hash) => styleHashes.add(hash));
  hashes(markup, 'script').forEach((hash) => scriptHashes.add(hash));
}

let headers = await readFile(headersPath, 'utf8');
const csp = [
  "default-src 'none'",
  "base-uri 'self'",
  "connect-src 'self'",
  "font-src 'self'",
  'form-action https://formspree.io',
  "frame-ancestors 'none'",
  "img-src 'self' data:",
  "manifest-src 'self'",
  `script-src 'self' ${[...scriptHashes].join(' ')}`.trim(),
  `style-src 'self' ${[...styleHashes].join(' ')}`.trim(),
  'upgrade-insecure-requests',
].join('; ');
headers = headers.replace(/^  Content-Security-Policy:.*$/m, `  Content-Security-Policy: ${csp}`);
await writeFile(headersPath, headers);
console.log(`CSP updated with ${styleHashes.size} style hash(es) and ${scriptHashes.size} script hash(es).`);
