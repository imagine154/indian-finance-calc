import { calculateSalaryBreakdown, SalaryInput } from './salary';

console.log('Testing Salary Calculator Logic...');

const input: SalaryInput = {
    ctc: 1200000, // 12 LPA
    basicPercentage: 50,
    vpfAmount: 0,
    professionalTax: 200,
    foodCoupon: 0,
    superAnnuation: 0,
    npsEmployer: 0,
    isMetro: true,
    taxRegime: 'New'
};

const result = calculateSalaryBreakdown(input);

console.log('Input CTC:', input.ctc);
console.log('Monthly Basic:', result.monthly.basic);
console.log('Monthly HRA:', result.monthly.hra);
console.log('Monthly Special:', result.monthly.special);
console.log('Monthly Gross Cash:', result.monthly.grossCash);
console.log('Monthly PF:', result.monthly.pfEmployee);
console.log('Monthly Tax:', result.monthly.tax);
console.log('Monthly In-Hand:', result.monthly.netInHand);

console.log('Annual Tax:', result.annual.totalTax);
