/**
 * Test file for Indian Income Tax Calculator Engine
 * Run this to verify the tax calculation logic
 */

import {
    TaxInput,
    compareTaxRegimes,
} from './tax';

console.log('='.repeat(80));
console.log('INDIAN INCOME TAX CALCULATOR - FY 2025-26 TEST CASES');
console.log('='.repeat(80));

// Helper to calculate total taxable income for display
const getTotalTaxable = (d: any) => d.taxableSlabIncome + d.taxableSpecialIncome;
const getTaxBeforeRebate = (d: any) => d.taxFromSlabs + d.taxFromSpecial;

// Test Case 1: Low income with rebate eligibility (New Regime)
console.log('\n📊 TEST CASE 1: ₹6,00,000 salary (Eligible for Section 87A rebate in New Regime)');
const test1: TaxInput = {
    grossSalary: 600000,
    section80C: 0,
};
const result1 = compareTaxRegimes(test1);
console.log('\nOld Regime:');
console.log(`  Taxable Income: ₹${getTotalTaxable(result1.oldRegime).toLocaleString('en-IN')}`);
console.log(`  Tax Before Rebate: ₹${getTaxBeforeRebate(result1.oldRegime).toLocaleString('en-IN')}`);
console.log(`  Rebate (87A): ₹${result1.oldRegime.rebate87A.toLocaleString('en-IN')}`);
console.log(`  Total Tax: ₹${result1.oldRegime.totalTaxPayable.toLocaleString('en-IN')}`);
console.log('\nNew Regime:');
console.log(`  Taxable Income: ₹${getTotalTaxable(result1.newRegime).toLocaleString('en-IN')}`);
console.log(`  Tax Before Rebate: ₹${getTaxBeforeRebate(result1.newRegime).toLocaleString('en-IN')}`);
console.log(`  Rebate (87A): ₹${result1.newRegime.rebate87A.toLocaleString('en-IN')}`);
console.log(`  Total Tax: ₹${result1.newRegime.totalTaxPayable.toLocaleString('en-IN')}`);
console.log(`\n✅ Recommendation: ${result1.recommendation.betterRegime} Regime saves ₹${result1.recommendation.savingsAmount.toLocaleString('en-IN')}`);

// Test Case 2: Medium income with deductions (Old Regime benefit)
console.log('\n' + '='.repeat(80));
console.log('📊 TEST CASE 2: ₹10,00,000 salary with maximum deductions');
const test2: TaxInput = {
    grossSalary: 1000000,
    hraExemption: 100000,
    section80C: 150000,
    section80D: 25000,
    section80CCD1B: 50000,
};
const result2 = compareTaxRegimes(test2);
console.log('\nOld Regime:');
// Exemptions are now part of deductions in the output
console.log(`  Deductions (incl. Exemptions): ₹${result2.oldRegime.deductions.toLocaleString('en-IN')}`);
console.log(`  Taxable Income: ₹${getTotalTaxable(result2.oldRegime).toLocaleString('en-IN')}`);
console.log(`  Total Tax: ₹${result2.oldRegime.totalTaxPayable.toLocaleString('en-IN')}`);
console.log(`  Effective Rate: ${result2.oldRegime.effectiveTaxRate.toFixed(2)}%`);
console.log('\nNew Regime:');
console.log(`  Deductions: ₹${result2.newRegime.deductions.toLocaleString('en-IN')} (Standard only)`);
console.log(`  Taxable Income: ₹${getTotalTaxable(result2.newRegime).toLocaleString('en-IN')}`);
console.log(`  Total Tax: ₹${result2.newRegime.totalTaxPayable.toLocaleString('en-IN')}`);
console.log(`  Effective Rate: ${result2.newRegime.effectiveTaxRate.toFixed(2)}%`);
console.log(`\n✅ Recommendation: ${result2.recommendation.betterRegime} Regime saves ₹${result2.recommendation.savingsAmount.toLocaleString('en-IN')}`);
console.log(`   ${result2.recommendation.reason}`);

// Test Case 3: High income (>15L)
console.log('\n' + '='.repeat(80));
console.log('📊 TEST CASE 3: ₹20,00,000 salary (High income bracket)');
const test3: TaxInput = {
    grossSalary: 2000000,
    section80C: 150000,
    section80D: 50000,
};
const result3 = compareTaxRegimes(test3);
console.log('\nOld Regime:');
console.log(`  Taxable Income: ₹${getTotalTaxable(result3.oldRegime).toLocaleString('en-IN')}`);
console.log(`  Total Tax: ₹${result3.oldRegime.totalTaxPayable.toLocaleString('en-IN')}`);
console.log(`  Effective Rate: ${result3.oldRegime.effectiveTaxRate.toFixed(2)}%`);
console.log('\nNew Regime:');
console.log(`  Taxable Income: ₹${getTotalTaxable(result3.newRegime).toLocaleString('en-IN')}`);
console.log(`  Total Tax: ₹${result3.newRegime.totalTaxPayable.toLocaleString('en-IN')}`);
console.log(`  Effective Rate: ${result3.newRegime.effectiveTaxRate.toFixed(2)}%`);
console.log(`\n✅ Recommendation: ${result3.recommendation.betterRegime} Regime saves ₹${result3.recommendation.savingsAmount.toLocaleString('en-IN')}`);

// Test Case 4: Exactly at rebate threshold (New Regime)
console.log('\n' + '='.repeat(80));
console.log('📊 TEST CASE 4: ₹7,50,000 salary (Just above ₹7L rebate threshold)');
const test4: TaxInput = {
    grossSalary: 750000,
};
const result4 = compareTaxRegimes(test4);
console.log('\nNew Regime:');
console.log(`  Taxable Income: ₹${getTotalTaxable(result4.newRegime).toLocaleString('en-IN')}`);
console.log(`  Tax Before Rebate: ₹${getTaxBeforeRebate(result4.newRegime).toLocaleString('en-IN')}`);
console.log(`  Rebate (87A): ₹${result4.newRegime.rebate87A.toLocaleString('en-IN')} (No rebate - above ₹7L)`);
console.log(`  Total Tax: ₹${result4.newRegime.totalTaxPayable.toLocaleString('en-IN')}`);

// Test Case 5: Tax slab breakdown verification
console.log('\n' + '='.repeat(80));
console.log('📊 TEST CASE 5: ₹12,50,000 salary - Slab breakdown');
const test5: TaxInput = {
    grossSalary: 1250000,
};
const result5 = compareTaxRegimes(test5).newRegime;
console.log('\nNew Regime Slab Breakdown:');
result5.slabBreakdown.forEach((slab) => {
    console.log(`  ${slab.range}: ₹${slab.amount.toLocaleString('en-IN')} @ ${slab.rate}%`);
});
console.log(`\n  Tax Before Rebate: ₹${getTaxBeforeRebate(result5).toLocaleString('en-IN')}`);
console.log(`  Health & Education Cess (4%): ₹${result5.cess.toLocaleString('en-IN')}`);
console.log(`  Total Tax Payable: ₹${result5.totalTaxPayable.toLocaleString('en-IN')}`);

console.log('\n' + '='.repeat(80));
console.log('✅ ALL TEST CASES COMPLETED');
console.log('='.repeat(80) + '\n');
