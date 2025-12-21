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

// Check if files exist
if (!fs.existsSync(path.join(__dirname, '../src/data', SUMMARY_PDF))) {
    console.error("Summary PDF not found!");
    process.exit(1);
}

async function parsePdf(filename) {
    const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
    const filePath = path.join(__dirname, '../src/data', filename);
    console.log(`\n--- Parsing ${filename} ---`);

    const buffer = fs.readFileSync(filePath);
    const data = new Uint8Array(buffer);

    const loadingTask = pdfjsLib.getDocument({
        data: data,
        password: PASSWORD,
        standardFontDataUrl: 'node_modules/pdfjs-dist/standard_fonts/',
    });

    try {
        const doc = await loadingTask.promise;
        const numPages = doc.numPages;
        console.log(`Pages: ${numPages}`);

        const fundsFound = [];

        // PERSISTENT STATE
        let currentSchemeName = null;
        let currentSchemeType = null;

        for (let i = 1; i <= numPages; i++) {
            const page = await doc.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' '); // Single space join

            if (i === 1) {
                console.log(`--- PAGE 1 TEXT [${filePath}] ---`);
                console.log(pageText.substring(0, 1000));
                console.log(`-----------------------------------`);
            }

            // Parsing Logic
            let lines = pageText.split(/(?=CAMS|KFINTECH|FTAMIL|KARVY)/);
            if (lines.length < 5) lines = pageText.split('  '); // Fallback

            for (const line of lines) {
                const cleanLine = line.trim();
                if (cleanLine.length < 5) continue;

                // DEBUG: Log ALL "Market Value" or "Closing" lines in Detailed PDF
                if (cleanLine.match(/(Closing Unit Balance|Market Value|Valuation|Net Asset Value)/i)) {
                    console.log(`[Value Keyword Found] P${i}: "${cleanLine}"`);
                }

                // Exclude Headers/Load
                if (cleanLine.match(/(Load Structure|Entry Load|Exit Load|NAV Date|Lock-in Details)/i)) continue;

                // 1. Detect ISIN Anchor (Robust)
                const isinMatch = cleanLine.match(/([0-9,]+\.[0-9]+)\s+(INF[A-Z0-9]+)/);
                if (isinMatch) {
                    const val = parseFloat(isinMatch[1].replace(/,/g, ''));

                    // Try to find Name in the same line
                    const nameMatch = cleanLine.match(/([A-Za-z0-9\s\-\&\(\)]+?)(Direct|Regular)/i);
                    let name = null;
                    let type = 'REGULAR';

                    if (nameMatch) {
                        name = nameMatch[0];
                        type = nameMatch[2].toUpperCase();
                    } else if (currentSchemeName) {
                        name = currentSchemeName;
                        type = currentSchemeType || 'REGULAR';
                    }

                    if (name && !isNaN(val)) {
                        console.log(`[ISIN Match] ${name} -> ${val}`);
                        fundsFound.push({ name: name.trim(), type: type, value: val });
                        currentSchemeName = null;
                        currentSchemeType = null;
                        continue;
                    }
                }

                // 2. Detect Combined Row (Standard)
                const combinedMatch = cleanLine.match(/([A-Za-z0-9\s\(\)\&\-\/]+?)(Direct|Regular)(?:.*?)(\d+[.,]\d{2,})/i);
                if (combinedMatch && combinedMatch[1].length > 10) {
                    const valueMatches = cleanLine.match(/([0-9,]+\.[0-9]+)/g);
                    if (valueMatches) {
                        // Heuristic: If we have ISIN anchor failure, maybe try this?
                        // But this regex is what caused the "1.08" error (capturing Units).
                        // We should be careful.
                        // Let's SKIP this if it looks like "Load Structure" (already handled).
                    }
                }

                // 3. Name Detection (State Machine)
                const isHeader = cleanLine.match(/^(Date|Transaction|Units|Balance|Amount)/i);
                if (!isHeader) {
                    const hasFundKeyword = /(Fund|Scheme|Plan|Option|Index|ETF|Equity|Debt|Hybrid)/i.test(cleanLine);
                    const hasPlanType = /(Direct|Regular)/i.test(cleanLine);

                    if ((hasFundKeyword || hasPlanType) && cleanLine.length > 15) {
                        // Filter out obvious non-names
                        if (!cleanLine.match(/(Market Value|Valuation|Load|Statement|Summary|Total|Page|Nominee|Address|Tax|Stamp)/i)) {
                            const candidateName = cleanLine.split(/(Folio|ISIN|PAN|KYC|Advisor)/)[0].trim();
                            if (candidateName !== currentSchemeName) {
                                console.log(`[Name Candidate] Found: "${candidateName}"`);
                                currentSchemeName = candidateName;
                            }
                        }
                    }
                }

                // 4. Value Detection (State Machine)
                // PATTERN UPDATE: [A-Z] for date (RESTORED COMPLEX REGEX)
                const valMatch = cleanLine.match(/(?:Market Value(?: on \d{2}-[A-Z]{3}-\d{4})?\s*:?\s*(?:INR|Rs\.?)?|Closing Balance\s*\(Rs\)|Valuation)\s*[:\-]?\s*([0-9,]+\.[0-9]+)/i);

                if (valMatch) {
                    const val = parseFloat(valMatch[1].replace(/,/g, ''));
                    if (!isNaN(val) && val > 0) {
                        console.log(`[Value Keyword Match] Val: ${val}  (Line: "${cleanLine.substring(0, 150)}...")`); // Truncated log

                        // Check for Name in the same line (Detailed CAS sometimes puts name in footer)
                        let extractedName = null;
                        let extractedType = currentSchemeType || 'REGULAR';

                        // Regex to grab "Code-Name - Plan" pattern
                        const nameInLineMatch = cleanLine.match(/([A-Z0-9]+-[A-Za-z0-9\s\-\&]+(?:Fund|Plan|Option|Scheme)[A-Za-z0-9\s\-\&]*?)\s*(?:\(Advisor|- ISIN)/i);

                        if (nameInLineMatch) {
                            extractedName = nameInLineMatch[1].trim();
                            if (extractedName.match(/Direct/i)) extractedType = 'DIRECT';
                            else if (extractedName.match(/Regular/i)) extractedType = 'REGULAR';

                            console.log(`   -> Extracted Name from Line: "${extractedName}" (${extractedType})`);
                        } else if (currentSchemeName) {
                            extractedName = currentSchemeName;
                            console.log(`   -> Using Persistent Name: "${extractedName}"`);
                        } else {
                            // THIS IS THE KEY LOGGING WE NEED
                            console.log(`   -> ❌ NO NAME FOUND! Value ${val} ignored. Raw Line:\n      "${cleanLine}"`);
                        }

                        if (extractedName) {
                            fundsFound.push({
                                name: extractedName,
                                type: extractedType,
                                value: val
                            });
                            currentSchemeName = null;
                            currentSchemeType = null;
                            continue;
                        }
                    }
                }
            }
        }

        console.log("------------------------------------------------");
        console.log(`Total Funds: ${fundsFound.length}`);
        console.log(`Total Value: ${fundsFound.reduce((acc, f) => acc + f.value, 0)}`);
        console.log("------------------------------------------------");

    } catch (e) {
        console.error("Error:", e);
    }
}

// Run 
console.log("Analyzing Headers...");
await parsePdf(DETAILED_PDF);
await parsePdf(SUMMARY_PDF);
