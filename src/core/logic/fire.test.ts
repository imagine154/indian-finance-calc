import { calculateFireStats, FireInputs } from './fire';

describe('FIRE Calculator Logic', () => {
    const baseInputs: FireInputs = {
        age: 30,
        retireAge: 50, // 20 years to retire
        currentExpenses: 50000, // 6L annual
        inflation: 6,
        preRetirementReturn: 12,
        postRetirementReturn: 8,
        lifeExpectancy: 85,
        goals: [],
    };

    test('calculates base FIRE numbers correctly without goals', () => {
        const result = calculateFireStats(baseInputs);

        // 1. Projections
        // Annual Exp = 6,00,000
        // Inflation 6% for 20 years: 600000 * (1.06)^20 ~= 600000 * 3.2071 = 19,24,281
        const expectedProjectedAnnual = 600000 * Math.pow(1.06, 20);
        expect(result.projectedAnnualExpense).toBeCloseTo(expectedProjectedAnnual, 0);

        // 2. Benchmarks
        // Standard = 25x
        const expectedStandard = expectedProjectedAnnual * 25;
        expect(result.standardFire).toBeCloseTo(expectedStandard, 0);
        expect(result.baseStandardFire).toBeCloseTo(expectedStandard, 0);

        // Lean = 15x
        expect(result.leanFire).toBeCloseTo(expectedProjectedAnnual * 15, 0);

        // Fat = 50x
        expect(result.fatFire).toBeCloseTo(expectedProjectedAnnual * 50, 0);

        // 3. Coast FIRE
        // Need Standard FIRE amount TODAY growing at 12% for 20 years
        // Coast = Standard / (1.12)^20
        const expectedCoast = expectedStandard / Math.pow(1.12, 20);
        expect(result.coastFire).toBeCloseTo(expectedCoast, 0);
    });

    test('calculates FIRE numbers correctly WITH goals', () => {
        const inputsWithGoal: FireInputs = {
            ...baseInputs,
            goals: [
                {
                    id: '1',
                    type: 'Education',
                    cost: 1000000, // 10L today
                    year: 15, // 15 years from now (5 years before retirement)
                }
            ]
        };

        const result = calculateFireStats(inputsWithGoal);

        // Base numbers should remain same
        const expectedProjectedAnnual = 600000 * Math.pow(1.06, 20);
        const expectedBaseStandard = expectedProjectedAnnual * 25;
        expect(result.baseStandardFire).toBeCloseTo(expectedBaseStandard, 0);

        // Goal Calculations
        // Future Cost of Goal (15 years, 6% inflation)
        const futureCost = 1000000 * Math.pow(1.06, 15);

        // Corpus Required at Retirement (Year 20)
        // Goal is at Year 15. We need to fund it then.
        // But the logic calculates "Corpus at Retirement" to add to the pot.
        // If goal is pre-retirement (Year 15), we assume we need that money at Year 15.
        // To have that money at Year 15, we need some amount at Year 20? No.
        // The logic says: `corpusRequiredAtRetirement = futureCost * (1 + preReturn)^(RetireYear - GoalYear)`
        // Meaning: If I need 10L at Year 15, that's equivalent to having 10L * (1.12)^5 at Year 20.
        // This effectively treats the goal as a liability that compounds until retirement.
        const expectedGoalCorpusAtRetirement = futureCost * Math.pow(1.12, 5);

        expect(result.goalsCorpusAtRetirement).toBeCloseTo(expectedGoalCorpusAtRetirement, 0);

        // Final Standard FIRE = Base + Goal Corpus
        expect(result.standardFire).toBeCloseTo(expectedBaseStandard + expectedGoalCorpusAtRetirement, 0);

        // Coast FIRE with Goal
        // PV of Goal Today = FutureCost / (1.12)^15
        // OR simply CostToday * (1.06)^15 / (1.12)^15 ??
        // Logic: pvToday = futureCost / (1 + preReturn)^goal.year
        const expectedGoalPvToday = futureCost / Math.pow(1.12, 15);

        const expectedBaseCoast = expectedBaseStandard / Math.pow(1.12, 20);
        expect(result.coastFire).toBeCloseTo(expectedBaseCoast + expectedGoalPvToday, 0);
    });
});
