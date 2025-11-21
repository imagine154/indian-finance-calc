export interface InvestmentInput {
    amount: number;
    horizonYears: number;
    riskProfile: 'Conservative' | 'Aggressive';
}

export interface AssetAllocation {
    name: string;
    percentage: number;
    type: 'Equity' | 'Debt' | 'Gold' | 'Hybrid';
}

export interface InvestmentAdvice {
    allocation: AssetAllocation[];
    expectedReturnRate: number;
    projectedValue: number;
    reasoning: string;
}

export const getInvestmentAdvice = (input: InvestmentInput): InvestmentAdvice => {
    const { amount, horizonYears, riskProfile } = input;
    let allocation: AssetAllocation[] = [];
    let expectedReturnRate = 0;
    let reasoning = "";

    // Logic Matrix
    if (horizonYears <= 3) {
        // 0-3 Years (Short Term)
        if (riskProfile === 'Conservative') {
            allocation = [
                { name: "Fixed Deposits (FD)", percentage: 60, type: "Debt" },
                { name: "Liquid Mutual Funds", percentage: 40, type: "Debt" },
            ];
            expectedReturnRate = 6.5;
            reasoning = "For short durations (< 3 years), capital protection is priority. FDs and Liquid Funds offer stability with low risk.";
        } else {
            allocation = [
                { name: "Arbitrage Funds", percentage: 20, type: "Equity" },
                { name: "Short Duration Debt Funds", percentage: 80, type: "Debt" },
            ];
            expectedReturnRate = 7.5;
            reasoning = "Even for aggressive investors, short term requires stability. A small equity portion (Arbitrage) boosts tax-efficient returns.";
        }
    } else if (horizonYears <= 7) {
        // 3-7 Years (Medium Term)
        if (riskProfile === 'Conservative') {
            allocation = [
                { name: "Conservative Hybrid Funds", percentage: 30, type: "Hybrid" },
                { name: "Corporate Bond Funds", percentage: 70, type: "Debt" },
            ];
            expectedReturnRate = 9.0;
            reasoning = "For medium term, a small equity exposure (via Hybrid funds) helps beat inflation while debt keeps the portfolio stable.";
        } else {
            allocation = [
                { name: "Large Cap / Index Funds", percentage: 50, type: "Equity" },
                { name: "Banking & PSU Debt Funds", percentage: 50, type: "Debt" },
            ];
            expectedReturnRate = 10.5;
            reasoning = "A balanced 50-50 approach allows for growth from Large Cap equity while maintaining a strong safety net with Debt.";
        }
    } else if (horizonYears <= 15) {
        // 7-15 Years (Long Term)
        if (riskProfile === 'Conservative') {
            allocation = [
                { name: "Nifty 50 Index Funds", percentage: 60, type: "Equity" },
                { name: "Gold / Sovereign Gold Bonds", percentage: 10, type: "Gold" },
                { name: "Debt Funds", percentage: 30, type: "Debt" },
            ];
            expectedReturnRate = 11.0;
            reasoning = "Over 7+ years, equity is safer. Index funds provide steady growth. Gold adds a hedge against inflation.";
        } else {
            allocation = [
                { name: "Flexi Cap Funds", percentage: 50, type: "Equity" },
                { name: "Mid Cap Funds", percentage: 30, type: "Equity" },
                { name: "Debt Funds", percentage: 20, type: "Debt" },
            ];
            expectedReturnRate = 13.0;
            reasoning = "With a long horizon, you can afford volatility. Flexi and Mid Cap funds offer superior wealth creation potential.";
        }
    } else {
        // 15+ Years (Wealth Creation)
        if (riskProfile === 'Conservative') {
            allocation = [
                { name: "Large & Mid Cap Funds", percentage: 75, type: "Equity" },
                { name: "Debt Funds", percentage: 25, type: "Debt" },
            ];
            expectedReturnRate = 12.0;
            reasoning = "For very long durations, even conservative investors should be heavy on equity to generate real wealth.";
        } else {
            allocation = [
                { name: "Small Cap Funds", percentage: 40, type: "Equity" },
                { name: "Mid Cap Funds", percentage: 40, type: "Equity" },
                { name: "Flexi Cap Funds", percentage: 15, type: "Equity" },
                { name: "Debt Funds", percentage: 5, type: "Debt" },
            ];
            expectedReturnRate = 15.0;
            reasoning = "Maximum aggression for maximum wealth. Small and Mid caps have historically outperformed all asset classes over 15+ years.";
        }
    }

    // Calculate Projected Value: Compound Interest Formula
    // A = P * (1 + r/100)^t
    const projectedValue = amount * Math.pow((1 + expectedReturnRate / 100), horizonYears);

    return {
        allocation,
        expectedReturnRate,
        projectedValue,
        reasoning
    };
};
