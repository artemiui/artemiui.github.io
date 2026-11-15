import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import sharp from 'sharp';

const output = 'public/share/articles';
await fs.mkdir(output, { recursive: true });
const icon = await sharp('app/favicon.ico').trim().resize(58, 58, { kernel: 'nearest' }).png().toBuffer();
const accents = ['#ed624a', '#ec9740', '#788bd2', '#68bbb7'];
const photos = ['phi-log.jpg', 'research-header.png', 'up-tennis-postcards.png', 'pjdsc26-preview-1.png'];
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

// Pango wraps using actual glyph widths, including inside oversized words.
// Measure the rendered pixels before placing the title in its reserved band.
async function renderTitle(title) {
  for (let size = 68; size >= 8; size -= 2) {
    const { data, info } = await sharp({ text: {
      text: '<span foreground="#191917">' + escape(title) + '</span>',
      font: 'Arial ' + size, width: 1032, wrap: 'word-char', rgba: true,
    } }).png().toBuffer({ resolveWithObject: true });
    if (info.width <= 1032 && info.height <= 248) return { data, height: info.height };
  }
  throw new Error('Title exceeds the available share card space: ' + title);
}

for (const file of await fs.readdir('content/posts')) {
  if (!/\.mdx?$/.test(file)) continue;
  const slug = path.parse(file).name;
  const { data } = matter(await fs.readFile(path.join('content/posts', file), 'utf8'));
  const title = await renderTitle(data.title);
  const index = [...slug].reduce((sum, c) => sum + c.codePointAt(0), 0) % photos.length;
  const photo = await sharp(path.join('public/images', photos[index])).resize(172, 82, { fit: 'inside' }).png().toBuffer();
  const art = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#f3f2ef"/><rect x="914" y="134" width="19" height="19" fill="${accents[index]}"/><rect x="84" y="111" width="17" height="17" fill="${accents[index]}"/><g font-family="Arial,sans-serif" fill="#262522"><text x="115" y="127" font-size="24">${escape(data.category)}</text><text x="156" y="543" font-size="26">artemio arcega</text><text x="156" y="571" font-size="21">artemiui.vercel.app</text></g></svg>`);
  await sharp(art).composite([
    { input: photo, left: 933, top: 52 },
    { input: title.data, left: 84, top: 184 + Math.floor((248 - title.height) / 2) },
    { input: icon, left: 84, top: 518 },
  ]).jpeg({ quality: 90 }).toFile(path.join(output, slug + '.jpg'));
}
