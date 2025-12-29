const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const CSV_PATH = path.join(__dirname, '../data/Rupee_Tools_Query_12_28_2025.csv');
const JSON_PATH = path.join(__dirname, '../data/mutual-funds.json');

// Levenshtein distance for fuzzy matching
const levenshtein = (a, b) => {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(
                        matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1 // deletion
                    )
                );
            }
        }
    }

    return matrix[b.length][a.length];
};

const normalize = (name) => {
    let n = name.toLowerCase();

    // Specific replacements (Punctuation dependent)
    n = n.replace(/government securities/g, "gilt")
        .replace(/g sec/g, "gilt")
        .replace(/children's benefit/g, "childrens")
        .replace(/children's/g, "childrens")
        .replace(/t\.i\.g\.e\.r\./g, "tiger")
        .replace(/banking & financial/g, "banking & fin")
        .replace(/september/g, "sep")
        .replace(/november/g, "nov")
        .replace(/december/g, "dec")
        .replace(/october/g, "oct")
        .replace(/january/g, "jan")
        .replace(/february/g, "feb")
        .replace(/august/g, "aug");

    return n
        .replace(/icici prudential/g, "icici pru")
        .replace(/aditya birla sun life/g, "aditya birla sl")
        .replace(/opportunities/g, "opp")
        .replace(/infrastructure/g, "infra")
        .replace(/whiteoak capital/g, "woc")
        .replace(/corporate/g, "corp")
        .replace(/pure equity plan/g, "")
        .replace(/equity plan/g, "")
        .replace(/overseas equity omni/g, "")
        .replace(/\band\b/g, "&") // "Large and Midcap" -> "Large & Midcap"
        .replace(/\bfund\b/g, "")
        .replace(/\bfof\b/g, "")
        .replace(/\bplan\b/g, "")
        .replace(/\bgrowth\b/g, "")
        .replace(/\bdirect\b/g, "")
        .replace(/[^a-z0-9&]/g, " ") // Remove punctuation
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/:/g, " ") // "90:10" -> "90 10"
        .replace(/-/g, " ")
        .replace(/active/g, "")
        .replace(/allocation/g, "")
        .replace(/financial/g, "fin")
        .replace(/income plus arbitrage/g, "arbitrage")
        .replace(/plus gilt/g, "")
        .replace(/gilt plus/g, "")
        .replace(/plus sdl/g, "")
        .replace(/sdl plus/g, "")
        .replace(/magnum/g, "")
        .replace(/retirement benefit/g, "retirement")
        .replace(/asset allocator/g, "asset");
};

const updateData = async () => {
    try {
        const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
        const jsonContent = fs.readFileSync(JSON_PATH, 'utf-8');

        const jsonData = JSON.parse(jsonContent);

        const parsedCsv = Papa.parse(csvContent, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: false
        });

        if (parsedCsv.errors.length) {
            console.error("CSV Parsing Errors:", parsedCsv.errors);
        }

        const csvData = parsedCsv.data.filter(r => r.Name);
        const csvMap = new Map();

        // Populate map with normalized keys for O(1) exact match attempts
        csvData.forEach(row => {
            const key = normalize(row.Name);
            csvMap.set(key, row);
        });

        let updatedCount = 0;
        const notFound = [];
        const fuzzyMatches = [];

        const manualMappings = {
            "HDFC Children's Fund": "HDFC Children's Fund(Lock in)",
            "SBI Magnum Children's Benefit Fund": "SBI Children's Fund-Savings Plan",
            "DSP India T.I.G.E.R. (The Infrastructure Growth and Economic Reforms Fund": "DSP India T.I.G.E.R. Fund",
            "Kotak Infrastructure and Economic Reform Fund": "Kotak Infrastructure & Economic Reform Fund",
            "DSP Natural Resources and New Energy Fund": "DSP Natural Res & New Energy Fund",
            "SBI Magnum Gilt Fund": "SBI Gilt Fund",
            "Edelweiss Emerging Markets Opportunities Equity Offshore Fund": "Edelweiss Emerging Markets Opportunities Fund",
            "Bandhan Government Securities Investment Plan Fund": "Bandhan Government Securities Fund",
            "Aditya Birla Sun Life Dynamic Bond Retail Fund": "Aditya Birla Sun Life Dynamic Bond Fund",
            "Kotak Multi Asset Allocator FoF - Dynamic Fund": "Kotak Multi Asset Allocator Fund",
            "ICICI Prudential Banking and Financial Services Fund": "ICICI Prudential Banking & Fin Serv Fund",
            "ICICI Prudential Income Plus Arbitrage Active FoF Fund": "ICICI Prudential Income plus Arbitrage Omni FoF Fund",
            "Bandhan CRISIL IBX 90:10 SDL Plus Gilt- November 2026 Index Fund": "Bandhan CRISIL IBX 90:10 SDL Plus Gilt- November 2026 Index Fund",
            "Bandhan CRISIL IBX 90:10 SDL Plus Gilt-September 2027 Index Fund": "Bandhan CRISIL IBX 90:10 SDL Plus Gilt-September 2027 Index Fund"
        };

        const updatedJson = jsonData.map((fund) => {
            let fundNorm = normalize(fund.name);
            let match = null;

            // Check manual mappings first
            if (manualMappings[fund.name]) {
                const mappedName = normalize(manualMappings[fund.name]);
                match = csvMap.get(mappedName);
                if (!match) {
                    // Try finding it directly in the values if normalization differed slightly
                    for (const row of csvData) {
                        if (normalize(row.Name) === mappedName) {
                            match = row;
                            break;
                        }
                    }
                }
            }

            if (!match) {
                match = csvMap.get(fundNorm);
            }

            // Fuzzy matching if no exact match
            if (!match) {
                let bestMatch = null;
                let bestDistance = Infinity;
                const threshold = 3; // Allow small variations

                // We iterate CSV keys - expensive but effective for < 2000 items
                for (const [key, row] of csvMap) {
                    // Optimization: Skip if length diff is too big
                    if (Math.abs(key.length - fundNorm.length) > threshold) continue;

                    const dist = levenshtein(key, fundNorm);
                    if (dist < bestDistance) {
                        bestDistance = dist;
                        bestMatch = row;
                    }
                }

                if (bestDistance <= threshold) {
                    match = bestMatch;
                    fuzzyMatches.push(`${fund.name} -> ${match.Name} (Dist: ${bestDistance})`);
                }
            }

            if (match) {
                // Benchmark
                if (match.Benchmark) fund.benchmark = match.Benchmark;

                // Alpha
                if (match.Alpha) {
                    const alpha = parseFloat(match.Alpha.replace('%', ''));
                    // Allow 0 and negatives, check for actual NaN
                    if (!isNaN(alpha)) fund.alpha = alpha;
                }

                // CAGR 10Y
                if (match['CAGR 10Y']) {
                    const cagr = parseFloat(match['CAGR 10Y'].replace('%', '').replace('N/A', ''));
                    if (!isNaN(cagr)) fund.returns["10Y"] = cagr; // Moved to returns
                }

                // Rolling Returns
                if (match['3Y Avg Annual Rolling Return ']) {
                    const rr = parseFloat(match['3Y Avg Annual Rolling Return '].replace('%', ''));
                    if (!isNaN(rr)) fund.returns.rolling = rr; // Moved to returns
                }

                // Cleanup old root properties if they exist
                delete fund.cagr10Y;
                delete fund.rollingReturns;

                updatedCount++;
                return fund;
            } else {
                notFound.push(fund.name);
                // Set default values as requested
                fund.alpha = 0;
                fund.benchmark = "N/A";
                // Ensure returns object exists and set defaults if needed, though usually it does
                // fund.returns["10Y"] = undefined; 
                // fund.returns.rolling = undefined;
                return fund;
            }
        });

        console.log(`Updated ${updatedCount} funds.`);
        if (fuzzyMatches.length > 0) {
            console.log(`Fuzzy matched ${fuzzyMatches.length} funds. Examples:`);
            console.log(fuzzyMatches.slice(0, 5));
        }

        if (notFound.length > 0) {
            console.log("--- MISSING FUNDS START ---");
            // console.log(JSON.stringify(notFound, null, 2));
            fs.writeFileSync('missing_funds.json', JSON.stringify(notFound, null, 2));
            console.log("--- MISSING FUNDS END ---");
            console.log(`Total Missing: ${notFound.length}`);
            console.log("Missing funds written to missing_funds.json");
        }

        fs.writeFileSync(JSON_PATH, JSON.stringify(updatedJson, null, 2));

    } catch (error) {
        console.error("Error updating data:", error);
    }
};

updateData();
