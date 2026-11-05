import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function generateOGImage() {
  // 1. Get favicon as base64 PNG
  const faviconBuffer = await sharp('app/favicon.ico')
    .resize(120, 120)
    .png()
    .toBuffer();
  const faviconBase64 = `data:image/png;base64,${faviconBuffer.toString('base64')}`;

  // 2. Define Obsidian Graph Nodes radiating around the central hero card
  // Card bounds: X: 310 to 890, Y: 165 to 465
  const nodes = [
    // Top Constellation (Mathematics, Statistics, ML, Science)
    { id: 'math', label: 'mathematics', x: 190, y: 95, r: 6, fill: '#8b8b93' },
    { id: 'stats', label: 'statistics', x: 380, y: 75, r: 7.5, fill: '#fb7185', glow: true },
    { id: 'ds', label: 'data science', x: 600, y: 65, r: 7, fill: '#a1a1aa' },
    { id: 'ml', label: 'machine learning', x: 800, y: 75, r: 7.5, fill: '#fb7185', glow: true },
    { id: 'drug', label: 'drug discovery', x: 970, y: 70, r: 5.5, fill: '#8b8b93' },
    { id: 'bio', label: 'biostatistics', x: 1100, y: 105, r: 5.5, fill: '#8b8b93' },
    { id: 'pareto', label: 'pareto frontier', x: 880, y: 130, r: 4.5, fill: '#71717a' },
    { id: 'nbody', label: 'n-body simulation', x: 480, y: 125, r: 4.5, fill: '#71717a' },

    // Right Constellation (Philosophy, Epistemology, Anime & Games)
    { id: 'philo', label: 'philosophy of science', x: 1020, y: 210, r: 7.5, fill: '#fb7185', glow: true },
    { id: 'epist', label: 'epistemology', x: 1115, y: 320, r: 6, fill: '#a1a1aa' },
    { id: 'analyt', label: 'analytical philosophy', x: 1060, y: 440, r: 6.5, fill: '#fb7185', glow: true },
    { id: 'meta', label: 'metaphysics', x: 1120, y: 530, r: 5, fill: '#71717a' },
    { id: 'elden', label: 'elden ring', x: 940, y: 310, r: 5.5, fill: '#8b8b93' },
    { id: 'cyber', label: 'cyberpunk 2077', x: 960, y: 410, r: 5.5, fill: '#8b8b93' },
    { id: 'perfect', label: 'perfect days', x: 950, y: 515, r: 5, fill: '#8b8b93' },

    // Bottom Constellation (Music, Piano, Design, Editorial)
    { id: 'classical', label: 'classical music', x: 810, y: 550, r: 5.5, fill: '#71717a' },
    { id: 'music', label: 'music & piano', x: 670, y: 565, r: 6.5, fill: '#a1a1aa' },
    { id: 'rach', label: 'rachmaninoff', x: 530, y: 575, r: 5, fill: '#71717a' },
    { id: 'design', label: 'creative design', x: 380, y: 560, r: 7, fill: '#fb7185', glow: true },
    { id: 'edit', label: 'editorial & layout', x: 230, y: 545, r: 5.5, fill: '#8b8b93' },
    { id: 'writing', label: 'creative writing', x: 115, y: 485, r: 6, fill: '#a1a1aa' },

    // Left Constellation (Culture, Gaming & Resilience)
    { id: 'resilience', label: 'community resilience', x: 230, y: 175, r: 5.5, fill: '#8b8b93' },
    { id: 'pokemon', label: 'pokemon black', x: 130, y: 215, r: 4.5, fill: '#71717a' },
    { id: 'genshin', label: 'genshin impact', x: 85, y: 310, r: 5, fill: '#8b8b93' },
    { id: 'drive', label: 'drive my car', x: 95, y: 405, r: 5, fill: '#71717a' },
    { id: 'steins', label: 'steins;gate', x: 215, y: 360, r: 4.5, fill: '#71717a' },
  ];

  const nodeMap = new Map(nodes.map(n => [n.id, n]));

  // Network Edges
  const edges = [
    // Top connections
    ['math', 'stats'],
    ['math', 'resilience'],
    ['stats', 'ds'],
    ['stats', 'nbody'],
    ['stats', 'resilience'],
    ['stats', 'bio'],
    ['ds', 'ml'],
    ['ds', 'nbody'],
    ['nbody', 'ml'],
    ['ml', 'drug'],
    ['ml', 'pareto'],
    ['drug', 'bio'],
    ['drug', 'pareto'],
    ['math', 'ds'],

    // Right connections
    ['philo', 'epist'],
    ['philo', 'analyt'],
    ['philo', 'ml'],
    ['philo', 'drug'],
    ['bio', 'philo'],
    ['epist', 'analyt'],
    ['epist', 'meta'],
    ['analyt', 'meta'],
    ['philo', 'elden'],
    ['elden', 'cyber'],
    ['cyber', 'analyt'],
    ['cyber', 'perfect'],
    ['perfect', 'classical'],
    ['analyt', 'perfect'],
    ['meta', 'perfect'],

    // Bottom connections
    ['perfect', 'music'],
    ['classical', 'music'],
    ['classical', 'rach'],
    ['music', 'rach'],
    ['rach', 'design'],
    ['music', 'design'],
    ['design', 'edit'],
    ['edit', 'writing'],
    ['writing', 'drive'],
    ['design', 'writing'],

    // Left connections
    ['drive', 'genshin'],
    ['genshin', 'pokemon'],
    ['pokemon', 'resilience'],
    ['resilience', 'math'],
    ['genshin', 'steins'],
    ['steins', 'writing'],
    ['steins', 'drive'],
    ['edit', 'steins'],
  ];

  // Generate SVG lines
  const edgeSvg = edges.map(([sourceId, targetId]) => {
    const s = nodeMap.get(sourceId);
    const t = nodeMap.get(targetId);
    if (!s || !t) return '';
    return `<line x1="${s.x}" y1="${s.y}" x2="${t.x}" y2="${t.y}" stroke="rgba(255, 255, 255, 0.13)" stroke-width="1.3" />`;
  }).join('\n    ');

  // Generate SVG nodes and labels
  const nodeSvg = nodes.map(n => {
    const safeLabel = n.label.replace(/&/g, '&amp;');
    const glowSvg = n.glow
      ? `<circle cx="${n.x}" cy="${n.y}" r="${n.r + 5.5}" fill="rgba(251, 113, 133, 0.24)" />`
      : '';
    const textOffsetY = n.y < 315 ? n.y - 13 : n.y + 19;
    return `
      ${glowSvg}
      <circle cx="${n.x}" cy="${n.y}" r="${n.r}" fill="${n.fill}" />
      <text x="${n.x}" y="${textOffsetY}" text-anchor="middle" font-family="'Space Mono', ui-monospace, SFMono-Regular, monospace" font-size="11.5" fill="#8e8e95" letter-spacing="0.3">${safeLabel}</text>
    `;
  }).join('\n    ');

  // Full 1200x630 SVG
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <!-- Background Gradient -->
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#141418" stop-opacity="0.9" />
      <stop offset="55%" stop-color="#0c0c0f" stop-opacity="0.98" />
      <stop offset="100%" stop-color="#09090b" stop-opacity="1" />
    </radialGradient>

    <!-- Accent Rosy Radial Glow -->
    <radialGradient id="roseGlow" cx="50%" cy="50%" r="48%">
      <stop offset="0%" stop-color="#fb7185" stop-opacity="0.16" />
      <stop offset="50%" stop-color="#fb7185" stop-opacity="0.04" />
      <stop offset="100%" stop-color="#fb7185" stop-opacity="0" />
    </radialGradient>

    <!-- Card Background Gradient -->
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181c" stop-opacity="0.96" />
      <stop offset="100%" stop-color="#0e0e11" stop-opacity="0.98" />
    </linearGradient>

    <!-- Card Border Gradient -->
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fb7185" stop-opacity="0.45" />
      <stop offset="45%" stop-color="rgba(255, 255, 255, 0.16)" />
      <stop offset="100%" stop-color="rgba(255, 255, 255, 0.06)" />
    </linearGradient>

    <!-- Subtle Dot Grid Pattern -->
    <pattern id="dotGrid" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.1" fill="rgba(255, 255, 255, 0.045)" />
    </pattern>

    <!-- Drop Shadow for Card -->
    <filter id="shadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="20" stdDeviation="28" flood-color="#000000" flood-opacity="0.75" />
    </filter>
  </defs>

  <!-- 1. Background Base -->
  <rect width="1200" height="630" fill="#09090b" />
  <rect width="1200" height="630" fill="url(#bgGlow)" />
  <rect width="1200" height="630" fill="url(#dotGrid)" />

  <!-- 2. Ambient Rose Glow behind graph -->
  <circle cx="600" cy="315" r="520" fill="url(#roseGlow)" />

  <!-- 3. Obsidian Knowledge Graph (Edges & Nodes) -->
  <g id="graph-edges">
    ${edgeSvg}
  </g>
  <g id="graph-nodes">
    ${nodeSvg}
  </g>

  <!-- 4. Foreground Hero Branding Card (Centered Glassmorphic Panel) -->
  <g id="hero-card" filter="url(#shadow)">
    <!-- Card Frame -->
    <rect x="290" y="160" width="620" height="310" rx="22" fill="url(#cardGrad)" stroke="url(#borderGrad)" stroke-width="1.5" />

    <!-- Brand Icon Container (Minecraft Book Icon) -->
    <g transform="translate(338, 202)">
      <rect width="76" height="76" rx="18" fill="#242429" stroke="rgba(255, 255, 255, 0.14)" stroke-width="1.2" />
      <image href="${faviconBase64}" x="11" y="11" width="54" height="54" preserveAspectRatio="xMidYMid meet" />
    </g>

    <!-- Creator / Site Title -->
    <text x="434" y="240" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif" font-weight="700" font-size="38" fill="#f4f4f5" letter-spacing="-0.5">artemiui</text>
    
    <!-- Creator Name & Domain Subhead -->
    <text x="435" y="267" font-family="'Space Mono', ui-monospace, SFMono-Regular, monospace" font-size="14.5" fill="#fb7185" letter-spacing="0.4">artemio arcega  •  artemiui.github.io</text>

    <!-- Site Tagline / Description -->
    <text x="338" y="326" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif" font-weight="400" font-size="17" fill="#a1a1aa" letter-spacing="-0.1">
      a collection of ideas and pixels.
    </text>

    <!-- Category Pill Badges -->
    <g transform="translate(338, 362)">
      <!-- Pill 1: statistics -->
      <rect x="0" y="0" width="104" height="30" rx="15" fill="rgba(255, 255, 255, 0.06)" stroke="rgba(255, 255, 255, 0.14)" stroke-width="1" />
      <text x="52" y="19.5" text-anchor="middle" font-family="'Space Mono', ui-monospace, monospace" font-size="11.5" fill="#e4e4e7">statistics</text>

      <!-- Pill 2: philosophy -->
      <rect x="116" y="0" width="112" height="30" rx="15" fill="rgba(255, 255, 255, 0.06)" stroke="rgba(255, 255, 255, 0.14)" stroke-width="1" />
      <text x="172" y="19.5" text-anchor="middle" font-family="'Space Mono', ui-monospace, monospace" font-size="11.5" fill="#e4e4e7">philosophy</text>

      <!-- Pill 3: machine learning -->
      <rect x="240" y="0" width="150" height="30" rx="15" fill="rgba(255, 255, 255, 0.06)" stroke="rgba(255, 255, 255, 0.14)" stroke-width="1" />
      <text x="315" y="19.5" text-anchor="middle" font-family="'Space Mono', ui-monospace, monospace" font-size="11.5" fill="#e4e4e7">machine learning</text>

      <!-- Pill 4: creative design -->
      <rect x="402" y="0" width="120" height="30" rx="15" fill="rgba(255, 255, 255, 0.06)" stroke="rgba(255, 255, 255, 0.14)" stroke-width="1" />
      <text x="462" y="19.5" text-anchor="middle" font-family="'Space Mono', ui-monospace, monospace" font-size="11.5" fill="#e4e4e7">creative design</text>
    </g>

    <!-- Obsidian Graph Indicator on Card bottom -->
    <g transform="translate(338, 428)">
      <circle cx="5" cy="5" r="4" fill="#fb7185" />
      <text x="18" y="9.5" font-family="'Space Mono', ui-monospace, monospace" font-size="11" fill="#71717a" letter-spacing="0.5">OBSIDIAN KNOWLEDGE NETWORK</text>
    </g>
  </g>
</svg>`;

  // 3. Render with Sharp to JPEG and PNG in public/
  const outJpg = path.resolve('public/og-image.jpg');
  const outPng = path.resolve('public/og-image.png');
  const rootJpg = path.resolve('og-image.jpg');
  const rootPng = path.resolve('og-image.png');

  const svgBuffer = Buffer.from(svg);

  await sharp(svgBuffer)
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(outJpg);

  await sharp(svgBuffer)
    .png({ compressionLevel: 9 })
    .toFile(outPng);

  // Also write to root for direct static hosting fallback
  fs.copyFileSync(outJpg, rootJpg);
  fs.copyFileSync(outPng, rootPng);

  const jpgStats = fs.statSync(outJpg);
  const pngStats = fs.statSync(outPng);

  console.log(`Successfully generated OG image:`);
  console.log(`- ${outJpg} (${(jpgStats.size / 1024).toFixed(1)} KB)`);
  console.log(`- ${outPng} (${(pngStats.size / 1024).toFixed(1)} KB)`);
}

generateOGImage().catch(err => {
  console.error(err);
  process.exit(1);
});
