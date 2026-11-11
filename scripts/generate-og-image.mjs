import fs from 'node:fs/promises';
import sharp from 'sharp';

const cards = {
  blog: ['Blog', 'Writing', 'research-header.png', 'phi-log.jpg', 'pjdsc26-preview-1.png', 'up-oasd-reel-1.jpg'],
  cv: ['CV', 'Experience', 'up-oasd-coverage-header.jpg', 'pjdsc26-preview-2.png', 'kap-mlr-graphs.jpg', 'up-fighting-maroons-2.jpeg'],
  projects: ['Projects', 'Selected work', 'godle-preview-1.png', 'pareto-phyto-2.png', 'dssoc-design-header.png', 'paddock-south-3.png'],
  media: ['Artboxd', 'Media diary', 'poster-6.png', 'poster-3.png', 'poster-9.png', 'poster-1.png'],
  recommendations: ['Recommendations', 'Personal picks', 'poster-5.png', 'up-tennis-postcards.png', 'poster-7.png', 'phi-timeline.jpg'],
};
const positions = [[142,104],[690,192],[245,346],[853,428]];
const paper = Buffer.alloc(1200 * 630 * 3);
let seed = 11;
for (let i = 0; i < paper.length; i += 3) {
  seed = (Math.imul(seed,1664525) + 1013904223) >>> 0;
  const tone = 239 + Math.floor(seed / 2**32 * 10);
  paper.set([tone,tone-1,tone-3],i);
}
const icon = await sharp('app/favicon.ico').trim().resize(58, 58, { fit: 'contain', background: '#0000', kernel: 'nearest' }).png().toBuffer();
await fs.mkdir('public/share', { recursive: true });
for (const [slug,[title,subtitle,...photos]] of Object.entries(cards)) {
  const layers = await Promise.all(photos.map(async (photo,i) => ({
    input: await sharp('public/images/'+photo).resize(168,84,{fit:'cover',position:'attention'}).modulate({saturation:0.78}).png().toBuffer(),
    left: positions[i][0], top: positions[i][1],
  })));
  const art = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><g font-family="Arial,sans-serif" fill="#191917"><text x="664" y="251" text-anchor="end" font-size="43">${title}</text><text x="508" y="414" font-size="28">${subtitle}</text><text x="146" y="563" font-size="26">artemio arcega</text><text x="146" y="590" font-size="21" fill="#4e4b47">artemiui.vercel.app</text></g><path fill="#ed624a" d="M405 86h22v22h-22z"/><path fill="#ec9740" d="M668 276h22v22h-22z"/><path fill="#73563f" d="M223 324h22v22h-22z"/><path fill="#ffc637" d="M1021 406h22v22h-22z"/><path fill="#788bd2" d="M964 134h22v22h-22z"/><path fill="#20201e" d="M147 466h22v22h-22z"/><path fill="#8adbd9" d="M395 517h22v22h-22z"/></svg>`;
  await sharp(paper,{raw:{width:1200,height:630,channels:3}}).composite([...layers,{input:Buffer.from(art)}, { input: icon, left: 74, top: 540 }]).jpeg({quality:89}).toFile(`public/share/${slug}.jpg`);
}

