"use client";

import React, { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { calculateHRA, HraResult } from "@/core/logic/hra";

const HraCalculator = () => {
    const [basicSalary, setBasicSalary] = useState<number>(500000);
    const [da, setDa] = useState<number>(0);
    const [hraReceived, setHraReceived] = useState<number>(250000);
    const [rentPaid, setRentPaid] = useState<number>(240000);
    const [isMetro, setIsMetro] = useState<boolean>(true);
    const [result, setResult] = useState<HraResult | null>(null);

    useEffect(() => {
        const res = calculateHRA({
            basicSalary,
            da,
            hraReceived,
            totalRentPaid: rentPaid,
            isMetro,
        });
        setResult(res);
    }, [basicSalary, da, hraReceived, rentPaid, isMetro]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
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

    const chartData = [
        {
            name: "Total HRA",
            amount: hraReceived,
            color: "#fbbf24", // Amber
        },
        {
            name: "Exempt",
            amount: result ? result.exemptAmount : 0,
            color: "#22c55e", // Green
        },
        {
            name: "Taxable",
            amount: result ? result.taxableAmount : 0,
            color: "#ef4444", // Red
        },
    ];

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                    <div>
                        {/* City Type Toggle */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                City Type
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setIsMetro(true)}
                                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${isMetro
                                        ? "border-amber-500 bg-amber-50 text-amber-700"
                                        : "border-slate-200 hover:border-amber-200 text-slate-600"
                                        }`}
                                >
                                    <span className="text-2xl">🏙️</span>
                                    <span className="font-semibold">Metro</span>
                                    <span className="text-xs text-center opacity-75">
                                        Delhi, Mumbai, Kolkata, Chennai
                                    </span>
                                </button>
                                <button
                                    onClick={() => setIsMetro(false)}
                                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${!isMetro
                                        ? "border-amber-500 bg-amber-50 text-amber-700"
                                        : "border-slate-200 hover:border-amber-200 text-slate-600"
                                        }`}
                                >
                                    <span className="text-2xl">🏘️</span>
                                    <span className="font-semibold">Non-Metro</span>
                                    <span className="text-xs text-center opacity-75">
                                        Bangalore, Hyd, Pune, Others
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Basic Salary */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Basic Salary (Annual)
                            </label>
                            <input
                                type="number"
                                step="1000"
                                value={basicSalary}
                                onChange={(e) => setBasicSalary(Number(e.target.value))}
                                className="w-full p-3 text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                            />
                            <p className="text-xs text-slate-500 mt-1">
                                {formatCompact(basicSalary)}
                            </p>
                        </div>

                        {/* DA */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Dearness Allowance (DA, Annual)
                            </label>
                            <input
                                type="number"
                                step="1000"
                                value={da}
                                onChange={(e) => setDa(Number(e.target.value))}
                                className="w-full p-3 text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                            />
                            <p className="text-xs text-slate-500 mt-1">
                                {formatCompact(da)}
                            </p>
                        </div>

                        {/* HRA Received */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                HRA Received (Annual)
                            </label>
                            <input
                                type="number"
                                step="1000"
                                value={hraReceived}
                                onChange={(e) => setHraReceived(Number(e.target.value))}
                                className="w-full p-3 text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                            />
                            <p className="text-xs text-slate-500 mt-1">
                                {formatCompact(hraReceived)}
                            </p>
                        </div>

                        {/* Rent Paid */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Total Rent Paid (Annual)
                            </label>
                            <input
                                type="number"
                                step="1000"
                                value={rentPaid}
                                onChange={(e) => setRentPaid(Number(e.target.value))}
                                className="w-full p-3 text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                            />
                            <p className="text-xs text-slate-500 mt-1">
                                {formatCompact(rentPaid)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">
                        Exemption Analysis
                    </h3>

                    {/* Hero Cards */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-green-100 p-4 rounded-xl border border-green-200">
                            <p className="text-sm text-green-700 font-medium mb-1">
                                Exempt HRA
                            </p>
                            <p className="text-2xl font-bold text-green-800">
                                {result ? formatCurrency(result.exemptAmount) : "₹0"}
                            </p>
                        </div>
                        <div className="bg-red-100 p-4 rounded-xl border border-red-200">
                            <p className="text-sm text-red-700 font-medium mb-1">
                                Taxable HRA
                            </p>
                            <p className="text-2xl font-bold text-red-800">
                                {result ? formatCurrency(result.taxableAmount) : "₹0"}
                            </p>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="mb-6 h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#64748b' }}
                                />
                                <YAxis
                                    hide={true}
                                />
                                <Tooltip
                                    formatter={(value: number) => formatCurrency(value)}
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '0.5rem',
                                    }}
                                />
                                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* The "Why" Section */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                            Least of the following is exempt:
                        </h4>

                        <div className={`flex justify-between items-center p-3 rounded-lg ${result?.exemptAmount === result?.breakdown.actualHra ? 'bg-green-50 border border-green-200' : 'bg-white border border-slate-100'}`}>
                            <span className="text-sm text-slate-600">1. Actual HRA Received</span>
                            <span className="font-mono font-medium text-slate-800">
                                {result ? formatCurrency(result.breakdown.actualHra) : "₹0"}
                            </span>
                        </div>

                        <div className={`flex justify-between items-center p-3 rounded-lg ${result?.exemptAmount === result?.breakdown.rentMinusTenPercent ? 'bg-green-50 border border-green-200' : 'bg-white border border-slate-100'}`}>
                            <span className="text-sm text-slate-600">2. Rent - 10% of Salary</span>
                            <span className="font-mono font-medium text-slate-800">
                                {result ? formatCurrency(result.breakdown.rentMinusTenPercent) : "₹0"}
                            </span>
                        </div>

                        <div className={`flex justify-between items-center p-3 rounded-lg ${result?.exemptAmount === result?.breakdown.salaryCap ? 'bg-green-50 border border-green-200' : 'bg-white border border-slate-100'}`}>
                            <span className="text-sm text-slate-600">
                                3. {isMetro ? "50%" : "40%"} of Salary
                            </span>
                            <span className="font-mono font-medium text-slate-800">
                                {result ? formatCurrency(result.breakdown.salaryCap) : "₹0"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HraCalculator;
