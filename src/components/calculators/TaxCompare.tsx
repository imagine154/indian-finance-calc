'use client';

import { useState } from 'react';
import { compareTaxRegimes, type TaxInput, type TaxComparisonResult } from '@/core/logic/tax';
import { IndianRupee, TrendingDown, Award, Calculator, Building, Wallet, Bitcoin } from 'lucide-react';
import { RelatedCalculators } from "../ui/RelatedCalculators";

export function TaxCompare() {
    // --- 1. INCOME STATES ---
    const [grossSalary, setGrossSalary] = useState(1000000);
    const [interestIncome, setInterestIncome] = useState(0);
    const [rentalIncome, setRentalIncome] = useState(0);
    const [digitalAssets, setDigitalAssets] = useState(0);
    const [otherIncome, setOtherIncome] = useState(0);

    // --- 2. HOUSE PROPERTY ---
    const [homeLoanSelf, setHomeLoanSelf] = useState(0);
    const [homeLoanLetOut, setHomeLoanLetOut] = useState(0);

    // --- 3. DEDUCTIONS ---
    const [npsEmployer, setNpsEmployer] = useState(0); // 80CCD(2) - Shared
    const [hraExemption, setHraExemption] = useState(0);
    const [ltaExemption, setLtaExemption] = useState(0);
    const [section80C, setSection80C] = useState(0);
    const [section80D, setSection80D] = useState(0);
    const [npsSelf, setNpsSelf] = useState(0); // 80CCD(1B)

    // Add this helper function
    const formatCompact = (value: number) => {
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
        if (value >= 100000) return `₹${(value / 100000).toFixed(2)} Lac`;
        return `₹${value.toLocaleString('en-IN')}`;
    };

    const input: TaxInput = {
        grossSalary,
        interestIncome: interestIncome || undefined,
        rentalIncome: rentalIncome || undefined,
        digitalAssetsIncome: digitalAssets || undefined,
        otherIncome: otherIncome || undefined,

        homeLoanSelfOccupied: homeLoanSelf || undefined,
        homeLoanLetOut: homeLoanLetOut || undefined,

        npsEmployer80CCD2: npsEmployer || undefined,

        hraExemption: hraExemption || undefined,
        ltaExemption: ltaExemption || undefined,
        section80C: section80C || undefined,
        section80D: section80D || undefined,
        section80CCD1B: npsSelf || undefined,
    };

    // ✅ Derived State (Calculated on every render, SSR friendly)
    const result = compareTaxRegimes(input);

    const formatCurrency = (val: number) => `₹${val.toLocaleString('en-IN')}`;

    const isOldBetter = result.recommendation.betterRegime === 'Old';
    const isNewBetter = result.recommendation.betterRegime === 'New';

    return (
        <div className="w-full max-w-7xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* === LEFT: INPUT FORM === */}
                <div className="space-y-6">

                    {/* A. Income Sources */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Wallet className="w-5 h-5 text-blue-600" /> Income Sources
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-slate-700 mb-1 block">Gross Salary</label>
                                <div className="relative">
                                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="number"
                                        step="1000"
                                        value={grossSalary}
                                        onChange={e => setGrossSalary(Number(e.target.value))}
                                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 bg-white"
                                    />
                                </div>
                                {/* 👇 The missing text is here */}
                                <p className="text-xs text-slate-500 mt-1 font-medium pl-1">
                                    {formatCompact(grossSalary)}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-slate-600 mb-1 block">Interest Income</label>
                                    <input type="number" step="500" value={interestIncome} onChange={e => setInterestIncome(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white" />
                                </div>
                                <div>
                                    <label className="text-sm text-slate-600 mb-1 block">Other Income</label>
                                    <input type="number" step="500" value={otherIncome} onChange={e => setOtherIncome(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-slate-600 flex items-center gap-1 mb-1"><Bitcoin className="w-3 h-3" /> Digital Assets (Crypto)</label>
                                <input type="number" step="500" value={digitalAssets} onChange={e => setDigitalAssets(Number(e.target.value))} className="w-full px-3 py-2 border border-orange-200 rounded-lg bg-orange-50 focus:ring-orange-500 text-slate-900 bg-white" placeholder="Flat 30% Tax" />
                                <p className="text-xs text-orange-600 mt-1">Taxed flat @ 30%. No slab benefit.</p>
                            </div>
                        </div>
                    </div>

                    {/* B. House Property */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Building className="w-5 h-5 text-purple-600" /> House Property
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-slate-600 mb-1 block">Interest (Self Occupied)</label>
                                <input type="number" step="500" value={homeLoanSelf} onChange={e => setHomeLoanSelf(Math.min(Number(e.target.value), 200000))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white" placeholder="Max 2L (Old Regime)" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                                <div>
                                    <label className="text-sm text-slate-600 mb-1 block">Rent Received</label>
                                    <input type="number" step="500" value={rentalIncome} onChange={e => setRentalIncome(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white" />
                                </div>
                                <div>
                                    <label className="text-sm text-slate-600 mb-1 block">Interest (Let Out)</label>
                                    <input type="number" step="500" value={homeLoanLetOut} onChange={e => setHomeLoanLetOut(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* C. Deductions */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <TrendingDown className="w-5 h-5 text-green-600" /> Deductions
                        </h2>

                        {/* Shared Deduction */}
                        <div className="mb-6">
                            <label className="text-sm font-semibold text-slate-700 mb-1 block">NPS Employer (80CCD(2))</label>
                            <input type="number" step="500" value={npsEmployer} onChange={e => setNpsEmployer(Number(e.target.value))} className="w-full px-3 py-2 border border-green-200 bg-green-50/50 rounded-lg focus:ring-green-500 text-slate-900" placeholder="Allowed in BOTH Regimes" />
                            <p className="text-xs text-slate-500 mt-1">Valid for both Old & New regimes.</p>
                        </div>

                        {/* Old Regime Deductions */}
                        <div className="border-t border-slate-200 pt-4">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Old Regime Only</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-slate-600 mb-1 block">Section 80C</label>
                                    <input type="number" step="500" value={section80C} onChange={e => setSection80C(Math.min(Number(e.target.value), 150000))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white" max={150000} />
                                </div>
                                <div>
                                    <label className="text-sm text-slate-600 mb-1 block">NPS Self (80CCD 1B)</label>
                                    <input type="number" step="500" value={npsSelf} onChange={e => setNpsSelf(Math.min(Number(e.target.value), 50000))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white" max={50000} />
                                </div>
                                <div>
                                    <label className="text-sm text-slate-600 mb-1 block">HRA Exemption</label>
                                    <input type="number" step="500" value={hraExemption} onChange={e => setHraExemption(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white" />
                                </div>
                                <div>
                                    <label className="text-sm text-slate-600 mb-1 block">Section 80D (Medical)</label>
                                    <input type="number" step="500" value={section80D} onChange={e => setSection80D(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* === RIGHT: RESULTS === */}
                <div className="space-y-6">
                    {result.recommendation.savingsAmount > 0 && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Award className="w-6 h-6 text-green-600" />
                                <h3 className="text-lg font-bold text-green-900">Recommended: {result.recommendation.betterRegime} Regime</h3>
                            </div>
                            <p className="text-2xl font-bold text-green-700 mb-1">
                                You save {formatCurrency(result.recommendation.savingsAmount)}
                            </p>
                            <p className="text-sm text-green-600">{result.recommendation.reason}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['Old', 'New'].map((r) => {
                            const data = r === 'Old' ? result.oldRegime : result.newRegime;
                            const isWinner = result.recommendation.betterRegime === r;
                            const isBetterClass = isWinner
                                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 ring-2 ring-green-200'
                                : 'bg-white border-slate-200';

                            return (
                                <div key={r} className={`rounded-2xl p-6 border-2 transition-all ${isBetterClass}`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-slate-900">{r} Regime</h3>
                                        {isWinner && <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">Winner</span>}
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-600">Gross Total Income</span>
                                            <span className="font-medium">{formatCurrency(data.grossTotalIncome)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-600">Deductions</span>
                                            <span className="font-semibold text-purple-600">-{formatCurrency(data.deductions)}</span>
                                        </div>
                                        {data.housePropertyIncome < 0 && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">House Prop Loss</span>
                                                <span className="font-semibold text-red-500">{formatCurrency(data.housePropertyIncome)}</span>
                                            </div>
                                        )}
                                        <div className="border-t pt-2 flex justify-between text-sm">
                                            <span className="text-slate-600">Taxable Income</span>
                                            <span className="font-semibold">{formatCurrency(data.taxableSlabIncome + data.taxableSpecialIncome)}</span>
                                        </div>

                                        {/* UPGRADED TAX SECTION */}
                                        <div className="flex justify-between pt-3 items-start">
                                            <span className="text-slate-600 text-sm mt-1">Tax + Cess</span>
                                            <div className="text-right">
                                                <div className="font-bold text-red-600 text-lg leading-none">
                                                    {formatCurrency(data.totalTaxPayable)}
                                                </div>
                                                {data.totalTaxPayable > 0 && (
                                                    <div className="text-xs text-slate-500 mt-1 font-medium">
                                                        ~{formatCurrency(Math.round(data.totalTaxPayable / 12))}/mo
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Tax Slab Breakdown (Restored) */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Tax Slab Breakdown</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-semibold text-slate-700 mb-2">Old Regime</p>
                                <div className="space-y-1">
                                    {result.oldRegime.slabBreakdown.map((slab, i) => (
                                        <div key={i} className="text-xs flex justify-between">
                                            <span className="text-slate-600">{slab.range} @ {slab.rate}%</span>
                                            <span className="font-medium text-slate-900">{formatCurrency(slab.amount)}</span>
                                        </div>
                                    ))}
                                    {result.oldRegime.taxFromSpecial > 0 && (
                                        <div className="text-xs flex justify-between text-orange-600 pt-1 border-t border-dashed">
                                            <span>Crypto @ 30%</span>
                                            <span>{formatCurrency(result.oldRegime.taxFromSpecial)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-700 mb-2">New Regime</p>
                                <div className="space-y-1">
                                    {result.newRegime.slabBreakdown.map((slab, i) => (
                                        <div key={i} className="text-xs flex justify-between">
                                            <span className="text-slate-600">{slab.range} @ {slab.rate}%</span>
                                            <span className="font-medium text-slate-900">{formatCurrency(slab.amount)}</span>
                                        </div>
                                    ))}
                                    {result.newRegime.taxFromSpecial > 0 && (
                                        <div className="text-xs flex justify-between text-orange-600 pt-1 border-t border-dashed">
                                            <span>Crypto @ 30%</span>
                                            <span>{formatCurrency(result.newRegime.taxFromSpecial)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RelatedCalculators toolId="income-tax" category="income" />
        </div>
    );
}