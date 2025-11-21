'use client';

import { useState, useEffect } from 'react';
import { calculateLoan, PrepaymentFrequency } from '@/core/logic/loan';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { Wallet, Percent, Calendar, TrendingDown, Info, CheckCircle2 } from 'lucide-react';

export function LoanCalculator() {
    // State
    const [loanAmount, setLoanAmount] = useState(5000000);
    const [interestRate, setInterestRate] = useState(9);
    const [tenureYears, setTenureYears] = useState(20);

    // Pre-payment State
    const [showPrepayment, setShowPrepayment] = useState(false);
    const [prepaymentAmount, setPrepaymentAmount] = useState(0);
    const [prepaymentFrequency, setPrepaymentFrequency] = useState<PrepaymentFrequency>('Monthly');

    // UI State
    const [showSchedule, setShowSchedule] = useState(false);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Calculate
    const result = calculateLoan({
        loanAmount,
        interestRate,
        tenureYears,
        prepaymentAmount: showPrepayment ? prepaymentAmount : 0,
        prepaymentFrequency: showPrepayment ? prepaymentFrequency : 'Monthly',
    });

    // Formatters
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatCompact = (value: number) => {
        if (value >= 10000000) {
            return `₹${(value / 10000000).toFixed(2)} Cr`;
        } else if (value >= 100000) {
            return `₹${(value / 100000).toFixed(2)} L`;
        } else {
            return formatCurrency(value);
        }
    };

    // Chart Data
    const pieData = [
        { name: 'Principal', value: loanAmount, color: '#3B82F6' },
        { name: 'Interest', value: result.totalInterest, color: '#F59E0B' },
    ];

    // Filter yearly data for bar chart to avoid overcrowding (show every 2nd or 3rd year if long tenure)
    const barData = result.yearlyBreakdown.filter((_, index) => {
        if (result.yearlyBreakdown.length <= 10) return true;
        if (result.yearlyBreakdown.length <= 20) return index % 2 === 0;
        return index % 3 === 0;
    });

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Panel: Inputs (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">

                    {/* Loan Amount */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Wallet className="w-4 h-4 text-blue-600" />
                                Loan Amount
                            </label>
                            <span className="text-lg font-bold text-blue-600">
                                {formatCompact(loanAmount)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="1000000"
                            max="50000000"
                            step="100000"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                            className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>₹10L</span>
                            <span>₹5Cr</span>
                        </div>
                    </div>

                    {/* Interest Rate */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Percent className="w-4 h-4 text-orange-600" />
                                Interest Rate
                            </label>
                            <span className="text-lg font-bold text-orange-600">
                                {interestRate}%
                            </span>
                        </div>
                        <input
                            type="range"
                            min="6"
                            max="15"
                            step="0.1"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="w-full h-2 bg-orange-100 rounded-lg appearance-none cursor-pointer accent-orange-600"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>6%</span>
                            <span>15%</span>
                        </div>
                    </div>

                    {/* Tenure */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-purple-600" />
                                Tenure
                            </label>
                            <span className="text-lg font-bold text-purple-600">
                                {tenureYears} Years
                            </span>
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="30"
                            step="1"
                            value={tenureYears}
                            onChange={(e) => setTenureYears(Number(e.target.value))}
                            className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>5 Years</span>
                            <span>30 Years</span>
                        </div>
                    </div>

                    {/* Pre-payment Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <TrendingDown className="w-5 h-5 text-emerald-600" />
                                <span className="font-semibold text-slate-800">Smart Pre-payment</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={showPrepayment}
                                    onChange={(e) => setShowPrepayment(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            </label>
                        </div>

                        {showPrepayment && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                <div className="p-3 bg-emerald-50 rounded-lg text-xs text-emerald-800 mb-2">
                                    Paying extra can significantly reduce your interest burden!
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        I can pay extra
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                                        <input
                                            type="number"
                                            step="500"
                                            value={prepaymentAmount === 0 ? '' : prepaymentAmount}
                                            onChange={(e) => setPrepaymentAmount(Number(e.target.value))}
                                            placeholder="e.g. 5000"
                                            className="w-full pl-8 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Frequency
                                    </label>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setPrepaymentFrequency('Monthly')}
                                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${prepaymentFrequency === 'Monthly'
                                                ? 'bg-emerald-600 text-white'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                }`}
                                        >
                                            Monthly
                                        </button>
                                        <button
                                            onClick={() => setPrepaymentFrequency('Yearly')}
                                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${prepaymentFrequency === 'Yearly'
                                                ? 'bg-emerald-600 text-white'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                }`}
                                        >
                                            Yearly
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Monthly Schedule Toggle */}
                    <button
                        onClick={() => setShowSchedule(!showSchedule)}
                        className="w-full py-3 px-4 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                        <Calendar className="w-5 h-5 text-blue-600" />
                        {showSchedule ? 'Hide Monthly Schedule' : 'View Monthly Schedule'}
                    </button>
                </div>

                {/* Right Panel: Results (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">

                    {/* Hero Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg">
                            <p className="text-sm text-slate-300 mb-1">Monthly EMI</p>
                            <p className="text-4xl font-bold mb-2">{formatCurrency(result.monthlyEMI)}</p>
                            <p className="text-xs text-slate-400">
                                Principal + Interest
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <p className="text-sm text-slate-500 mb-1">Total Interest Payable</p>
                            <p className="text-3xl font-bold text-slate-900 mb-2">
                                {formatCompact(result.totalInterest)}
                            </p>
                            <p className="text-xs text-slate-500">
                                Total Payment: {formatCompact(result.totalAmount)}
                            </p>
                        </div>
                    </div>

                    {/* Pre-payment Impact Card */}
                    {showPrepayment && prepaymentAmount > 0 && (
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg animate-in zoom-in-95">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                                    <CheckCircle2 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-1">Smart Move!</h3>
                                    <p className="text-emerald-50 mb-3">
                                        By paying extra, you are saving massive amounts on interest and time.
                                    </p>
                                    <div className="flex gap-6">
                                        <div>
                                            <p className="text-xs text-emerald-100 uppercase tracking-wider">Money Saved</p>
                                            <p className="text-2xl font-bold">{formatCompact(result.savings.interestSaved)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-emerald-100 uppercase tracking-wider">Time Saved</p>
                                            <p className="text-2xl font-bold">
                                                {result.savings.timeSavedYears}Y {result.savings.timeSavedMonths}M
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Charts Section */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-800">Amortization Schedule</h3>
                            <div className="flex gap-4 text-xs">
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <span>Principal</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                                    <span>Interest</span>
                                </div>
                            </div>
                        </div>

                        {mounted ? (
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="year"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: '#64748b' }}
                                            tickFormatter={(value) => `Y${value}`}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: '#64748b' }}
                                            tickFormatter={(value) => `₹${value / 100000}L`}
                                        />
                                        <RechartsTooltip
                                            cursor={{ fill: '#f8fafc' }}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            formatter={(value: number) => [formatCurrency(value), '']}
                                        />
                                        <Bar dataKey="principalPaid" stackId="a" fill="#3B82F6" radius={[0, 0, 4, 4]} />
                                        <Bar dataKey="interestPaid" stackId="a" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="h-[300px] w-full flex items-center justify-center bg-slate-50 rounded-lg">
                                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>

                    {/* Monthly Schedule Table (Conditional) */}
                    {showSchedule && (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                            <div className="p-4 border-b border-slate-100 bg-slate-50">
                                <h3 className="font-bold text-slate-800">Monthly Breakdown</h3>
                            </div>
                            <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0">
                                        <tr>
                                            <th className="px-4 py-3">Month</th>
                                            <th className="px-4 py-3">Principal</th>
                                            <th className="px-4 py-3">Interest</th>
                                            <th className="px-4 py-3">Pre-payment</th>
                                            <th className="px-4 py-3">Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {result.monthlyBreakdown.map((row) => (
                                            <tr key={row.month} className="hover:bg-slate-50">
                                                <td className="px-4 py-2 font-medium text-slate-700">
                                                    {row.month} <span className="text-xs text-slate-400 font-normal">(Y{row.year})</span>
                                                </td>
                                                <td className="px-4 py-2 text-blue-600">
                                                    {formatCompact(row.principalPaid)}
                                                </td>
                                                <td className="px-4 py-2 text-orange-600">
                                                    {formatCompact(row.interestPaid)}
                                                </td>
                                                <td className="px-4 py-2 text-emerald-600">
                                                    {row.prepayment > 0 ? formatCompact(row.prepayment) : '-'}
                                                </td>
                                                <td className="px-4 py-2 text-slate-600">
                                                    {formatCompact(row.closingBalance)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
