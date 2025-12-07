"use client";

import React, { useState, useMemo } from "react";
import {
    Flame,
    TrendingUp,
    Briefcase,
    Umbrella,
    Plus,
    Trash2,
    Target,
    ChevronDown,
    ChevronUp,
    Info
} from "lucide-react";
import { calculateFireStats, FireGoal, FireInputs } from "@/core/logic/fire";
import { RelatedCalculators } from "../ui/RelatedCalculators";

const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
        return `₹ ${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
        return `₹ ${(amount / 100000).toFixed(2)} L`;
    }
    return `₹ ${amount.toLocaleString("en-IN")}`;
};

const FireCalculator = () => {
    const [age, setAge] = useState(30);
    const [retireAge, setRetireAge] = useState(50);
    const [expenses, setExpenses] = useState(50000);
    const [inflation, setInflation] = useState(6);
    const [preReturn, setPreReturn] = useState(12);
    const [postReturn, setPostReturn] = useState(8);
    const [lifeExpectancy, setLifeExpectancy] = useState(85);

    const [goals, setGoals] = useState<FireGoal[]>([]);
    const [showGoals, setShowGoals] = useState(false);

    const stats = useMemo(() => {
        const inputs: FireInputs = {
            age,
            retireAge,
            currentExpenses: expenses,
            inflation,
            preRetirementReturn: preReturn,
            postRetirementReturn: postReturn,
            lifeExpectancy,
            goals,
        };
        return calculateFireStats(inputs);
    }, [age, retireAge, expenses, inflation, preReturn, postReturn, lifeExpectancy, goals]);

    const addGoal = () => {
        const newGoal: FireGoal = {
            id: Math.random().toString(36).substr(2, 9),
            type: "Education",
            cost: 1000000,
            year: 5,
        };
        setGoals([...goals, newGoal]);
        if (!showGoals) setShowGoals(true);
    };

    const removeGoal = (id: string) => {
        setGoals(goals.filter((g) => g.id !== id));
    };

    const updateGoal = (id: string, field: keyof FireGoal, value: string | number) => {
        setGoals(
            goals.map((g) => {
                if (g.id === id) {
                    return { ...g, [field]: value };
                }
                return g;
            })
        );
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -ml-16 -mb-16 opacity-50" />

                <div className="relative z-10 text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-emerald-600 text-sm font-medium mb-2">
                        <Flame className="w-4 h-4" />
                        <span>Financial Independence, Retire Early</span>
                    </div>

                    <h2 className="text-slate-600 font-medium text-lg">Your Standard FIRE Number</h2>
                    <div className="text-5xl md:text-6xl font-bold text-slate-900">
                        {formatCurrency(stats.finalFireNumber)}
                    </div>

                    {goals.length > 0 && (
                        <p className="text-slate-500 text-sm">
                            Includes {formatCurrency(stats.baseStandardFire)} (Base) + {formatCurrency(stats.goalsCorpusAtRetirement)} (Goals)
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Section */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-indigo-600" />
                            Your Profile
                        </h3>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">Current Age</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="range"
                                        min="18"
                                        max="60"
                                        value={age}
                                        onChange={(e) => setAge(Number(e.target.value))}
                                        className="flex-1 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                    />
                                    <span className="text-lg font-semibold text-slate-800 w-12 text-right">{age}</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">Retirement Age</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="range"
                                        min={age + 1}
                                        max="80"
                                        value={retireAge}
                                        onChange={(e) => setRetireAge(Number(e.target.value))}
                                        className="flex-1 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                    />
                                    <span className="text-lg font-semibold text-slate-800 w-12 text-right">{retireAge}</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Monthly Expenses</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                                    <input
                                        type="number"
                                        value={expenses}
                                        onChange={(e) => setExpenses(Number(e.target.value))}
                                        step="5000"
                                        className="w-full pl-8 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-semibold text-slate-800 text-left"
                                    />
                                </div>
                                <p className="text-xs text-slate-600 mt-1 font-medium">{formatCurrency(expenses)}</p>
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <h4 className="text-sm font-medium text-slate-800 mb-4">Assumptions</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Inflation</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={inflation}
                                                onChange={(e) => setInflation(Number(e.target.value))}
                                                className="w-full pl-3 pr-6 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">%</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Pre-Retire Return</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={preReturn}
                                                onChange={(e) => setPreReturn(Number(e.target.value))}
                                                className="w-full pl-3 pr-6 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Goals Toggle */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-dashed border-indigo-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                                <Target className="w-5 h-5 text-indigo-600" />
                                Life Goals
                            </h3>
                            <button
                                onClick={() => setShowGoals(!showGoals)}
                                className="p-2 hover:bg-slate-50 rounded-full transition-colors"
                            >
                                {showGoals ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                            </button>
                        </div>

                        {showGoals && (
                            <div className="space-y-4">
                                <p className="text-sm text-slate-500">Add major future expenses like education, marriage, or buying a home.</p>

                                {goals.map((goal) => (
                                    <div key={goal.id} className="bg-slate-50 p-3 rounded-xl space-y-3 animate-in fade-in slide-in-from-top-2">
                                        <div className="flex items-center gap-2">
                                            <select
                                                value={goal.type}
                                                onChange={(e) => updateGoal(goal.id, "type", e.target.value)}
                                                className="flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-700"
                                            >
                                                <option value="Education">Education</option>
                                                <option value="Marriage">Marriage</option>
                                                <option value="Home">Home</option>
                                                <option value="Car">Car</option>
                                                <option value="Travel">Travel</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <button
                                                onClick={() => removeGoal(goal.id)}
                                                className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="text-xs font-medium text-slate-700 block mb-1">Cost Today</label>
                                                <input
                                                    type="number"
                                                    value={goal.cost}
                                                    onChange={(e) => updateGoal(goal.id, "cost", Number(e.target.value))}
                                                    step="50000"
                                                    className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-sm text-slate-900"
                                                />
                                                <p className="text-xs text-slate-500 mt-1">{formatCurrency(goal.cost)}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-slate-700 block mb-1">Years from now</label>
                                                <input
                                                    type="number"
                                                    value={goal.year}
                                                    onChange={(e) => updateGoal(goal.id, "year", Number(e.target.value))}
                                                    className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-sm text-slate-900"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={addGoal}
                                    className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Goal
                                </button>
                            </div>
                        )}
                        {!showGoals && goals.length > 0 && (
                            <div className="text-sm text-slate-500">
                                {goals.length} goal{goals.length > 1 ? 's' : ''} added.
                            </div>
                        )}
                    </div>
                </div>

                {/* Results Grid */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Lean FIRE */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-emerald-50 rounded-xl">
                                    <div className="text-2xl">🥗</div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-slate-500">Lean FIRE</p>
                                    <p className="text-2xl font-bold text-slate-800">{formatCurrency(stats.leanFire)}</p>
                                </div>
                            </div>
                            {goals.length > 0 && (
                                <p className="text-xs text-emerald-600 font-medium mb-2 bg-emerald-50 inline-block px-2 py-1 rounded-md">
                                    + {formatCurrency(stats.goalsCorpusAtRetirement)} for Goals
                                </p>
                            )}
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Minimalist lifestyle. Covers basic necessities only. Calculated as 15x your annual expenses.
                            </p>
                        </div>

                        {/* Standard FIRE */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow ring-1 ring-indigo-50">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-orange-50 rounded-xl">
                                    <div className="text-2xl">🔥</div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-slate-500">Standard FIRE</p>
                                    <p className="text-2xl font-bold text-slate-800">{formatCurrency(stats.standardFire)}</p>
                                </div>
                            </div>
                            {goals.length > 0 && (
                                <p className="text-xs text-orange-600 font-medium mb-2 bg-orange-50 inline-block px-2 py-1 rounded-md">
                                    + {formatCurrency(stats.goalsCorpusAtRetirement)} for Goals
                                </p>
                            )}
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Comfortable lifestyle. Maintains current standard of living. Calculated as 25x annual expenses (4% Rule).
                            </p>
                        </div>

                        {/* Fat FIRE */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-purple-50 rounded-xl">
                                    <div className="text-2xl">🍔</div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-slate-500">Fat FIRE</p>
                                    <p className="text-2xl font-bold text-slate-800">{formatCurrency(stats.fatFire)}</p>
                                </div>
                            </div>
                            {goals.length > 0 && (
                                <p className="text-xs text-purple-600 font-medium mb-2 bg-purple-50 inline-block px-2 py-1 rounded-md">
                                    + {formatCurrency(stats.goalsCorpusAtRetirement)} for Goals
                                </p>
                            )}
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Luxury lifestyle with buffer for indulgences. Calculated as 50x your annual expenses.
                            </p>
                        </div>

                        {/* Coast FIRE */}
                        <div className="bg-indigo-50 p-6 rounded-2xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/50 rounded-full blur-2xl -mr-8 -mt-8" />
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-white rounded-xl shadow-sm">
                                        <div className="text-2xl">🏖️</div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-indigo-600">Coast FIRE</p>
                                        <p className="text-2xl font-bold text-indigo-900">{formatCurrency(stats.coastFire)}</p>
                                    </div>
                                </div>
                                {goals.length > 0 && (
                                    <p className="text-xs text-indigo-700 font-medium mb-2 bg-indigo-100/50 inline-block px-2 py-1 rounded-md">
                                        + {formatCurrency(stats.goalsPvToday)} for Goals
                                    </p>
                                )}
                                <p className="text-sm text-indigo-700/80 leading-relaxed">
                                    The amount you need invested <strong>today</strong> to reach Standard FIRE by age {retireAge} without adding another rupee.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                        <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <Info className="w-4 h-4 text-slate-400" />
                            Calculation Details
                        </h4>
                        <div className="space-y-3 text-sm text-slate-600">
                            <div className="flex justify-between">
                                <span>Years to Retire</span>
                                <span className="font-medium text-slate-800">{stats.yearsToRetire} Years</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Projected Monthly Expense (at {retireAge})</span>
                                <span className="font-medium text-slate-800">{formatCurrency(stats.projectedAnnualExpense / 12)} / mo</span>
                            </div>
                            {stats.goalsCorpusAtRetirement > 0 && (
                                <div className="flex justify-between pt-2 border-t border-slate-200">
                                    <span>Extra Corpus for Goals</span>
                                    <span className="font-medium text-slate-800">{formatCurrency(stats.goalsCorpusAtRetirement)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <RelatedCalculators currentPath="/calculators/fire" category="investments" />
        </div >
    );
};

export default FireCalculator;
