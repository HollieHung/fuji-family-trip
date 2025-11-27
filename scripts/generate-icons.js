#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const cwd = process.cwd();
const sourcePaths = [
  path.join(cwd, 'public', 'original-icon.png'),
  path.join(cwd, 'assets', 'logo.png'),
];

function findSource() {
  for (const p of sourcePaths) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function generate() {
  const src = findSource();
  if (!src) {
    console.log('No source icon found (checked public/original-icon.png, assets/logo.png). Skipping icon generation.');
    return;
  }
  const outDir = path.join(cwd, 'public', 'icons');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const iconTasks = [
    { size: 180, file: path.join(cwd, 'public', 'apple-touch-icon.png') },
    { size: 192, file: path.join(outDir, 'icon-192.png') },
    { size: 512, file: path.join(outDir, 'icon-512.png') },
    { size: 48,  file: path.join(outDir, 'favicon-48.png') },
  ];

  await Promise.all(
    iconTasks.map((t) =>
      sharp(src)
        .resize(t.size, t.size, { fit: 'contain' })
        .png()
        .toFile(t.file)
    )
  );

  console.log('Generated icons from', src);
}

generate().catch((err) => {
  console.error('Failed to generate icons:', err);
  process.exit(1);
});
