
import { CarLoanCalculator } from '@/components/calculators/CarLoanCalculator';

export const metadata = {
    title: "Car Loan EMI Calculator India | Calculate Monthly Payments - RupeeTools",
    description: "Calculate your car loan EMI, total interest payable, and amortization schedule instantly. Best free car loan calculator for SBI, HDFC, ICICI, and other Indian banks.",
    keywords: "car loan calculator, car emi calculator india, vehicle loan interest calculator, auto loan emi",
};

export default function Page() {
    return <CarLoanCalculator />;
}
