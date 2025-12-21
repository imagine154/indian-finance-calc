// POLYFILLS for PDFJS in Node
global.DOMMatrix = class DOMMatrix { };
global.ImageData = class ImageData { };
global.Path2D = class Path2D { };

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DETAILED_PDF = '9722727211220252020423139884544140.pdf';
const SUMMARY_PDF = '97227552112202520502428180852497671.pdf';
const PASSWORD = '2025@Decembe';

async function dumpHeader(filename) {
    const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
    const filePath = path.join(__dirname, '../src/data', filename);
    console.log(`\n--- Processing ${filename} ---`);
    if (!fs.existsSync(filePath)) {
        console.log("File not found");
        return;
    }
    const buffer = fs.readFileSync(filePath);
    const data = new Uint8Array(buffer);
    const loadingTask = pdfjsLib.getDocument({ data, password: PASSWORD, standardFontDataUrl: 'node_modules/pdfjs-dist/standard_fonts/' });
    try {
        const doc = await loadingTask.promise;
        const page = await doc.getPage(1);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        console.log(`HEADER (First 500 chars):`);
        console.log(pageText.substring(0, 500));
    } catch (e) { console.error(e); }
}

await dumpHeader(DETAILED_PDF);
await dumpHeader(SUMMARY_PDF);
