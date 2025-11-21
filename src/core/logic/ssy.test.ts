import { calculateSSY, SsyInput } from './ssy';

console.log('Testing SSY Calculator Logic...');

// Test Case 1: Standard Case (No Withdrawal)
const input1: SsyInput = {
    girlAge: 5,
    startYear: 2024,
    investmentFrequency: 'Yearly',
    investmentAmount: 150000,
    interestRate: 8.2,
    withdrawalAge: null,
    withdrawalPercentage: 0
};

const result1 = calculateSSY(input1);
console.log('\n--- Test Case 1: Standard (1.5L/yr, No Withdrawal) ---');
console.log('Total Invested:', result1.totalInvested); // Should be 15 * 1.5L = 22.5L
console.log('Maturity Corpus:', result1.maturityCorpus);
console.log('Education Fund:', result1.educationFund); // Should be 0

// Test Case 2: With Withdrawal
const input2: SsyInput = {
    girlAge: 5,
    startYear: 2024,
    investmentFrequency: 'Yearly',
    investmentAmount: 150000,
    interestRate: 8.2,
    withdrawalAge: 18,
    withdrawalPercentage: 50
};

const result2 = calculateSSY(input2);
console.log('\n--- Test Case 2: With Withdrawal (50% at 18) ---');
console.log('Total Invested:', result2.totalInvested);
console.log('Maturity Corpus:', result2.maturityCorpus);
console.log('Education Fund:', result2.educationFund);

// Verify withdrawal amount
const withdrawalYear = result2.yearlyBreakdown.find(y => y.age === 18);
console.log('Withdrawal Amount in Breakdown:', withdrawalYear?.withdrawal);
console.log('Opening Balance at 18:', withdrawalYear?.openingBalance);
if (withdrawalYear) {
    const expectedMax = withdrawalYear.openingBalance * 0.5;
    console.log('Expected Max Withdrawal:', expectedMax);
    console.log('Is Withdrawal Correct?', Math.abs(withdrawalYear.withdrawal - expectedMax) < 10 ? 'YES' : 'NO');
}

// Test Case 3: Investment Cap
const input3: SsyInput = {
    girlAge: 1,
    startYear: 2024,
    investmentFrequency: 'Yearly',
    investmentAmount: 200000, // 2L, should cap at 1.5L
    interestRate: 8.2,
    withdrawalAge: null,
    withdrawalPercentage: 0
};

const result3 = calculateSSY(input3);
console.log('\n--- Test Case 3: Investment Cap (Input 2L) ---');
console.log('Total Invested:', result3.totalInvested); // Should be 15 * 1.5L = 22.5L
console.log('Is Capped Correctly?', result3.totalInvested === 2250000 ? 'YES' : 'NO');
