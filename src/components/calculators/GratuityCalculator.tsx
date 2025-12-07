"use client";

import React, { useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import { calculateGratuity, GratuityResult } from "@/core/logic/gratuity";
import { RelatedCalculators } from "../ui/RelatedCalculators";

const GratuityCalculator = () => {
    const [basicSalary, setBasicSalary] = useState<number>(50000);
    const [yearsOfService, setYearsOfService] = useState<number>(5);
    const [isCoveredByAct, setIsCoveredByAct] = useState<boolean>(true);
    const result = calculateGratuity({
        basicSalary,
        yearsOfService,
        isCoveredByAct,
    });

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
        { name: "Tax Free", value: result && result.isEligible ? result.exemptAmount : 0, color: "#0891b2" }, // Cyan-600
        { name: "Taxable", value: result && result.isEligible ? result.taxableAmount : 0, color: "#ef4444" }, // Red-500
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <div className="space-y-6">
                        <div>
                            {/* Employer Type Toggle */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Employer Coverage
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setIsCoveredByAct(true)}
                                        className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${isCoveredByAct
                                            ? "border-cyan-600 bg-cyan-50 text-cyan-800"
                                            : "border-slate-200 hover:border-cyan-200 text-slate-600"
                                            }`}
                                    >
                                        Covered by Act
                                    </button>
                                    <button
                                        onClick={() => setIsCoveredByAct(false)}
                                        className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${!isCoveredByAct
                                            ? "border-cyan-600 bg-cyan-50 text-cyan-800"
                                            : "border-slate-200 hover:border-cyan-200 text-slate-600"
                                            }`}
                                    >
                                        Not Covered
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500 mt-2">
                                    *Most private sector employees are covered by the Payment of Gratuity Act.
                                </p>
                            </div>

                            {/* Basic Salary */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Monthly Basic Salary + DA
                                </label>
                                <input
                                    type="number"
                                    step="1000"
                                    value={basicSalary}
                                    onChange={(e) => setBasicSalary(Number(e.target.value))}
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-slate-900"
                                />
                                <p className="text-xs text-slate-500 mt-1">
                                    {formatCompact(basicSalary)}
                                </p>
                            </div>

                            {/* Years of Service */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Years of Service
                                </label>
                                <input
                                    type="number"
                                    step="1"
                                    value={yearsOfService}
                                    onChange={(e) => setYearsOfService(Number(e.target.value))}
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-slate-900"
                                />
                                {!result?.isEligible && (
                                    <p className="text-xs text-amber-600 mt-1 font-medium">
                                        ⚠️ Generally, 5 years of continuous service is required for gratuity eligibility.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">
                                Estimated Gratuity
                            </h3>

                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
                                <p className="text-sm text-slate-500 mb-1">Total Payable Amount</p>
                                <p className="text-3xl font-bold text-slate-900">
                                    {result && result.isEligible ? formatCurrency(result.totalGratuity) : "₹0"}
                                </p>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-600 flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-cyan-600"></span>
                                        Tax Free Portion
                                    </span>
                                    <span className="font-medium text-cyan-700">
                                        {result && result.isEligible ? formatCurrency(result.exemptAmount) : "₹0"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-600 flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                        Taxable Portion
                                    </span>
                                    <span className="font-medium text-red-600">
                                        {result && result.isEligible ? formatCurrency(result.taxableAmount) : "₹0"}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-cyan-50 border border-cyan-100 p-3 rounded-lg">
                                <p className="text-xs text-cyan-800 text-center">
                                    ℹ️ Tax-free limit is now <strong>₹20 Lakhs</strong> (increased from ₹10L).
                                </p>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="h-48 mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={70}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: number) => formatCurrency(value)}
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '0.5rem',
                                            fontSize: '12px'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
            <RelatedCalculators currentPath="/calculators/gratuity" category="income" />
        </div>
    );
};

export default GratuityCalculator;
