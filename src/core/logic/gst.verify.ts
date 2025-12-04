import { calculateGST } from './gst';

const tests = [
    {
        name: 'Exclusive 18% on 1000',
        input: { amount: 1000, rate: 18, type: 'Exclusive' as const },
        expected: { netPrice: 1000, gstAmount: 180, totalAmount: 1180 }
    },
    {
        name: 'Inclusive 18% on 1180',
        input: { amount: 1180, rate: 18, type: 'Inclusive' as const },
        expected: { netPrice: 1000, gstAmount: 180, totalAmount: 1180 }
    },
    {
        name: 'Exclusive 5% on 100',
        input: { amount: 100, rate: 5, type: 'Exclusive' as const },
        expected: { netPrice: 100, gstAmount: 5, totalAmount: 105 }
    },
    {
        name: 'Inclusive 5% on 105',
        input: { amount: 105, rate: 5, type: 'Inclusive' as const },
        expected: { netPrice: 100, gstAmount: 5, totalAmount: 105 }
    }
];

let failed = false;

tests.forEach(test => {
    const result = calculateGST(test.input);
    const netPriceMatch = Math.abs(result.netPrice - test.expected.netPrice) < 0.01;
    const gstAmountMatch = Math.abs(result.gstAmount - test.expected.gstAmount) < 0.01;
    const totalAmountMatch = Math.abs(result.totalAmount - test.expected.totalAmount) < 0.01;

    if (netPriceMatch && gstAmountMatch && totalAmountMatch) {
        console.log(`PASS: ${test.name}`);
    } else {
        console.error(`FAIL: ${test.name}`);
        console.error('Expected:', test.expected);
        console.error('Actual:', result);
        failed = true;
    }
});

if (failed) {
    process.exit(1);
} else {
    console.log('All tests passed!');
}
