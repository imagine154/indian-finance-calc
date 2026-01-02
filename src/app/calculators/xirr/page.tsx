
import { XirrCalculator } from '@/components/calculators/XirrCalculator';

export const metadata = {
    title: "SIP XIRR Calculator | Calculate Real Mutual Fund Returns - RupeeTools",
    description: "Accurately calculate the XIRR (Extended Internal Rate of Return) for your SIP investments. Supports bi-weekly, monthly, and quarterly SIP frequencies.",
    keywords: "xirr calculator, sip return calculator, mutual fund xirr, calculate xirr online, sip cagr vs xirr",
};

export default function Page() {
    return <XirrCalculator />;
}
