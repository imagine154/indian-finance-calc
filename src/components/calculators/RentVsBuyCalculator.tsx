"use client";

import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { Home, Building, Info, TrendingUp, IndianRupee, ArrowRight, CheckCircle } from 'lucide-react';
import { calculateRentVsBuy, RentVsBuyInput, RentVsBuyResult } from '../../core/logic/rent-vs-buy';

const RentVsBuyCalculator = () => {
    // --- State ---
    const [inputs, setInputs] = useState<RentVsBuyInput>({
        propertyPrice: 7500000,
        downPaymentAmount: 1500000, // 20%
        loanInterestRate: 8.5,
        loanTenureYears: 20,
        propertyAppreciationRate: 5,
        currentMonthlyRent: 20000,
        rentInflationRate: 5,
        investmentReturnRate: 12,
        durationYears: 20
    });

    const [result, setResult] = useState<RentVsBuyResult | null>(null);

    // --- Handlers ---
    const handleInputChange = (key: keyof RentVsBuyInput, value: number) => {
        setInputs(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // --- Effects ---
    useEffect(() => {
        const res = calculateRentVsBuy(inputs);
        setResult(res);
    }, [inputs]);

    // --- Formatters ---
    const formatCurrency = (amount: number) => {
        if (amount >= 10000000) {
            return `₹${(amount / 10000000).toFixed(2)} Cr`;
        } else if (amount >= 100000) {
            return `₹${(amount / 100000).toFixed(2)} L`;
        }
        return `₹${amount.toLocaleString('en-IN')}`;
    };

    const formatCurrencyFull = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatCompact = (value: number) => {
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
        if (value >= 100000) return `₹${(value / 100000).toFixed(2)} Lac`;
        return `₹${value.toLocaleString('en-IN')}`;
    };

    // --- Chart Data Preparation ---
    const getChartData = () => {
        if (!result) return [];
        // Extract data for years 5, 10, 15, 20 (or just 5, 10, 20 as requested)
        // Let's show 5, 10, 15, 20 for better spread if duration allows
        const yearsToShow = [5, 10, 15, 20].filter(y => y <= inputs.durationYears);

        return yearsToShow.map(year => {
            const yearData = result.yearlyBreakdown.find(d => d.year === year);
            return {
                name: `Year ${year}`,
                "Net Wealth (Buy)": yearData?.buyScenario.netWealth || 0,
                "Net Wealth (Rent)": yearData?.rentScenario.netWealth || 0,
            };
        });
    };

    if (!result) return <div>Loading...</div>;

    const isBuyWinner = result.finalVerdict.winner === 'buy';

    return (
        <div className="w-full max-w-6xl mx-auto font-sans">

            {/* Hero Verdict */}
            <div className={`mb-8 p-8 rounded-3xl shadow-lg border-2 text-center relative overflow-hidden ${isBuyWinner ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'}`}>
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
                        You are richer by <span className={isBuyWinner ? 'text-blue-600' : 'text-orange-600'}>{formatCurrency(result.finalVerdict.differenceAmount)}</span> if you <span className={`inline-block px-3 py-1 rounded-lg ${isBuyWinner ? 'bg-blue-600 text-white' : 'bg-orange-600 text-white'}`}>{isBuyWinner ? 'BUY' : 'RENT'}</span>
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Over <strong>{inputs.durationYears} years</strong>, your net wealth would be <strong>{formatCurrency(isBuyWinner ? result.finalVerdict.buyNetWealth : result.finalVerdict.rentNetWealth)}</strong> vs <strong>{formatCurrency(isBuyWinner ? result.finalVerdict.rentNetWealth : result.finalVerdict.buyNetWealth)}</strong>.
                    </p>
                </div>
                {/* Background Decoration */}
                <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-20 ${isBuyWinner ? 'bg-blue-400' : 'bg-orange-400'} blur-3xl`}></div>
                <div className={`absolute -left-10 -bottom-10 w-40 h-40 rounded-full opacity-20 ${isBuyWinner ? 'bg-blue-400' : 'bg-orange-400'} blur-3xl`}></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column: Inputs (Split Theme) */}
                <div className="lg:col-span-5 space-y-6">

                    {/* Buy Scenario Inputs */}
                    <div className="bg-white rounded-2xl shadow-sm border-l-4 border-blue-500 overflow-hidden">
                        <div className="bg-blue-50/50 p-4 border-b border-blue-100 flex items-center gap-2">
                            <Home className="w-5 h-5 text-blue-600" />
                            <h3 className="font-bold text-blue-800">If you BUY a Home</h3>
                        </div>
                        <div className="p-6 space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Property Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-slate-400">₹</span>
                                    <input
                                        type="number"
                                        value={inputs.propertyPrice}
                                        onChange={(e) => handleInputChange('propertyPrice', Number(e.target.value))}
                                        className="w-full pl-8 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-900"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-1 font-medium pl-1">
                                    {formatCompact(inputs.propertyPrice)}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Down Payment</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-slate-400">₹</span>
                                        <input
                                            type="number"
                                            value={inputs.downPaymentAmount}
                                            onChange={(e) => handleInputChange('downPaymentAmount', Number(e.target.value))}
                                            className="w-full pl-8 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-900"
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1 font-medium pl-1">
                                        {formatCompact(inputs.downPaymentAmount)}
                                    </p>
                                    <div className="text-[10px] text-slate-400 mt-1 text-right">
                                        {((inputs.downPaymentAmount / inputs.propertyPrice) * 100).toFixed(1)}% of Price
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Loan Tenure (Yrs)</label>
                                    <input
                                        type="number"
                                        value={inputs.loanTenureYears}
                                        onChange={(e) => handleInputChange('loanTenureYears', Number(e.target.value))}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-900"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Interest Rate (%)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={inputs.loanInterestRate}
                                        onChange={(e) => handleInputChange('loanInterestRate', Number(e.target.value))}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Appreciation (%)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={inputs.propertyAppreciationRate}
                                        onChange={(e) => handleInputChange('propertyAppreciationRate', Number(e.target.value))}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-900"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rent Scenario Inputs */}
                    <div className="bg-white rounded-2xl shadow-sm border-l-4 border-orange-500 overflow-hidden">
                        <div className="bg-orange-50/50 p-4 border-b border-orange-100 flex items-center gap-2">
                            <Building className="w-5 h-5 text-orange-600" />
                            <h3 className="font-bold text-orange-800">If you RENT a Home</h3>
                        </div>
                        <div className="p-6 space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Monthly Rent</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-slate-400">₹</span>
                                    <input
                                        type="number"
                                        value={inputs.currentMonthlyRent}
                                        onChange={(e) => handleInputChange('currentMonthlyRent', Number(e.target.value))}
                                        className="w-full pl-8 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-medium text-slate-900"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-1 font-medium pl-1">
                                    {formatCompact(inputs.currentMonthlyRent)}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Rent Inflation (%)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={inputs.rentInflationRate}
                                        onChange={(e) => handleInputChange('rentInflationRate', Number(e.target.value))}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-medium text-slate-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Inv. Return (%)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={inputs.investmentReturnRate}
                                        onChange={(e) => handleInputChange('investmentReturnRate', Number(e.target.value))}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none font-medium text-slate-900"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Common Settings */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Analysis Duration (Years)</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="5"
                                max="30"
                                value={inputs.durationYears}
                                onChange={(e) => handleInputChange('durationYears', Number(e.target.value))}
                                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
                            />
                            <span className="font-bold text-slate-700 w-12 text-right">{inputs.durationYears} Y</span>
                        </div>
                    </div>

                </div>

                {/* Right Column: Visuals & Analysis */}
                <div className="lg:col-span-7 space-y-6">

                    {/* Chart */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-slate-500" />
                            Net Wealth Projection
                        </h3>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={getChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                        tickFormatter={(val) => `₹${val / 100000}L`}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        formatter={(val: number) => formatCurrency(val)}
                                    />
                                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                    <Bar dataKey="Net Wealth (Buy)" fill="#3b82f6" name="Buy Scenario" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="Net Wealth (Rent)" fill="#f97316" name="Rent Scenario" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                            <div className="text-xs font-bold text-blue-600 uppercase mb-2">Buy Scenario</div>
                            <div className="text-2xl font-bold text-slate-800 mb-1">{formatCurrency(result.finalVerdict.buyNetWealth)}</div>
                            <div className="text-sm text-slate-500">Property Value after {inputs.durationYears}y</div>
                            <div className="mt-4 pt-4 border-t border-blue-100 text-xs text-slate-500 space-y-1">
                                <div className="flex justify-between">
                                    <span>Loan Paid:</span>
                                    <span className="font-medium">{formatCurrency(result.yearlyBreakdown[result.yearlyBreakdown.length - 1].buyScenario.totalOutflow)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Asset Value:</span>
                                    <span className="font-medium">{formatCurrency(result.yearlyBreakdown[result.yearlyBreakdown.length - 1].buyScenario.propertyValue)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100">
                            <div className="text-xs font-bold text-orange-600 uppercase mb-2">Rent Scenario</div>
                            <div className="text-2xl font-bold text-slate-800 mb-1">{formatCurrency(result.finalVerdict.rentNetWealth)}</div>
                            <div className="text-sm text-slate-500">Investment Value after {inputs.durationYears}y</div>
                            <div className="mt-4 pt-4 border-t border-orange-100 text-xs text-slate-500 space-y-1">
                                <div className="flex justify-between">
                                    <span>Rent Paid:</span>
                                    <span className="font-medium">{formatCurrency(result.yearlyBreakdown[result.yearlyBreakdown.length - 1].rentScenario.totalOutflow)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Liquid Assets:</span>
                                    <span className="font-medium">{formatCurrency(result.yearlyBreakdown[result.yearlyBreakdown.length - 1].rentScenario.investmentValue)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Insight / Note */}
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-start gap-3">
                        <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-600 leading-relaxed">
                            <strong>Note:</strong> This calculation considers tax benefits on Home Loan (Sec 24b & 80C) and assumes the difference between EMI and Rent is disciplinedly invested in an instrument giving <strong>{inputs.investmentReturnRate}%</strong> returns.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RentVsBuyCalculator;
