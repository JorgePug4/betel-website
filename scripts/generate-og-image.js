// Genera static/og-image.jpg (1200x630) con la marca de la comunidad.
// Ejecuta: node scripts/generate-og-image.js
const sharp = require("sharp");
const path = require("path");

const W = 1200;
const H = 630;

const bg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#005B9A"/>
      <stop offset="55%" stop-color="#00AEEF"/>
      <stop offset="100%" stop-color="#FF7A00"/>
    </linearGradient>
    <radialGradient id="glow" cx="22%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <text x="470" y="250" font-family="Montserrat, Arial, sans-serif" font-size="64" font-weight="800" fill="#ffffff">Comunidad Bet-el</text>
  <text x="470" y="330" font-family="Montserrat, Arial, sans-serif" font-size="64" font-weight="800" fill="#FFD54F">Casa Abierta</text>
  <text x="472" y="395" font-family="Poppins, Arial, sans-serif" font-size="30" font-weight="500" fill="#ffffff" opacity="0.92">Proclamamos, formamos y caminamos con Cristo</text>
  <rect x="472" y="430" width="120" height="6" rx="3" fill="#FFD54F"/>
</svg>`;

async function run() {
  const logo = await sharp(path.resolve(__dirname, "../src/assets/logo.png"))
    .resize(330, 330, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp(Buffer.from(bg))
    .composite([{ input: logo, left: 90, top: 150 }])
    .jpeg({ quality: 88 })
    .toFile(path.resolve(__dirname, "../static/og-image.jpg"));

  console.log("✅ static/og-image.jpg generado (1200x630)");
}

run().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
