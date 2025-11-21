export interface GoalInput {
    targetAmount: number;
    yearsToGoal: number;
    expectedReturn: number;
    inflationRate: number;
    existingCorpus: number;
    stepUpPercentage: number;
}

export interface YearlyGoalData {
    year: number;
    investedAmount: number;
    existingCorpusValue: number;
    sipValue: number;
    totalValue: number;
    targetLine: number; // The inflation-adjusted target for that year (interpolated or final?) 
    // Usually for charts, we show the growth vs the FINAL target, 
    // or the target growing year by year? 
    // "Reality Check" implies the target grows. 
    // Let's track the target's value at that year.
}

export interface GoalResult {
    monthlySIP: number;
    futureCost: number;
    corpusGrowth: number;
    sipAccumulation: number;
    totalWealth: number;
    yearlyData: YearlyGoalData[];
}

export const calculateGoalSIP = (input: GoalInput): GoalResult => {
    const {
        targetAmount,
        yearsToGoal,
        expectedReturn,
        inflationRate,
        existingCorpus,
        stepUpPercentage,
    } = input;

    // 1. Inflation Adjustment (Future Cost)
    const futureCost = targetAmount * Math.pow(1 + inflationRate / 100, yearsToGoal);

    // 2. Existing Corpus Growth (Monthly Compounding to match SIP logic)
    const monthlyRate = expectedReturn / 1200;
    const corpusGrowth = existingCorpus * Math.pow(1 + monthlyRate, yearsToGoal * 12);

    // 3. Gap to Bridge
    const requiredWealth = futureCost - corpusGrowth;

    let monthlySIP = 0;
    let sipAccumulation = 0;

    // 4. Solve for SIP
    if (requiredWealth > 0) {
        // Calculate FV of a 1 Rupee SIP with Step-Up
        let unitBalance = 0;
        let unitSIP = 1;

        for (let y = 1; y <= yearsToGoal; y++) {
            for (let m = 1; m <= 12; m++) {
                // Investment at start of month
                unitBalance = (unitBalance + unitSIP) * (1 + monthlyRate);
            }
            // Annual Step-Up
            unitSIP = unitSIP * (1 + stepUpPercentage / 100);
        }

        monthlySIP = requiredWealth / unitBalance;
        sipAccumulation = requiredWealth;
    } else {
        monthlySIP = 0;
        sipAccumulation = 0;
    }

    // 5. Generate Yearly Data for Chart
    const yearlyData: YearlyGoalData[] = [];
    let currentCorpus = existingCorpus;
    let currentSipBalance = 0;
    let currentSIP = monthlySIP;
    let totalInvested = existingCorpus; // Initial lump sum

    // Initial Point (Year 0)
    yearlyData.push({
        year: 0,
        investedAmount: existingCorpus,
        existingCorpusValue: existingCorpus,
        sipValue: 0,
        totalValue: existingCorpus,
        targetLine: targetAmount,
    });

    for (let y = 1; y <= yearsToGoal; y++) {
        // Grow Existing Corpus (Annual Compounding for simplicity in breakdown, or match monthly)
        // Let's match the monthly compounding used in calculation
        for (let m = 1; m <= 12; m++) {
            currentCorpus = currentCorpus * (1 + monthlyRate);
        }

        // Grow SIP
        let yearInvested = 0;
        if (monthlySIP > 0) {
            for (let m = 1; m <= 12; m++) {
                currentSipBalance = (currentSipBalance + currentSIP) * (1 + monthlyRate);
                yearInvested += currentSIP;
            }
        }

        totalInvested += yearInvested;

        // Target Line (Inflation Adjusted for this year)
        const currentTarget = targetAmount * Math.pow(1 + inflationRate / 100, y);

        yearlyData.push({
            year: y,
            investedAmount: Math.round(totalInvested),
            existingCorpusValue: Math.round(currentCorpus),
            sipValue: Math.round(currentSipBalance),
            totalValue: Math.round(currentCorpus + currentSipBalance),
            targetLine: Math.round(currentTarget),
        });

        // Step Up for next year
        currentSIP = currentSIP * (1 + stepUpPercentage / 100);
    }

    return {
        monthlySIP: Math.round(monthlySIP),
        futureCost: Math.round(futureCost),
        corpusGrowth: Math.round(corpusGrowth),
        sipAccumulation: Math.round(sipAccumulation),
        totalWealth: Math.round(corpusGrowth + sipAccumulation),
        yearlyData,
    };
};
