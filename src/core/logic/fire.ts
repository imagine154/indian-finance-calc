export interface FireGoal {
    id: string;
    type: string;
    cost: number;
    year: number; // Years from now
}

export interface FireInputs {
    age: number;
    retireAge: number;
    currentExpenses: number; // Monthly
    inflation: number; // Percentage (e.g., 6)
    preRetirementReturn: number; // Percentage (e.g., 12)
    postRetirementReturn: number; // Percentage (e.g., 8)
    lifeExpectancy: number;
    goals: FireGoal[];
}

export interface FireResult {
    yearsToRetire: number;
    projectedAnnualExpense: number;

    // Final numbers (Base + Goals)
    leanFire: number;
    standardFire: number;
    fatFire: number;
    coastFire: number;

    // Base numbers (Expenses only)
    baseLeanFire: number;
    baseStandardFire: number;
    baseFatFire: number;
    baseCoastFire: number;

    // Goal components
    goalsCorpusAtRetirement: number; // Amount needed at retirement for goals
    goalsPvToday: number; // Amount needed TODAY for goals (for Coast FIRE)

    finalFireNumber: number; // Same as standardFire

    goalsBreakdown: {
        id: string;
        futureCost: number;
        corpusRequiredAtRetirement: number;
        pvToday: number;
    }[];
}

export const calculateFireStats = (inputs: FireInputs): FireResult => {
    const {
        age,
        retireAge,
        currentExpenses,
        inflation,
        preRetirementReturn,
        postRetirementReturn,
        goals,
    } = inputs;

    const yearsToRetire = Math.max(0, retireAge - age);

    // 1. Projections
    const annualExpenses = currentExpenses * 12;
    const inflationRate = inflation / 100;
    const preReturnRate = preRetirementReturn / 100;
    const postReturnRate = postRetirementReturn / 100;

    // Future annual expense at retirement
    const projectedAnnualExpense = annualExpenses * Math.pow(1 + inflationRate, yearsToRetire);

    // 2. Base Benchmarks (Expenses Only)
    const baseStandardFire = projectedAnnualExpense * 25;
    const baseLeanFire = projectedAnnualExpense * 15;
    const baseFatFire = projectedAnnualExpense * 50;

    // Base Coast FIRE = Base Standard / (1 + r)^n
    const baseCoastFire = baseStandardFire / Math.pow(1 + preReturnRate, yearsToRetire);

    // 3. Goal Calculation
    let goalsCorpusAtRetirement = 0;
    let goalsPvToday = 0;

    const goalsBreakdown = goals.map((goal) => {
        // Future cost of the goal
        const futureCost = goal.cost * Math.pow(1 + inflationRate, goal.year);

        // 1. Corpus Required at Retirement (for Lean/Std/Fat)
        let corpusRequiredAtRetirement = 0;

        if (goal.year <= yearsToRetire) {
            // Goal is before or at retirement.
            // We assume we need to have this money + lost opportunity cost.
            // Equivalent value at Retirement Year = FutureCost * (1 + PreReturn)^(RetireYear - GoalYear).
            const yearsToCompound = yearsToRetire - goal.year;
            corpusRequiredAtRetirement = futureCost * Math.pow(1 + preReturnRate, yearsToCompound);
        } else {
            // Goal is after retirement.
            // PV at Retirement = FutureCost / (1 + PostReturn)^(GoalYear - RetireYear)
            const yearsPostRetire = goal.year - yearsToRetire;
            corpusRequiredAtRetirement = futureCost / Math.pow(1 + postReturnRate, yearsPostRetire);
        }

        // 2. PV Today (for Coast FIRE)
        // Amount needed TODAY to fund this goal, assuming it grows at PreReturn until needed?
        // Wait, if goal is post-retirement, does it grow at PreReturn until retirement then PostReturn?
        // The prompt says: "goalCoast = Sum of (goal.futureCost) / (1 + preReturn)^goal.yearsFromNow".
        // This assumes PreReturn applies for the whole duration until the goal.
        // This is a simplification but follows the prompt's instruction for Coast FIRE.
        // However, strictly speaking, if it's post-retirement, the growth rate changes.
        // But Coast FIRE usually asks "How much do I need invested TODAY in my aggressive portfolio".
        // Let's stick to the prompt's formula: (goal.futureCost) / (1 + preReturn)^goal.yearsFromNow.

        const pvToday = futureCost / Math.pow(1 + preReturnRate, goal.year);

        goalsCorpusAtRetirement += corpusRequiredAtRetirement;
        goalsPvToday += pvToday;

        return {
            id: goal.id,
            futureCost,
            corpusRequiredAtRetirement,
            pvToday,
        };
    });

    // 4. Final Numbers
    const leanFire = baseLeanFire + goalsCorpusAtRetirement;
    const standardFire = baseStandardFire + goalsCorpusAtRetirement;
    const fatFire = baseFatFire + goalsCorpusAtRetirement;

    const coastFire = baseCoastFire + goalsPvToday;

    return {
        yearsToRetire,
        projectedAnnualExpense,

        leanFire,
        standardFire,
        fatFire,
        coastFire,

        baseLeanFire,
        baseStandardFire,
        baseFatFire,
        baseCoastFire,

        goalsCorpusAtRetirement,
        goalsPvToday,

        finalFireNumber: standardFire,
        goalsBreakdown,
    };
};
