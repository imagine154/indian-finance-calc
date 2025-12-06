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
import { ArrowLeftRight, PiggyBank, Clock, Percent, Info, CheckCircle, XCircle } from 'lucide-react';
import { calculateBalanceTransfer, BalanceTransferInput, BalanceTransferResult } from '../../core/logic/balance-transfer';

const BalanceTransferCalculator = () => {
    const [inputs, setInputs] = useState<BalanceTransferInput>({
        outstandingPrincipal: 3000000,
        existingRate: 9,
        newRate: 8.5,
        remainingTenure: 15,
        processingFee: 5000,
        processingFeeType: 'flat'
    });

    const [result, setResult] = useState<BalanceTransferResult | null>(null);

    useEffect(() => {
        setResult(calculateBalanceTransfer(inputs));
    }, [inputs]);

    const handleInputChange = (key: keyof BalanceTransferInput, value: any) => {
        setInputs(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const formatCurrency = (amount: number) => {
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

    if (!result) return <div>Loading...</div>;

    const chartData = [
        {
            name: 'Total Payment',
            'Current Loan': result.totalAmountOld,
            'New Loan': result.totalAmountNew,
        },
        {
            name: 'Total Interest',
            'Current Loan': result.totalInterestOld,
            'New Loan': result.totalInterestNew,
        }
    ];

    return (
        <div className="w-full max-w-7xl mx-auto font-sans">

            {/* Hero Verdict */}
            <div className={`mb-8 p-8 rounded-3xl shadow-lg border-2 text-center relative overflow-hidden ${result.isProfitable ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
                        {result.isProfitable ? (
                            <>
                                You save <span className="text-green-600">{formatCurrency(result.totalSavings)}</span> by switching!
                            </>
                        ) : (
                            <>
                                <span className="text-red-600">Do not switch!</span> You lose {formatCurrency(Math.abs(result.totalSavings))}
                            </>
                        )}
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        {result.isProfitable ? (
                            <>
                                Your EMI reduces by <strong>{formatCurrency(result.oldEMI - result.newEMI)}/mo</strong>. Break-even in <strong>{result.breakEvenMonths} months</strong>.
                            </>
                        ) : (
                            <>
                                The processing fee and interest difference make this switch unprofitable.
                            </>
                        )}
                    </p>
                </div>
                {/* Background Decoration */}
                <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-20 ${result.isProfitable ? 'bg-green-400' : 'bg-red-400'} blur-3xl`}></div>
                <div className={`absolute -left-10 -bottom-10 w-40 h-40 rounded-full opacity-20 ${result.isProfitable ? 'bg-green-400' : 'bg-red-400'} blur-3xl`}></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column: Inputs */}
                <div className="lg:col-span-5 space-y-6">

                    {/* Loan Details */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center gap-2">
                            <ArrowLeftRight className="w-5 h-5 text-slate-600" />
                            <h3 className="font-bold text-slate-800">Loan Details</h3>
                        </div>
                        <div className="p-6 space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Outstanding Principal</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-slate-400">₹</span>
                                    <input
                                        type="number"
                                        step="50000"
                                        value={inputs.outstandingPrincipal}
                                        onChange={(e) => handleInputChange('outstandingPrincipal', Number(e.target.value))}
                                        className="w-full pl-8 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-900"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-1 font-medium pl-1">
                                    {formatCompact(inputs.outstandingPrincipal)}
                                </p>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Remaining Tenure (Years)</label>
                                <input
                                    type="number"
                                    value={inputs.remainingTenure}
                                    onChange={(e) => handleInputChange('remainingTenure', Number(e.target.value))}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-900"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Current Rate (%)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={inputs.existingRate}
                                        onChange={(e) => handleInputChange('existingRate', Number(e.target.value))}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">New Rate (%)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={inputs.newRate}
                                        onChange={(e) => handleInputChange('newRate', Number(e.target.value))}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none font-medium text-slate-900"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Processing Fee */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center gap-2">
                            <Percent className="w-5 h-5 text-slate-600" />
                            <h3 className="font-bold text-slate-800">Processing Fee</h3>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="flex gap-4 mb-4">
                                <button
                                    onClick={() => handleInputChange('processingFeeType', 'flat')}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${inputs.processingFeeType === 'flat' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}
                                >
                                    Flat Amount
                                </button>
                                <button
                                    onClick={() => handleInputChange('processingFeeType', 'percentage')}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${inputs.processingFeeType === 'percentage' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}
                                >
                                    Percentage
                                </button>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                                    {inputs.processingFeeType === 'flat' ? 'Fee Amount' : 'Fee Percentage'}
                                </label>
                                <div className="relative">
                                    {inputs.processingFeeType === 'flat' && <span className="absolute left-3 top-3 text-slate-400">₹</span>}
                                    <input
                                        type="number"
                                        step={inputs.processingFeeType === 'percentage' ? "0.1" : "100"}
                                        value={inputs.processingFee}
                                        onChange={(e) => handleInputChange('processingFee', Number(e.target.value))}
                                        className={`w-full ${inputs.processingFeeType === 'flat' ? 'pl-8' : 'pl-4'} pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-900`}
                                    />
                                    {inputs.processingFeeType === 'percentage' && <span className="absolute right-3 top-3 text-slate-400">%</span>}
                                </div>
                                <p className="text-xs text-slate-500 mt-1 font-medium pl-1">
                                    Actual Fee: {formatCurrency(result.processingFeeAmount)}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column: Analysis */}
                <div className="lg:col-span-7 space-y-6">

                    {/* Comparison Chart */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-800 mb-6">Payment Comparison</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                                    <Bar dataKey="Current Loan" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="New Loan" fill="#22c55e" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                            <div className="text-xs font-bold text-slate-500 uppercase mb-2">Monthly EMI</div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-sm text-slate-500">Current</span>
                                <span className="font-bold text-slate-700">{formatCurrency(result.oldEMI)}</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-sm text-slate-500">New</span>
                                <span className="font-bold text-green-600">{formatCurrency(result.newEMI)}</span>
                            </div>
                            <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-green-600 font-bold">
                                Save {formatCurrency(result.oldEMI - result.newEMI)} per month
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                            <div className="text-xs font-bold text-slate-500 uppercase mb-2">Total Interest</div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-sm text-slate-500">Current</span>
                                <span className="font-bold text-slate-700">{formatCurrency(result.totalInterestOld)}</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-sm text-slate-500">New</span>
                                <span className="font-bold text-green-600">{formatCurrency(result.totalInterestNew)}</span>
                            </div>
                            <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-green-600 font-bold">
                                Interest reduced by {formatCurrency(result.totalInterestOld - result.totalInterestNew)}
                            </div>
                        </div>
                    </div>

                    {/* Info Card */}
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-800 leading-relaxed">
                            <strong>Tip:</strong> Even if the monthly savings seem small, the total interest saved over the tenure can be significant. Ensure the new bank doesn't have hidden charges like pre-closure penalties.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BalanceTransferCalculator;
