import { calculateGoalSIP, GoalInput } from './goal';

console.log('Testing Goal Calculator Logic...');

// Test Case 1: Simple Reverse SIP (No Inflation, No Existing Corpus, No Step-Up)
// Target: 12L in 1 year. Return 0%. SIP should be 1L.
const input1: GoalInput = {
    targetAmount: 1200000,
    yearsToGoal: 1,
    expectedReturn: 0,
    inflationRate: 0,
    existingCorpus: 0,
    stepUpPercentage: 0
};

const result1 = calculateGoalSIP(input1);
console.log('\n--- Test Case 1: Simple (Target 12L, 1Y, 0% Return) ---');
console.log('Monthly SIP:', result1.monthlySIP); // Should be 100,000
console.log('Is Correct?', Math.abs(result1.monthlySIP - 100000) < 10 ? 'YES' : 'NO');


// Test Case 2: Inflation Impact
// Target: 1L today. Inflation 10%. 1 Year. Future Cost should be 1.1L.
const input2: GoalInput = {
    targetAmount: 100000,
    yearsToGoal: 1,
    expectedReturn: 0,
    inflationRate: 10,
    existingCorpus: 0,
    stepUpPercentage: 0
};

const result2 = calculateGoalSIP(input2);
console.log('\n--- Test Case 2: Inflation (Target 1L, 1Y, 10% Inflation) ---');
console.log('Future Cost:', result2.futureCost); // Should be 110,000
console.log('Is Correct?', Math.abs(result2.futureCost - 110000) < 10 ? 'YES' : 'NO');


// Test Case 3: Existing Corpus Growth
// Corpus 1L. Return 10%. 1 Year. Growth should be 1.1L.
// Target 1.1L. Gap should be 0. SIP 0.
const input3: GoalInput = {
    targetAmount: 110000,
    yearsToGoal: 1,
    expectedReturn: 10,
    inflationRate: 0,
    existingCorpus: 100000,
    stepUpPercentage: 0
};

const result3 = calculateGoalSIP(input3);
console.log('\n--- Test Case 3: Existing Corpus (Corpus 1L, 1Y, 10% Return) ---');
console.log('Corpus Growth:', result3.corpusGrowth); // Should be ~110471 (Monthly Compounding)
console.log('Monthly SIP:', result3.monthlySIP); // Should be 0
console.log('Is Correct?', Math.abs(result3.corpusGrowth - 110471) < 10 && result3.monthlySIP === 0 ? 'YES' : 'NO');


// Test Case 4: Step-Up SIP
// Target 24L. 2 Years. 0% Return.
// Year 1 SIP: P * 12
// Year 2 SIP: P * 1.1 * 12 (10% Step Up)
// Total = 12P + 13.2P = 25.2P = 24L => P = 24L / 25.2 = 95238
const input4: GoalInput = {
    targetAmount: 2400000,
    yearsToGoal: 2,
    expectedReturn: 0,
    inflationRate: 0,
    existingCorpus: 0,
    stepUpPercentage: 10
};

const result4 = calculateGoalSIP(input4);
console.log('\n--- Test Case 4: Step-Up SIP (Target 24L, 2Y, 10% Step-Up) ---');
console.log('Monthly SIP:', result4.monthlySIP);
const expectedSIP = 2400000 / 25.2;
console.log('Expected SIP:', expectedSIP);
console.log('Is Correct?', Math.abs(result4.monthlySIP - expectedSIP) < 100 ? 'YES' : 'NO');
