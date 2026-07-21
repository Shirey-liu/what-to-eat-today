import sharp from 'sharp'

const bg = '#2B3A2F'
const accent = '#E85D4C'
const leaf = '#8BC47B'

// 普通图标：带圆角背景
function createSvg(size, radius) {
  const center = size / 2
  const scale = size / 512
  const r = 96 * scale
  const bodyPath = `
    M${center} ${100 * scale}
    L${center + 30 * scale} ${200 * scale}
    L${center + 70 * scale} ${220 * scale}
    L${center + 30 * scale} ${240 * scale}
    L${center} ${400 * scale}
    L${center - 30 * scale} ${240 * scale}
    L${center - 70 * scale} ${220 * scale}
    L${center - 30 * scale} ${200 * scale}
    Z
  `
  const leafPaths = `
    <path d="M${center} ${100 * scale} L${center - 40 * scale} ${50 * scale}" stroke="${leaf}" stroke-width="${12 * scale}" stroke-linecap="round" fill="none"/>
    <path d="M${center} ${100 * scale} L${center} ${30 * scale}" stroke="${leaf}" stroke-width="${12 * scale}" stroke-linecap="round" fill="none"/>
    <path d="M${center} ${100 * scale} L${center + 40 * scale} ${50 * scale}" stroke="${leaf}" stroke-width="${12 * scale}" stroke-linecap="round" fill="none"/>
  `

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="${bg}" rx="${radius}"/>
    <path d="${bodyPath}" fill="${accent}"/>
    ${leafPaths}
  </svg>`
}

// 生成图标
async function generate() {
  const sizes = [
    { name: 'icon-192', size: 192, radius: 36 },
    { name: 'icon-512', size: 512, radius: 96 },
    { name: 'icon-maskable-192', size: 192, radius: 0 },
    { name: 'icon-maskable-512', size: 512, radius: 0 },
  ]

  for (const { name, size, radius } of sizes) {
    const svg = createSvg(size, radius)
    const buffer = Buffer.from(svg)
    await sharp(buffer).png().toFile(`public/${name}.png`)
    console.log(`Generated public/${name}.png`)
  }
}

generate().catch(console.error)
