"use client";

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PageHeader } from '@/components/ui/PageHeader';
import { formatCurrency, formatIndianNumberCompact } from '@/utils/format';
import { RelatedCalculators } from '@/components/calculators/RelatedCalculators';
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';

export function CarLoanCalculator() {
    const [loanAmount, setLoanAmount] = useState<number>(500000);
    const [interestRate, setInterestRate] = useState<number>(8.5);
    const [tenure, setTenure] = useState<number>(5);
    const [tenureType, setTenureType] = useState<'Years' | 'Months'>('Years');

    const [emi, setEmi] = useState<number>(0);
    const [totalInterest, setTotalInterest] = useState<number>(0);
    const [totalPayment, setTotalPayment] = useState<number>(0);

    useEffect(() => {
        const principal = loanAmount;
        const ratePerMonth = interestRate / 12 / 100;
        const numberOfMonths = tenureType === 'Years' ? tenure * 12 : tenure;

        if (principal > 0 && ratePerMonth > 0 && numberOfMonths > 0) {
            const calculatedEmi =
                (principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfMonths)) /
                (Math.pow(1 + ratePerMonth, numberOfMonths) - 1);

            const totalPayable = calculatedEmi * numberOfMonths;
            const interestPayable = totalPayable - principal;

            setEmi(Math.round(calculatedEmi));
            setTotalPayment(Math.round(totalPayable));
            setTotalInterest(Math.round(interestPayable));
        } else {
            setEmi(0);
            setTotalPayment(0);
            setTotalInterest(0);
        }
    }, [loanAmount, interestRate, tenure, tenureType]);

    const chartData = [
        { name: 'Principal', value: loanAmount },
        { name: 'Interest', value: totalInterest },
    ];

    const COLORS = ['#3b82f6', '#f97316']; // Blue-500, Orange-500

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader title="Car Loan EMI Calculator" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Inputs */}
                        <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 h-fit">
                            <h2 className="text-xl font-bold text-slate-800 mb-6">Loan Details</h2>

                            <div className="space-y-8">
                                {/* Loan Amount */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-sm font-medium text-slate-700">
                                            Loan Amount (₹)
                                        </label>
                                        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                            {formatIndianNumberCompact(loanAmount)}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="100000"
                                        max="10000000"
                                        step="10000"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-4"
                                    />
                                    <input
                                        type="number"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                                        className="w-full rounded-lg border-slate-300 border px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-semibold text-lg"
                                    />
                                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                                        <span>₹1L</span>
                                        <span>₹1Cr</span>
                                    </div>
                                </div>

                                {/* Interest Rate */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-sm font-medium text-slate-700">
                                            Interest Rate (%)
                                        </label>
                                        <span className="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                                            {interestRate}%
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="20"
                                        step="0.1"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600 mb-4"
                                    />
                                    <input
                                        type="number"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(Number(e.target.value))}
                                        className="w-full rounded-lg border-slate-300 border px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-semibold text-lg"
                                    />
                                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                                        <span>1%</span>
                                        <span>20%</span>
                                    </div>
                                </div>

                                {/* Tenure */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-sm font-medium text-slate-700">
                                            Loan Tenure
                                        </label>
                                        <div className="flex bg-slate-100 p-1 rounded-lg">
                                            <button
                                                onClick={() => setTenureType('Years')}
                                                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${tenureType === 'Years' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                                            >
                                                Years
                                            </button>
                                            <button
                                                onClick={() => setTenureType('Months')}
                                                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${tenureType === 'Months' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                                            >
                                                Months
                                            </button>
                                        </div>
                                    </div>

                                    <input
                                        type="range"
                                        min="1"
                                        max={tenureType === 'Years' ? 10 : 120}
                                        step="1"
                                        value={tenure}
                                        onChange={(e) => setTenure(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600 mb-4"
                                    />
                                    <input
                                        type="number"
                                        value={tenure}
                                        onChange={(e) => setTenure(Number(e.target.value))}
                                        className="w-full rounded-lg border-slate-300 border px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-semibold text-lg"
                                    />
                                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                                        <span>1</span>
                                        <span>{tenureType === 'Years' ? '10 Years' : '120 Months'}</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Results */}
                        <div className="lg:col-span-8 space-y-6">

                            {/* EMI Card (Matching XIRR style) */}
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg shadow-blue-200 p-8 text-white text-center transform hover:scale-[1.01] transition-transform">
                                <p className="text-blue-100 font-medium mb-2 uppercase tracking-wide text-sm">Monthly EMI</p>
                                <h3 className="text-5xl md:text-6xl font-bold">
                                    {formatCurrency(emi)}
                                </h3>
                            </div>

                            {/* Breakdown */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                                <h3 className="font-bold text-slate-800 mb-4 text-center">Payment Breakdown</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="h-[250px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={chartData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {chartData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    formatter={(value: number) => formatCurrency(value)}
                                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                                />
                                                <Legend verticalAlign="bottom" height={36} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                                <span className="text-slate-600 font-medium">Principal Amount</span>
                                            </div>
                                            <span className="font-bold text-slate-900">{formatCurrency(loanAmount)}</span>
                                        </div>
                                        <div className="flex justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                                                <span className="text-slate-600 font-medium">Total Interest</span>
                                            </div>
                                            <span className="font-bold text-slate-900">{formatCurrency(totalInterest)}</span>
                                        </div>
                                        <div className="flex justify-between p-4 bg-slate-100 rounded-xl border border-slate-200 mt-2">
                                            <span className="text-slate-700 font-semibold">Total Amount Payable</span>
                                            <span className="font-bold text-slate-900 text-lg">{formatCurrency(totalPayment)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Related Calculators */}
                    <RelatedCalculators category="loans" />

                    {/* About Section */}
                    <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Car Loan EMI Calculator</h2>
                        <p className="text-slate-600 mb-4">
                            A Car Loan EMI (Equated Monthly Installment) calculator helps you calculate the amount you need to pay to the bank every month to repay your car loan. Using this calculator, you can make an informed decision about buying your dream car by planning your finances in advance.
                        </p>
                        <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">How is Car Loan EMI Calculated?</h3>
                        <p className="text-slate-600 mb-4">
                            The formula to calculate EMI is: <strong>E = P x r x (1+r)^n / ((1+r)^n - 1)</strong>
                        </p>
                        <ul className="list-disc pl-5 text-slate-600 space-y-1">
                            <li><strong>P</strong> is the Principal Loan Amount</li>
                            <li><strong>r</strong> is the monthly interest rate (Annual Rate / 12 / 100)</li>
                            <li><strong>n</strong> is the loan tenure in months</li>
                        </ul>
                    </div>

                    <SoftwareAppJsonLd
                        name="Car Loan EMI Calculator"
                        description="Calculate your Car Loan EMI instantly with our easy-to-use calculator."
                        calculatorPath="/calculators/car-loan"
                    />

                </div>
            </div>
        </main>
    );
}
