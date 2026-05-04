import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const outDir = join(root, 'public');

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
await cp(join(root, 'design-system'), join(outDir, 'design-system'), {
  recursive: true,
  filter: (source) => !source.includes('/tests/'),
});

await writeFile(
  join(outDir, 'index.html'),
  `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="0; url=./design-system/previews/fragmatic-design-system.html">
  <title>Fragmatic Design System</title>
  <link rel="canonical" href="./design-system/previews/fragmatic-design-system.html">
</head>
<body>
  <p><a href="./design-system/previews/fragmatic-design-system.html">Open Fragmatic Design System</a></p>
</body>
</html>
`,
);

await writeFile(join(outDir, '.nojekyll'), '');
