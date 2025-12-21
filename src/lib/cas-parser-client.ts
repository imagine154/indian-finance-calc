// REMOVED static import to avoid DOMMatrix error in Next.js Server Side
// import * as pdfjsLib from 'pdfjs-dist';

export interface FundScheme {
    name: string;
    type: 'REGULAR' | 'DIRECT' | 'UNKNOWN';
    value: number;
}

export interface PortfolioSummary {
    totalValue: number;
    regularValue: number;
    directValue: number;
    funds: FundScheme[];
    potentialSavings: number; // 1% of Regular Value
}

export async function parseCasPdf(file: File, password: string): Promise<PortfolioSummary> {
    // Dynamic import to ensure it runs only on client side
    const pdfjsLib = await import('pdfjs-dist');

    // Config worker
    if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
    }

    const arrayBuffer = await file.arrayBuffer();

    try {
        const loadingTask = pdfjsLib.getDocument({
            data: arrayBuffer,
            password: password,
        });

        const doc = await loadingTask.promise;
        const numPages = doc.numPages;
        const fundsFound: FundScheme[] = [];

        // State machine variables
        // We need to persist these across lines because KFintech "Detailed" often splits Name, Type, and Value.
        let currentSchemeName: string | null = null;
        let currentSchemeType: 'DIRECT' | 'REGULAR' | null = null;

        // Extract text from all pages and process line-by-line to avoid UI freeze
        for (let i = 1; i <= numPages; i++) {
            const page = await doc.getPage(i);
            const textContent = await page.getTextContent();

            // Join items with a special separator. 
            // Kfintech often uses table structures. '  ' helps separate cells.
            // JOIN with Single Space to match "Value ISIN" together.
            // This is crucial for KFintech Summary where "Value" and "ISIN" might be split by double spaces otherwise.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const pageText = textContent.items.map((item: any) => item.str).join(' ');

            // SPLIT lines efficiently.
            // 1. Try splitting by Registrar names (common in Summary CAS).
            // 2. Fallback to double space or newline (common in standard CAS).

            // STRICT VALIDATION: Check for Summary CAS Header on Page 1
            if (i === 1) {
                const headerText = pageText.substring(0, 1000);
                if (!headerText.match(/Consolidated Account Summary/i)) {
                    throw new Error("Detailed CAS detected. Please upload the 'Summary' type CAS PDF (contains 'Consolidated Account Summary' in header).");
                }
            }

            let lines = pageText.split(/(?=CAMS|KFINTECH|FTAMIL|KARVY|Franklin India)/i);

            // If splitting by registrar didn't produce enough chunks (e.g. Detailed CAS or Cover Page),
            // fallback to splitting by "  " or similar visual breaks.
            if (lines.length < 5) {
                lines = pageText.split(/  +/);
            }

            for (const line of lines) {
                const cleanLine = line.trim();
                // Skip short lines or noise
                if (cleanLine.length < 5) continue;
                if (cleanLine.match(/^(Page|Date|Transaction)/i)) continue;
                // IGNORE Load Structure lines (crucial for KFintech)
                if (cleanLine.match(/(Load Structure|Entry Load|Exit Load|Lock-in Details)/i)) continue;

                // 1. Detect Plan Type
                // Updates state if found.
                const typeMatch = cleanLine.match(/\b(Direct|Regular)\b/i);
                if (typeMatch) {
                    currentSchemeType = typeMatch[1].toUpperCase() as 'DIRECT' | 'REGULAR';
                }

                // 2. Detect Value via ISIN Anchor (Robust for Summary CAS)
                // Pattern: "... [Value] [Space] INF..."
                // Logic: Look for a number immediately preceding an ISIN.
                const isinMatch = cleanLine.match(/([0-9,]+\.[0-9]+)\s+(INF[A-Z0-9]+)/);
                if (isinMatch) {
                    const val = parseFloat(isinMatch[1].replace(/,/g, ''));
                    if (!isNaN(val) && val > 0) {
                        // We found a value. Now we need a Name.
                        // Strategy: Look for Name in the SAME line first.
                        let nameResult = currentSchemeName;
                        let typeResult = currentSchemeType || 'REGULAR';

                        // Attempt to extract Name from the line itself
                        // Regex: Start of string ... until "Direct" or "Regular"
                        const nameInLineMatch = cleanLine.match(/([A-Za-z0-9\s\-\&\(\)\.]+)((?:Direct|Regular)[A-Za-z0-9\s\-]*)/i);
                        if (nameInLineMatch && nameInLineMatch[1].length > 10) {
                            nameResult = nameInLineMatch[1].trim();
                            if (nameInLineMatch[2].match(/Direct/i)) typeResult = 'DIRECT';
                            else if (nameInLineMatch[2].match(/Regular/i)) typeResult = 'REGULAR';
                        }

                        if (nameResult) {
                            fundsFound.push({
                                name: nameResult,
                                type: typeResult,
                                value: val
                            });
                            // Reset state
                            currentSchemeName = null;
                            currentSchemeType = null;
                            continue;
                        }
                    }
                }

                // 3. Detect Value via Explicit Keywords (Robust for Detailed CAS)
                // Pattern: "Market Value on ... : INR 1,23,456.78"
                // Pattern: "Closing Balance (Rs) : 1000.00"
                // TYPO FIX: [A-Z]
                const keywordValMatch = cleanLine.match(/(?:Market Value(?: on \d{2}-[A-Z]{3}-\d{4})?\s*:?\s*(?:INR|Rs\.?)?|Closing Balance\s*\(Rs\)|Valuation)\s*[:\-]?\s*([0-9,]+\.[0-9]+)/i);

                if (keywordValMatch) {
                    const val = parseFloat(keywordValMatch[1].replace(/,/g, ''));
                    // Check for Name in the same line (Detailed CAS sometimes puts name in footer)
                    // e.g. "Market Value ... Nominee ... [Name]"

                    if (!isNaN(val) && val > 0) {
                        // 1. Try to extract Name from the line itself (Specific for Detailed CAS)
                        // Regex: Look for "Code-Name - Plan" pattern e.g. "166ISDGG-quant Infrastructure Fund..."
                        // RELAXED: Allow End of String ($) or other delimiters
                        const nameInLineMatch = cleanLine.match(/([A-Z0-9]+-[A-Za-z0-9\s\-\&]+(?:Fund|Plan|Option|Scheme)[A-Za-z0-9\s\-\&]*?)(?:\s*\(Advisor|\s*- ISIN|$)/i);

                        let extractedName = null;
                        let extractedType = currentSchemeType || 'REGULAR'; // Default

                        if (nameInLineMatch) {
                            extractedName = nameInLineMatch[1].trim();
                            if (extractedName.match(/Direct/i)) extractedType = 'DIRECT';
                            else if (extractedName.match(/Regular/i)) extractedType = 'REGULAR';
                        }

                        // 2. Prefer Extracted Name, else Persistent Name
                        // FILTER junk persistent names
                        if (currentSchemeName && currentSchemeName.match(/(Redemption|Purchase|Switch|Consolidated|Account Statement|Folio|Tax|Stamp)/i)) {
                            currentSchemeName = null;
                        }

                        // Fallback to "Unidentified Fund" if name is missing but value is real.
                        const finalName = extractedName || currentSchemeName || `Unidentified Fund (Val: ${val})`;

                        // We push it even if Unidentified, to ensure Total Value is correct.
                        fundsFound.push({
                            name: finalName,
                            type: extractedType,
                            value: val
                        });

                        currentSchemeName = null;
                        currentSchemeType = null;
                        continue;
                    }
                }

                // 4. Scheme Name Detection (State Machine)
                // Look for folios to reset
                if (cleanLine.match(/Folio\s*No/i)) {
                    // If we have a pending name but no value, keeps it? 
                    // Or does Folio line usually CONTAIN the name?
                    // Detailed CAS: "Name ... Folio No : ..." often on same line or adjacent.
                    // If this line has a Name, capture it.
                    currentSchemeName = null; // Reset previous
                    currentSchemeType = null;
                }

                // Header Name Detection
                // We accept a line as a Name if it has "Fund" or "Scheme" etc AND excludes keywords.
                const isHeader = cleanLine.match(/^(Date|Transaction|Units|Balance|Amount|Registrar|Price|Cost|Redemption)/i);
                if (!isHeader) {
                    const hasFundKeyword = /(Fund|Scheme|Plan|Option|Index|ETF|Equity|Debt|Hybrid)/i.test(cleanLine);
                    const hasPlanType = /(Direct|Regular)/i.test(cleanLine);
                    // const looksLikeName = cleanLine.length > 15 && !cleanLine.includes('...');

                    if (hasFundKeyword || hasPlanType) {
                        // Filter out obvious non-names
                        if (!cleanLine.match(/(Market Value|Valuation|Load|Statement|Summary|Total|Page)/i)) {
                            // This is likely a Header Name
                            currentSchemeName = cleanLine.split(/(Folio|ISIN|PAN|KYC)/)[0].trim(); // Trim off metadata if on same line
                        }
                    }
                }
            }
        }

        // Final fallback: If standard parsing failed completely (likely due to PDF format differences)

        const totalValue = fundsFound.reduce((acc, f) => acc + f.value, 0);
        const regularValue = fundsFound.filter(f => f.type === 'REGULAR').reduce((acc, f) => acc + f.value, 0);
        const directValue = fundsFound.filter(f => f.type === 'DIRECT').reduce((acc, f) => acc + f.value, 0);
        const potentialSavings = regularValue * 0.01; // 1% approx

        return {
            totalValue,
            regularValue,
            directValue,
            funds: fundsFound,
            potentialSavings
        };

    } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : String(error);

        // Don't log expected validation errors as System Errors
        if (!errMsg.match(/(Detailed CAS|Password)/)) {
            console.error("PDF Parsing Error", error);
        }

        if (errMsg.includes('Password')) {
            throw new Error('Incorrect Password');
        }
        // Propagate the specific error (e.g. Detailed CAS detected)
        throw new Error(errMsg);
    }
}
