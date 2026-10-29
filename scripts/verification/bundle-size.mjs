import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const kb = (bytes) => Math.round((bytes / 1000) * 10) / 10;

export function measureBundles(root) {
  const next = join(root, '.next');
  const read = (name) => JSON.parse(readFileSync(join(next, name), 'utf8'));
  const sizes = new Map();
  const gz = (file) => {
    if (!sizes.has(file))
      sizes.set(file, gzipSync(readFileSync(join(next, file))).length);
    return sizes.get(file);
  };
  const js = (files) => files.filter((f) => f.endsWith('.js'));
  const { pages } = read('app-build-manifest.json');
  const { rootMainFiles } = read('build-manifest.json');
  const shared = [...rootMainFiles, ...(pages['/layout'] ?? [])];
  const routes = {};
  for (const [key, files] of Object.entries(pages)) {
    if (!key.endsWith('/page')) continue;
    const route = key.slice(0, -'/page'.length) || '/';
    const all = new Set(js([...shared, ...files]));
    routes[route] = kb([...all].reduce((sum, f) => sum + gz(f), 0));
  }
  const chunks = join(next, 'static/chunks');
  const largest = readdirSync(chunks, { recursive: true })
    .filter((f) => f.endsWith('.js'))
    .map((f) => ({ file: f, size: kb(gz(join('static/chunks', f))) }))
    .sort((a, b) => b.size - a.size)[0];
  return { routes, largest };
}
