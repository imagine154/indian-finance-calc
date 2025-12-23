export const STCG_RATE = 0.20; // 20%
export const LTCG_RATE = 0.125; // 12.5%
export const LTCG_EXEMPTION = 125000; // ₹1.25 Lakh

export type HoldingType = 'STCG' | 'LTCG';

export interface Holding {
    id: string;
    name: string;
    quantity: number;
    unrealizedPnL: number; // Total PnL for this holding
    type: HoldingType;
}

export interface SellRecommendation {
    stock: string;
    unitsToSell: number; // For now, we assume selling all units of the loser logic or a portion to match exact loss needed? 
    // Prompt implied "Suggest selling STCG-loss holdings first". 
    // Usually you sell the whole losing position or enough to offset. 
    // Let's assume selling entire position for simplicity unless logic requires partial.
    // However, prompt said "unitsToSell". 
    // Let's calculate exactly how many units needed if possible, or just all if loss < gain.
    lossBooked: number;
    type: HoldingType;
}

export interface HarvestingResult {
    sellList: SellRecommendation[];
    taxSaved: number;
    summary: string;
    originalTaxLiability: number;
    newTaxLiability: number;
}

/**
 * Analyzing harvesting opportunities based on FY24-25 Rules:
 * STCG Tax: 20%
 * LTCG Tax: 12.5% above 1.25L exemption
 * 
 * Strategy:
 * 1. Calculate current Tax Liability.
 * 2. If STCG Tax > 0: Find STCG Losers to offset STCG. (20% savings)
 * 3. If LTCG Tax > 0: Find LTCG Losers to offset LTCG (12.5% savings)
 *    (Note: STCL can technically offset LTCG too, but we prioritize high tax STCG first).
 */
export function analyzeHarvestingOpportunities(
    realizedSTCG: number,
    realizedLTCG: number,
    holdings: Holding[]
): HarvestingResult {
    // 1. Current Tax Calculation
    let taxableSTCG = Math.max(0, realizedSTCG);
    let taxableLTCG = Math.max(0, realizedLTCG - LTCG_EXEMPTION);

    const originalTaxLiability = (taxableSTCG * STCG_RATE) + (taxableLTCG * LTCG_RATE);

    if (originalTaxLiability <= 0) {
        return {
            sellList: [],
            taxSaved: 0,
            summary: "You have no tax liability to offset.",
            originalTaxLiability,
            newTaxLiability: 0
        };
    }

    const sellList: SellRecommendation[] = [];

    // Separate losers
    // We only care about holdings with NEGATIVE PnL for harvesting
    // We map them to a mutable structure to track used losses
    const losers = holdings
        .filter(h => h.unrealizedPnL < 0)
        .map(h => ({ ...h, remainingLoss: Math.abs(h.unrealizedPnL), originalQty: h.quantity }));

    // Helper to harvest losses
    const harvest = (targetGain: number, lossType: HoldingType): number => {
        let internalGain = targetGain;
        let offsetAchieved = 0;

        // Filter relevant losers
        const relevantLosers = losers.filter(l => l.type === lossType && l.remainingLoss > 0);
        // Sort by largest loss first? Or smallest? Usually irrelevant for pure math, largest first clears big chunks.
        relevantLosers.sort((a, b) => b.remainingLoss - a.remainingLoss);

        for (const loser of relevantLosers) {
            if (internalGain <= 0) break;

            const lossToUtilize = Math.min(internalGain, loser.remainingLoss);

            // Calculate units roughly needed to achieve this loss
            // loss per unit = total loss / total qty
            const lossPerUnit = Math.abs(loser.unrealizedPnL) / loser.originalQty;
            const unitsNeeded = Math.ceil(lossToUtilize / lossPerUnit);

            // Actual booked loss might be slightly higher due to ceil, but let's cap at max available
            const actualUnitsToSell = Math.min(unitsNeeded, loser.quantity); // use quantity from map if we were updating it, but we use originalQty
            // Actually we should track remaining units if we want to be precise, but for MVP let's assume simple linear.

            // Let's just recommend selling the needed amount. 
            // If we sell 'actualUnitsToSell', the booked loss is:
            const bookedLoss = actualUnitsToSell * lossPerUnit;

            sellList.push({
                stock: loser.name,
                unitsToSell: actualUnitsToSell,
                lossBooked: bookedLoss,
                type: loser.type
            });

            loser.remainingLoss -= bookedLoss;
            internalGain -= bookedLoss;
            offsetAchieved += bookedLoss;
        }
        return offsetAchieved;
    };

    // 2. Offset STCG first (Priority: 20% tax)
    // We use STCG losers (STCL) to offset STCG
    let stcgOffset = 0;
    if (taxableSTCG > 0) {
        stcgOffset = harvest(taxableSTCG, 'STCG');
        taxableSTCG -= stcgOffset;
    }

    // 3. Offset LTCG next (Priority: 12.5% tax)
    // We use LTCG losers (LTCL) to offset LTCG
    let ltcgOffset = 0;
    if (taxableLTCG > 0) {
        ltcgOffset = harvest(taxableLTCG, 'LTCG');
        taxableLTCG -= ltcgOffset;
    }

    // Note: Technically STCL can offset LTCG if STCG is exhausted.
    // The requirements said: "If Taxable LTCG > 0: Suggest selling LTCG-loss holdings."
    // It didn't explicitly say "Use remaining STCL for LTCG", but that is valid tax law.
    // For MVP strict adherence to prompt specs:
    // "If Taxable STCG > 0: Suggest selling STCG-loss holdings first"
    // "If Taxable LTCG > 0: Suggest selling LTCG-loss holdings"
    // Examples didn't mention cross-utilization. I will stick to same-bucket harvesting for simplicity unless opportunities remain.
    // If I have extra STCL and remaining LTCG tax, I *should* use it to be a "good" advisor.
    // Let's add that pass: Use remaining STCL for LTCG.

    if (taxableLTCG > 0) {
        const extraStclOffset = harvest(taxableLTCG, 'STCG');
        taxableLTCG -= extraStclOffset;
    }

    const newTaxLiability = (Math.max(0, taxableSTCG) * STCG_RATE) + (Math.max(0, taxableLTCG) * LTCG_RATE);
    const taxSaved = originalTaxLiability - newTaxLiability;

    // Generate Summary
    const totalBookedLoss = sellList.reduce((acc, curr) => acc + curr.lossBooked, 0);
    let summary = "";
    if (sellList.length > 0) {
        summary = `Sell ${sellList.length} holdings to book a loss of ₹${Math.round(totalBookedLoss).toLocaleString('en-IN')}, saving ₹${Math.round(taxSaved).toLocaleString('en-IN')} in taxes.`;
    } else {
        summary = "No harvesting opportunities found among your loss-making holdings.";
    }

    return {
        sellList,
        taxSaved,
        summary,
        originalTaxLiability,
        newTaxLiability
    };
}
