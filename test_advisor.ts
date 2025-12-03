
import { getInvestmentAdvice, InvestmentInput } from './src/core/logic/investment-advisor';

const inputs: InvestmentInput[] = [
    { amount: 100000, horizonYears: 2, riskProfile: 'Conservative' },
    { amount: 100000, horizonYears: 5, riskProfile: 'Aggressive' },
    { amount: 100000, horizonYears: 10, riskProfile: 'Conservative' },
    { amount: 100000, horizonYears: 20, riskProfile: 'Aggressive' },
];

inputs.forEach(input => {
    console.log(`Input: Horizon=${input.horizonYears}, Risk=${input.riskProfile}`);
    const advice = getInvestmentAdvice(input);
    console.log('Allocation:', JSON.stringify(advice.allocation, null, 2));
    console.log('-----------------------------------');
});
