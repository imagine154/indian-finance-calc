import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
const svgPath = path.join(publicDir, 'favicon-brand.svg');

async function generateFavicons() {
    console.log('Reading SVG from:', svgPath);

    // Read the SVG file
    const svgBuffer = fs.readFileSync(svgPath);

    // Generate PNG at various sizes
    const sizes = [16, 32, 48, 96, 180, 192, 512];

    for (const size of sizes) {
        const outputPath = path.join(publicDir, `favicon-${size}x${size}.png`);
        await sharp(svgBuffer)
            .resize(size, size)
            .png()
            .toFile(outputPath);
        console.log(`Generated: favicon-${size}x${size}.png`);
    }

    // Generate apple-touch-icon (180x180)
    await sharp(svgBuffer)
        .resize(180, 180)
        .png()
        .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('Generated: apple-touch-icon.png');

    // Generate favicon.ico (multi-size ICO) - we'll create a 48x48 PNG as favicon.ico
    // Note: Sharp doesn't support ICO natively, so we'll use the 48x48 PNG
    // Most browsers will accept favicon.ico as a PNG with .ico extension
    await sharp(svgBuffer)
        .resize(48, 48)
        .png()
        .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('Generated: favicon.ico (as 48x48 PNG)');

    console.log('\n✅ All favicons generated successfully!');
}

generateFavicons().catch(console.error);
