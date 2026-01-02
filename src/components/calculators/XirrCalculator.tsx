"use client";

import { useState, useEffect } from 'react';
import { calculateXIRR, generateSIPTransactions } from '@/utils/xirr';
import { PageHeader } from '@/components/ui/PageHeader';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatCurrency, formatIndianNumberCompact } from '@/utils/format';
import { RelatedCalculators } from '@/components/calculators/RelatedCalculators';
import { SoftwareAppJsonLd } from '@/components/seo/SoftwareAppJsonLd';

export function XirrCalculator() {
    const [frequency, setFrequency] = useState<'Bi-Weekly' | 'Monthly' | 'Quarterly' | 'Half-Yearly' | 'Yearly'>('Yearly');
    const [startDate, setStartDate] = useState<string>('2021-01-01');
    const [maturityDate, setMaturityDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [sipAmount, setSipAmount] = useState<number>(5000);
    const [currentValue, setCurrentValue] = useState<number>(65000);
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [transactions, setTransactions] = useState<{ date: Date; amount: number }[]>([]);

    useEffect(() => {
        handleCalculate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [frequency, startDate, maturityDate, sipAmount, currentValue]);

    const handleCalculate = () => {
        setError(null);

        const start = new Date(startDate);
        const end = new Date(maturityDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return;
        }

        if (start >= end) {
            setError('Start date must be before maturity date.');
            setResult(null);
            return;
        }

        if (sipAmount <= 0) {
            setError('SIP amount must be positive.');
            setResult(null);
            return;
        }

        // Generate transaction schedule
        const txs = generateSIPTransactions(sipAmount, frequency, start, end, currentValue);
        setTransactions(txs);

        // Calculate XIRR
        const xirr = calculateXIRR(txs);

        if (xirr === null) {
            setError('Calculation failed. Ensure consistent inputs.');
            setResult(null);
        } else {
            setResult(xirr);
        }
    };

    const totalInvested = transactions.length > 0 ? (transactions.length - 1) * sipAmount : 0;
    const totalGain = currentValue - totalInvested;

    const chartData = [
        { name: 'Invested', value: totalInvested },
        { name: 'Gain', value: totalGain > 0 ? totalGain : 0 },
    ];

    // Using standard colors: Invested (Blue), Gain (Green)
    const COLORS = ['#3b82f6', '#22c55e'];

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader title="SIP XIRR Calculator" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Inputs - Narrower Left Column */}
                        <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 h-fit">
                            <h2 className="text-xl font-bold text-slate-800 mb-6">Investment Details</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Investment Frequency
                                    </label>
                                    <select
                                        value={frequency}
                                        onChange={(e) => setFrequency(e.target.value as any)}
                                        className="w-full rounded-xl border-slate-200 border px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-slate-50 font-medium"
                                    >
                                        <option value="Bi-Weekly">Bi-Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Quarterly">Quarterly</option>
                                        <option value="Half-Yearly">Half-Yearly</option>
                                        <option value="Yearly">Yearly</option>
                                    </select>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            SIP Start Date
                                        </label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="w-full rounded-xl border-slate-200 border px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-slate-50 font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Maturity / Current Date
                                        </label>
                                        <input
                                            type="date"
                                            value={maturityDate}
                                            onChange={(e) => setMaturityDate(e.target.value)}
                                            className="w-full rounded-xl border-slate-200 border px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-slate-50 font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            SIP Amount (₹)
                                        </label>
                                        <input
                                            type="number"
                                            value={sipAmount}
                                            step="500"
                                            onChange={(e) => setSipAmount(Number(e.target.value))}
                                            className="w-full rounded-xl border-slate-200 border px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-bold text-lg bg-slate-50"
                                            placeholder="5000"
                                        />
                                        <div className="flex justify-between items-center mt-2 px-1">
                                            <p className="text-xs text-slate-500">Amount per period</p>
                                            <p className="text-xs text-blue-600 font-bold">
                                                {sipAmount > 0 ? formatIndianNumberCompact(sipAmount) : ''}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Current Value (₹)
                                        </label>
                                        <input
                                            type="number"
                                            value={currentValue}
                                            step="1000"
                                            onChange={(e) => setCurrentValue(Number(e.target.value))}
                                            className="w-full rounded-xl border-slate-200 border px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-bold text-lg bg-slate-50"
                                            placeholder="65000"
                                        />
                                        <div className="flex justify-between items-center mt-2 px-1">
                                            <p className="text-xs text-slate-500">Total value today</p>
                                            <p className="text-xs text-blue-600 font-bold">
                                                {currentValue > 0 ? formatIndianNumberCompact(currentValue) : ''}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results - Wider Right Column */}
                        <div className="lg:col-span-8 space-y-6">
                            {/* Hero Card for Result */}
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg shadow-blue-200 p-8 text-white text-center transform hover:scale-[1.01] transition-transform">
                                <p className="text-blue-100 font-medium mb-2 uppercase tracking-wide text-sm">XIRR (Annualized Return)</p>
                                {result !== null ? (
                                    <h3 className="text-5xl md:text-6xl font-bold">
                                        {result.toFixed(2)}%
                                    </h3>
                                ) : error ? (
                                    <h3 className="text-2xl font-bold text-rose-200">{error}</h3>
                                ) : (
                                    <h3 className="text-4xl font-bold opacity-50">--</h3>
                                )}
                            </div>

                            {/* Breakdown & Chart */}
                            {transactions.length > 0 && !error && (
                                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                                    <h3 className="font-bold text-slate-800 mb-6 text-center">Investment Analysis</h3>

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
                                                <div className="flex items-center gap-3">
                                                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                                    <div>
                                                        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Invested</p>
                                                        <p className="text-slate-900 font-bold text-lg">{formatCurrency(totalInvested)}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                                    <div>
                                                        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Total Gain</p>
                                                        <p className={`font-bold text-lg ${totalGain >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                            {totalGain >= 0 ? '+' : ''}{formatCurrency(totalGain)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between p-4 bg-slate-100 rounded-xl border border-slate-200">
                                                <span className="text-slate-700 font-semibold">Total Value</span>
                                                <span className="font-bold text-slate-900 text-xl">{formatCurrency(currentValue)}</span>
                                            </div>

                                            <div className="text-right text-xs text-slate-400 mt-2">
                                                Total Installments: {transactions.length - 1}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <SoftwareAppJsonLd
                name="SIP XIRR Calculator"
                description="Accurately calculate the XIRR for your SIP investments."
                calculatorPath="/calculators/xirr"
            />
        </main>
    );
}
