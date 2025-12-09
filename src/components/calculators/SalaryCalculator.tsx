'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateSalaryBreakdown, type SalaryInput } from '@/core/logic/salary';
import { IndianRupee, Calculator, Settings, ChevronDown, ChevronUp, PieChart as PieChartIcon, Banknote } from 'lucide-react';
import { RelatedCalculators } from "../ui/RelatedCalculators";
import dynamic from 'next/dynamic';

const SalaryResultChart = dynamic(() => import('@/components/charts/SalaryResultChart'), {
    ssr: false,
    loading: () => <div className="h-[200px] w-full bg-slate-50 rounded-lg animate-pulse"></div>
});

interface SalaryCalculatorProps {
    initialCtc?: number;
    initialIsMetro?: boolean;
}

export function SalaryCalculator({ initialCtc = 1200000, initialIsMetro = true }: SalaryCalculatorProps) {
    // --- INPUTS ---
    const [ctc, setCtc] = useState(initialCtc);
    const [basicPercentage, setBasicPercentage] = useState(50);
    const [isMetro, setIsMetro] = useState(initialIsMetro); // Default based on prop

    // Deductions / Structure
    const [vpfAmount, setVpfAmount] = useState(0);
    const [professionalTax, setProfessionalTax] = useState(200);
    const [foodCoupon, setFoodCoupon] = useState(0);
    const [superAnnuation, setSuperAnnuation] = useState(0);
    const [npsEmployer, setNpsEmployer] = useState(0);

    const [taxRegime, setTaxRegime] = useState<'Old' | 'New'>('New');
    const [showSettings, setShowSettings] = useState(false);

    const input: SalaryInput = {
        ctc,
        basicPercentage,
        vpfAmount,
        professionalTax,
        foodCoupon,
        superAnnuation,
        npsEmployer,
        isMetro,
        taxRegime
    };

    // ✅ Derived State (Calculated on every render, SSR friendly)
    const result = calculateSalaryBreakdown(input);

    const formatCurrency = (val: number) => `₹${Math.round(val).toLocaleString('en-IN')}`;

    // Chart Data
    const chartData = [
        { name: 'Net In-Hand', value: result.monthly.netInHand, color: '#10B981' }, // Emerald 500
        { name: 'Income Tax', value: result.monthly.tax, color: '#EF4444' }, // Red 500
        { name: 'PF & Deductions', value: result.monthly.pfEmployee + result.monthly.vpf + result.monthly.professionalTax, color: '#F59E0B' }, // Amber 500
    ];

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* === LEFT: INPUTS (4 cols) === */}
                <div className="lg:col-span-4 space-y-6">


                    {/* Main Input */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Calculator className="w-5 h-5 text-blue-600" /> Salary Details
                        </h2>

                        <div className="mb-6">
                            <label className="text-sm font-semibold text-slate-700 mb-2 block">Annual CTC</label>
                            <div className="relative">
                                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="number"
                                    value={ctc}
                                    onChange={e => setCtc(Number(e.target.value))}
                                    className="w-full pl-10 pr-4 py-3 text-lg font-bold text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    step="10000"
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-2 text-right">
                                {ctc >= 10000000 ? `${(ctc / 10000000).toFixed(2)} Cr` : `${(ctc / 100000).toFixed(2)} Lakh`} / year
                            </p>
                        </div>

                        <div className="mb-6">
                            <label className="text-sm font-semibold text-slate-700 mb-2 block">Tax Regime</label>
                            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
                                {['New', 'Old'].map((r) => (
                                    <button
                                        key={r}
                                        onClick={() => setTaxRegime(r as 'Old' | 'New')}
                                        className={`py-2 text-sm font-medium rounded-md transition-all ${taxRegime === r
                                            ? 'bg-white text-blue-600 shadow-sm'
                                            : 'text-slate-500 hover:text-slate-700'
                                            }`}
                                    >
                                        {r} Regime
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Advanced Settings Toggle */}
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-medium text-slate-700 transition-colors"
                        >
                            <span className="flex items-center gap-2"><Settings className="w-4 h-4" /> Salary Structure</span>
                            {showSettings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        {/* Advanced Settings Content */}
                        {showSettings && (
                            <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2">

                                {/* Metro Toggle */}
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                                    <div>
                                        <label className="text-sm font-semibold text-slate-700 block">Metro City?</label>
                                        <p className="text-xs text-slate-500">HRA 50% (Delhi, Mum, Kol, Chn)</p>
                                    </div>
                                    <button
                                        onClick={() => setIsMetro(!isMetro)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isMetro ? 'bg-blue-600' : 'bg-slate-200'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isMetro ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2 items-center">
                                        <label className="text-xs text-slate-600">Basic Salary %</label>
                                        <div className="flex items-center gap-1">
                                            <input
                                                type="number"
                                                min="10"
                                                max="60"
                                                value={basicPercentage}
                                                onChange={e => {
                                                    const val = Number(e.target.value);
                                                    if (val >= 0 && val <= 100) setBasicPercentage(val);
                                                }}
                                                className="w-16 px-2 py-1 text-xs font-bold text-blue-600 border border-slate-300 rounded text-right"
                                            />
                                            <span className="text-xs font-bold text-blue-600">%</span>
                                        </div>
                                    </div>
                                    <input
                                        type="range" min="10" max="60" step="1"
                                        value={basicPercentage}
                                        onChange={e => setBasicPercentage(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-slate-600 mb-1 block">Superannuation</label>
                                        <input type="number" step="1000" value={superAnnuation} onChange={e => setSuperAnnuation(Number(e.target.value))} className="w-full px-3 py-2 text-sm text-slate-900 border border-slate-300 rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-600 mb-1 block">Monthly PT</label>
                                        <input type="number" step="50" value={professionalTax} onChange={e => setProfessionalTax(Number(e.target.value))} className="w-full px-3 py-2 text-sm text-slate-900 border border-slate-300 rounded-lg" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-slate-600 mb-1 block">Monthly VPF</label>
                                        <input type="number" step="500" value={vpfAmount} onChange={e => setVpfAmount(Number(e.target.value))} className="w-full px-3 py-2 text-sm text-slate-900 border border-slate-300 rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-600 mb-1 block">Food Coupon/mo</label>
                                        <input type="number" step="100" value={foodCoupon} onChange={e => setFoodCoupon(Number(e.target.value))} className="w-full px-3 py-2 text-sm text-slate-900 border border-slate-300 rounded-lg" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs text-slate-600 mb-1 block">Corporate NPS (Annual)</label>
                                    <input type="number" step="1000" value={npsEmployer} onChange={e => setNpsEmployer(Number(e.target.value))} className="w-full px-3 py-2 text-sm text-slate-900 border border-slate-300 rounded-lg" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* === RIGHT: RESULTS (8 cols) === */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Hero Card */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
                        <div className="relative z-10">
                            <p className="text-blue-100 font-medium mb-1">Estimated Monthly In-Hand</p>
                            <h1 className="text-5xl font-bold mb-4">{formatCurrency(result.monthly.netInHand)}</h1>
                            <div className="flex flex-wrap gap-6 text-sm text-blue-100/80">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                    Gross: {formatCurrency(result.monthly.grossCash)}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                    Tax: {formatCurrency(result.monthly.tax)}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                    PF: {formatCurrency(result.monthly.pfEmployee)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Breakdown List */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Banknote className="w-5 h-5 text-slate-500" /> Monthly Breakdown
                            </h3>
                            <div className="space-y-3">
                                {/* Earnings */}
                                <div className="space-y-2 pb-3 border-b border-slate-100">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Earnings</p>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Basic Salary</span>
                                        <span className="font-medium text-slate-600">{formatCurrency(result.monthly.basic)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">HRA</span>
                                        <span className="font-medium text-slate-600">{formatCurrency(result.monthly.hra)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Special Allowance</span>
                                        <span className="font-medium text-slate-600">{formatCurrency(result.monthly.special)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-semibold text-slate-900 pt-1">
                                        <span>Gross Salary</span>
                                        <span>{formatCurrency(result.monthly.grossCash)}</span>
                                    </div>
                                </div>

                                {/* Deductions */}
                                <div className="space-y-2 pt-1">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Deductions</p>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Income Tax (TDS)</span>
                                        <span className="font-medium text-red-500">-{formatCurrency(result.monthly.tax)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm items-center">
                                        <span className="text-slate-600 flex items-center gap-2">
                                            Provident Fund (PF)
                                            <Link href="/calculators/pf" className="text-xs text-blue-600 hover:underline flex items-center">
                                                See Growth ↗
                                            </Link>
                                        </span>
                                        <span className="font-medium text-amber-600">-{formatCurrency(result.monthly.pfEmployee)}</span>
                                    </div>
                                    {result.monthly.vpf > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-600">VPF</span>
                                            <span className="font-medium text-amber-600">-{formatCurrency(result.monthly.vpf)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Professional Tax</span>
                                        <span className="font-medium text-slate-500">-{formatCurrency(result.monthly.professionalTax)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-semibold text-slate-900 pt-1">
                                        <span>Total Deductions</span>
                                        <span className="text-red-600">-{formatCurrency(result.monthly.totalDeductions)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Chart */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <PieChartIcon className="w-5 h-5 text-slate-500" /> Distribution
                            </h3>
                            <SalaryResultChart data={chartData} formatCurrency={formatCurrency} />
                        </div>
                    </div>
                </div>
            </div>
            <RelatedCalculators currentPath="/calculators/salary" category="income" />
        </div>
    );
}

