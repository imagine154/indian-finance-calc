export interface ApyInput {
    joiningAge: number;
    desiredPension: 1000 | 2000 | 3000 | 4000 | 5000;
}

export interface ApyResult {
    monthlyContribution: number;
    totalInvestment: number;
    maturityCorpus: number;
    yearsToInvest: number;
}

// Data Points based on user input and research
// Format: Age: { PensionAmount: MonthlyContribution }
const APY_DATA_POINTS: Record<number, Record<number, number>> = {
    18: { 1000: 42, 2000: 84, 3000: 126, 4000: 168, 5000: 210 },
    25: { 1000: 76, 2000: 151, 3000: 226, 4000: 301, 5000: 376 },
    30: { 1000: 116, 2000: 231, 3000: 347, 4000: 462, 5000: 577 },
    40: { 1000: 291, 2000: 582, 3000: 873, 4000: 1164, 5000: 1454 },
};

// Helper to interpolate values linearly
const interpolate = (age: number, pension: number): number => {
    const ages = Object.keys(APY_DATA_POINTS).map(Number).sort((a, b) => a - b);

    // Exact match
    if (APY_DATA_POINTS[age]) {
        return APY_DATA_POINTS[age][pension];
    }

    // Find lower and upper bounds
    let lowerAge = ages[0];
    let upperAge = ages[ages.length - 1];

    for (let i = 0; i < ages.length - 1; i++) {
        if (age > ages[i] && age < ages[i + 1]) {
            lowerAge = ages[i];
            upperAge = ages[i + 1];
            break;
        }
    }

    const lowerVal = APY_DATA_POINTS[lowerAge][pension];
    const upperVal = APY_DATA_POINTS[upperAge][pension];

    // Linear Interpolation Formula: y = y1 + ((x - x1) * (y2 - y1)) / (x2 - x1)
    const interpolatedVal = lowerVal + ((age - lowerAge) * (upperVal - lowerVal)) / (upperAge - lowerAge);

    return Math.round(interpolatedVal);
};

export const calculateAPY = (input: ApyInput): ApyResult => {
    const { joiningAge, desiredPension } = input;

    // Validate Age
    if (joiningAge < 18 || joiningAge > 40) {
        throw new Error("Joining age must be between 18 and 40");
    }

    const monthlyContribution = interpolate(joiningAge, desiredPension);
    const yearsToInvest = 60 - joiningAge;
    const totalInvestment = monthlyContribution * 12 * yearsToInvest;

    // Corpus Calculation (Future Value of SIP at 8.5%)
    // Formula: P * [((1 + i)^n - 1) / i] * (1 + i)
    // where P = Monthly Investment, i = Monthly Interest Rate, n = Total Months
    const annualRate = 0.085;
    const monthlyRate = annualRate / 12;
    const totalMonths = yearsToInvest * 12;

    const maturityCorpus = monthlyContribution *
        ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
        (1 + monthlyRate);

    return {
        monthlyContribution,
        totalInvestment,
        maturityCorpus: Math.round(maturityCorpus),
        yearsToInvest
    };
};
