"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Search, TrendingUp, Info, X, Check, ChevronDown, Filter, PieChart, ArrowRight, RefreshCw, Download } from 'lucide-react';

const MfResultChart = dynamic(() => import('@/components/charts/MfResultChart'), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full flex items-center justify-center bg-slate-50 rounded-lg animate-pulse"></div>
});

// --- Types ---
interface Scheme {
    code: string;
    name: string;
    amc: string;
    category: string;
    subcategory: string;
    plan: string;
    option: string;
    type: string;
}

interface ReturnsData {
    "1M"?: number;
    "3M"?: number;
    "6M"?: number;
    "1Y"?: number;
    "3Y"?: number;
    "5Y"?: number;
    "7Y"?: number;
    "10Y"?: number;
}

interface SchemeWithReturns {
    name: string;
    code: string;
    results: ReturnsData;
    consistencyLabel?: string;
    consistencyScore?: number;
}

const PERIODS = ["1M", "3M", "6M", "1Y", "3Y", "5Y", "7Y", "10Y"];

// --- Helper Components ---

const MultiSelect = ({
    label,
    options,
    selected,
    onChange,
    disabled = false,
    singleSelect = false
}: {
    label: string,
    options: string[],
    selected: string[],
    onChange: (val: string[]) => void,
    disabled?: boolean,
    singleSelect?: boolean
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');

    const filteredOptions = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        const handleClick = (e: any) => {
            if (!e.target.closest(`.multi-select-${label.replace(/\s/g, '')}`)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [label]);

    const toggleOption = (opt: string) => {
        if (singleSelect) {
            onChange([opt]);
            setIsOpen(false);
            return;
        }

        if (opt === `All ${label}s` || opt === 'All Plans' || opt === 'All Options') {
            if (selected.includes(opt)) {
                onChange([]);
            } else {
                onChange([opt]);
            }
            return;
        }

        let newSelected = selected.filter(s => !s.startsWith('All '));
        if (newSelected.includes(opt)) {
            newSelected = newSelected.filter(s => s !== opt);
        } else {
            newSelected.push(opt);
        }
        onChange(newSelected);
    };

    const displayValue = selected.length === 0
        ? `Select ${label}`
        : selected.length === 1
            ? selected[0]
            : `${selected.length} selected`;

    return (
        <div className={`relative multi-select-${label.replace(/\s/g, '')} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">{label}</label>
            <div
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm flex justify-between items-center cursor-pointer hover:border-blue-400 transition-colors"
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <span className="truncate text-slate-700 font-medium">{displayValue}</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
            </div>

            {isOpen && (
                <div className="absolute z-20 w-full mt-1 bg-white rounded-lg shadow-xl border border-slate-200 max-h-60 overflow-hidden flex flex-col">
                    {!singleSelect && (
                        <div className="p-2 border-b border-slate-100">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full p-1.5 text-xs border border-slate-200 rounded outline-none focus:border-blue-500"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    )}
                    <div className="overflow-y-auto flex-1">
                        {filteredOptions.map(opt => (
                            <div
                                key={opt}
                                className={`px-3 py-2 text-sm cursor-pointer hover:bg-slate-50 flex items-center gap-2 ${selected.includes(opt) ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-700'}`}
                                onClick={(e) => { e.stopPropagation(); toggleOption(opt); }}
                            >
                                {!singleSelect && (
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${selected.includes(opt) ? 'border-blue-500 bg-blue-500 text-white' : 'border-slate-300'}`}>
                                        {selected.includes(opt) && <Check className="w-3 h-3" />}
                                    </div>
                                )}
                                {opt}
                            </div>
                        ))}
                        {filteredOptions.length === 0 && (
                            <div className="p-3 text-xs text-slate-400 text-center">No options found</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};


export default function MutualFundAnalyzer() {
    // --- State ---
    const [allSchemes, setAllSchemes] = useState<Scheme[]>([]);
    const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>([]);

    const [investmentType, setInvestmentType] = useState('Mutual Fund');

    const [selectedPlan, setSelectedPlan] = useState<string[]>(['Direct']);
    const [selectedAMC, setSelectedAMC] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string[]>([]);

    const [optionsAMC, setOptionsAMC] = useState<string[]>([]);
    const [optionsCategory, setOptionsCategory] = useState<string[]>([]);
    const [optionsSubCategory, setOptionsSubCategory] = useState<string[]>([]);
    const [optionsPlan, setOptionsPlan] = useState<string[]>([]);
    const [optionsOption, setOptionsOption] = useState<string[]>([]);

    const [selectedSchemesForView, setSelectedSchemesForView] = useState<Scheme[]>([]);
    const [comparisonResults, setComparisonResults] = useState<SchemeWithReturns[]>([]);

    const [loading, setLoading] = useState(false);
    const [calculating, setCalculating] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);

    const [topPerformers, setTopPerformers] = useState<any>(null);
    const [showTopPerformers, setShowTopPerformers] = useState(true);

    // --- Initialization ---
    useEffect(() => {
        loadInitialData();
    }, [investmentType]);

    const loadInitialData = async () => {
        setLoading(true);
        setStatusText(`Loading ${investmentType}s...`);
        setShowTopPerformers(true);
        setComparisonResults([]);

        try {
            const res = await fetch(`/api/mutual-fund/schemes?type=${investmentType}`);
            const data: Scheme[] = await res.json();
            setAllSchemes(data);

            let initialFiltered = data;
            if (investmentType === 'Mutual Fund') {
                initialFiltered = data.filter(s => s.plan === 'Direct');
                setSelectedPlan(['Direct']);
                setSelectedAMC([]);
                setSelectedCategory([]);
                setSelectedSubCategory([]);
                initialFiltered = initialFiltered.filter(s => s.option === 'Growth');
                setSelectedOption(['Growth']);
            } else {
                setSelectedPlan([]);
                setSelectedOption([]);
            }

            setFilteredSchemes(initialFiltered);
            updateDropdownOptions(initialFiltered);
            updateStatusText(initialFiltered.length, investmentType);
            loadTopPerformers();

        } catch (error) {
            console.error("Failed to load data", error);
            setStatusText("Error loading data.");
        } finally {
            setLoading(false);
        }
    };

    const loadTopPerformers = async () => {
        try {
            const res = await fetch(`/api/mutual-fund/top-performers?type=${investmentType}`);
            const data = await res.json();
            setTopPerformers(data);
        } catch (error) {
            console.error("Failed to load top performers", error);
        }
    };

    // --- Filtering Logic ---
    const updateDropdownOptions = (schemes: Scheme[]) => {
        const getUnique = (key: keyof Scheme) => Array.from(new Set(schemes.map(s => s[key]))).sort();

        setOptionsAMC(['All AMCs', ...getUnique('amc')]);
        setOptionsCategory(['All Categories', ...getUnique('category')]);
        setOptionsSubCategory(['All Sub-Categories', ...getUnique('subcategory')]);

        if (investmentType === 'Mutual Fund') {
            setOptionsPlan(['Direct', 'Regular', 'Institutional', 'Retail', 'Standard', 'Defunct']);
            setOptionsOption(['All Options', ...getUnique('option')]);
        }
    };

    useEffect(() => {
        if (loading) return;

        let current = allSchemes;

        if (investmentType === 'Mutual Fund' && selectedPlan.length > 0 && !selectedPlan.includes('All Plans')) {
            current = current.filter(s => selectedPlan.includes(s.plan));
        }
        if (selectedAMC.length > 0 && !selectedAMC.includes('All AMCs')) {
            current = current.filter(s => selectedAMC.includes(s.amc));
        }
        if (selectedCategory.length > 0 && !selectedCategory.includes('All Categories')) {
            current = current.filter(s => selectedCategory.includes(s.category));
        }
        if (selectedSubCategory.length > 0 && !selectedSubCategory.includes('All Sub-Categories')) {
            current = current.filter(s => selectedSubCategory.includes(s.subcategory));
        }
        if (investmentType === 'Mutual Fund' && selectedOption.length > 0 && !selectedOption.includes('All Options')) {
            current = current.filter(s => selectedOption.includes(s.option));
        }

        setFilteredSchemes(current);
        updateStatusText(current.length, investmentType, true);
        updateDropdownOptions(current);

    }, [selectedPlan, selectedAMC, selectedCategory, selectedSubCategory, selectedOption, allSchemes, investmentType]);


    const updateStatusText = (count: number, type: string, isFilter = false) => {
        if (isFilter) {
            if (count === 0) setStatusText("No matching Funds found, try changing filter values.");
            else if (count <= 50) setStatusText(`${count} Funds matched — please select from the dropdown above.`);
            else setStatusText(`${count} Funds matched — please start searching the scheme name or filter for more granular results.`);
        } else {
            setStatusText(`Currently loaded with ${count} ${type}s${type === 'Mutual Fund' ? '(Direct & Growth)' : ''} - use filters for more granular results.`);
        }
    };

    // --- Handlers ---
    const handleReset = () => {
        setInvestmentType('Mutual Fund');
        setSelectedSchemesForView([]);
        setComparisonResults([]);
        setShowTopPerformers(true);
        loadInitialData(); // Re-trigger load
    };

    const handleCalculate = async () => {
        if (selectedSchemesForView.length === 0) {
            alert("Please select at least one scheme.");
            return;
        }
        setCalculating(true);
        setComparisonResults([]);
        setShowTopPerformers(false); // Hide Top Performers

        try {
            const results = [];
            for (const s of selectedSchemesForView) {
                const res = await fetch(`/api/mutual-fund/returns?code=${s.code}`);
                if (res.ok) {
                    const data = await res.json();
                    results.push({
                        name: s.name,
                        code: s.code,
                        results: data.results
                    });
                }
            }
            setComparisonResults(calculateConsistency(results));
        } catch (error) {
            console.error("Error calculating returns", error);
        } finally {
            setCalculating(false);
        }
    };

    const calculateConsistency = (funds: any[]): SchemeWithReturns[] => {
        const weights: any = { "1M": 0.05, "3M": 0.08, "6M": 0.12, "1Y": 0.15, "3Y": 0.20, "5Y": 0.20, "7Y": 0.12, "10Y": 0.08 };
        const eligible = funds.filter(f => f.results && f.results["5Y"] !== undefined);

        if (eligible.length === 0) return funds;

        const periodMinMax: any = {};
        Object.keys(weights).forEach(p => {
            const vals = eligible.map(f => f.results[p]).filter((v: any) => v !== undefined);
            if (vals.length) periodMinMax[p] = [Math.min(...vals), Math.max(...vals)];
        });

        const scored = funds.map(f => {
            if (!eligible.find(e => e.code === f.code)) return f;
            let score = 0;
            let totalWeight = 0;
            Object.keys(weights).forEach(p => {
                if (f.results[p] !== undefined && periodMinMax[p]) {
                    const [min, max] = periodMinMax[p];
                    const range = max - min || 1;
                    const normalized = (f.results[p] - min) / range;
                    score += normalized * weights[p];
                    totalWeight += weights[p];
                }
            });
            const finalScore = totalWeight > 0 ? score / totalWeight : 0;
            return { ...f, consistencyScore: finalScore };
        });

        const maxScore = Math.max(...scored.map(s => s.consistencyScore || 0));
        return scored.map(s => {
            if (!s.consistencyScore) return s;
            let label = '';
            if (s.consistencyScore >= maxScore * 0.95) label = 'Consistent Performer';
            else if (s.consistencyScore >= maxScore * 0.75) label = 'Emerging Performer';
            return { ...s, consistencyLabel: label };
        });
    };

    const handleDownloadCSV = () => {
        if (comparisonResults.length === 0) return;

        const headers = ['Scheme Name', 'Consistency', ...PERIODS];
        const rows = comparisonResults.map(s => [
            `"${s.name}"`, // Quote name to handle commas
            s.consistencyLabel || '-',
            ...PERIODS.map(p => s.results[p as keyof ReturnsData] !== undefined ? s.results[p as keyof ReturnsData] : '-')
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(r => r.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `mutual_fund_analysis_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-full max-w-6xl mx-auto font-sans">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Panel: Inputs (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">

                    {/* Investment Type */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-4">
                            <PieChart className="w-4 h-4 text-blue-600" />
                            Investment Type
                        </label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setInvestmentType('Mutual Fund')}
                                className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${investmentType === 'Mutual Fund'
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                Mutual Funds
                            </button>
                            <button
                                onClick={() => setInvestmentType('ETF')}
                                className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${investmentType === 'ETF'
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                ETFs
                            </button>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-4">
                            <Search className="w-4 h-4 text-purple-600" />
                            Search Scheme
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setShowSearchDropdown(true); }}
                                onFocus={() => setShowSearchDropdown(true)}
                                placeholder={`Search from ${filteredSchemes.length} Funds...`}
                                className={`w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium text-slate-900 transition-all placeholder:text-slate-400 ${filteredSchemes.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={filteredSchemes.length === 0}
                            />
                            <Search className="absolute left-3 top-3.5 text-slate-500 w-4 h-4" />

                            {showSearchDropdown && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setShowSearchDropdown(false)}></div>
                                    <div className="absolute z-20 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-200 max-h-60 overflow-y-auto">
                                        {filteredSchemes.length > 0 && filteredSchemes.length < 25 && (
                                            <div
                                                onClick={() => {
                                                    const newSchemes = [...selectedSchemesForView];
                                                    filteredSchemes.forEach(s => {
                                                        if (!newSchemes.find(x => x.code === s.code)) {
                                                            newSchemes.push(s);
                                                        }
                                                    });
                                                    setSelectedSchemesForView(newSchemes);
                                                    setShowSearchDropdown(false);
                                                    setSearchQuery('');
                                                }}
                                                className="p-3 hover:bg-blue-50 cursor-pointer border-b border-slate-100 text-sm font-bold text-blue-600 flex items-center gap-2 sticky top-0 bg-white z-10"
                                            >
                                                <Check className="w-4 h-4" />
                                                Select All ({filteredSchemes.length}) Schemes
                                            </div>
                                        )}
                                        {filteredSchemes
                                            .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                            .slice(0, 50)
                                            .map(s => (
                                                <div
                                                    key={s.code}
                                                    onClick={() => {
                                                        if (!selectedSchemesForView.find(x => x.code === s.code)) {
                                                            setSelectedSchemesForView([...selectedSchemesForView, s]);
                                                        }
                                                        setShowSearchDropdown(false);
                                                        setSearchQuery('');
                                                    }}
                                                    className="p-3 hover:bg-blue-50 cursor-pointer border-b border-slate-50 last:border-0 text-sm"
                                                >
                                                    <div className="font-medium text-slate-800">{s.name}</div>
                                                    <div className="text-xs text-slate-500 mt-0.5">{s.category} • {s.amc}</div>
                                                </div>
                                            ))}
                                        {filteredSchemes.length === 0 && <div className="p-4 text-center text-slate-500 text-sm">No schemes found</div>}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Selected Chips */}
                        {selectedSchemesForView.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {selectedSchemesForView.map(s => (
                                    <div key={s.code} className="bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 animate-in zoom-in-95">
                                        <span className="truncate max-w-[200px]">{s.name}</span>
                                        <X
                                            className="w-3 h-3 cursor-pointer hover:text-red-500"
                                            onClick={() => setSelectedSchemesForView(selectedSchemesForView.filter(x => x.code !== s.code))}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-4">
                            <Filter className="w-4 h-4 text-orange-600" />
                            Filters
                        </label>
                        <div className="space-y-4">
                            <MultiSelect label="Plan" options={optionsPlan} selected={selectedPlan} onChange={setSelectedPlan} singleSelect={true} disabled={investmentType === 'ETF'} />
                            <MultiSelect label="AMC" options={optionsAMC} selected={selectedAMC} onChange={setSelectedAMC} />
                            <MultiSelect label="Category" options={optionsCategory} selected={selectedCategory} onChange={setSelectedCategory} />
                            <MultiSelect label="Sub-Category" options={optionsSubCategory} selected={selectedSubCategory} onChange={setSelectedSubCategory} />
                            <MultiSelect label="Option" options={optionsOption} selected={selectedOption} onChange={setSelectedOption} disabled={investmentType === 'ETF'} />
                        </div>

                        <div className="mt-4 p-3 bg-slate-50 rounded-xl text-xs text-slate-500 leading-relaxed border border-slate-100">
                            {statusText}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleReset}
                            className="flex-1 py-3 px-4 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Reset All
                        </button>
                        <button
                            onClick={handleCalculate}
                            disabled={calculating || selectedSchemesForView.length === 0}
                            className={`flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:shadow-xl hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2 ${calculating || selectedSchemesForView.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {calculating ? 'Calculating...' : 'Calculate Returns'}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                </div>

                {/* Right Panel: Results (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">

                    {/* Top Performers (Conditional) */}
                    {showTopPerformers && topPerformers && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                                    Top Performing Funds
                                </h3>
                                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">Based on historical returns</span>
                            </div>

                            {["3Y", "5Y", "10Y"].map(period => (
                                <div key={period} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center gap-2">
                                        <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-md text-xs font-bold">{period} Returns</span>
                                        <span className="text-sm font-semibold text-slate-700">Category Leaders</span>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-slate-400 uppercase bg-white border-b border-slate-50">
                                                <tr>
                                                    <th className="px-5 py-3 font-medium">Category</th>
                                                    <th className="px-5 py-3 font-medium">Top Scheme</th>
                                                    <th className="px-5 py-3 font-medium text-right">Return</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-50">
                                                {Object.keys(topPerformers[period] || {}).map(category => {
                                                    const funds = topPerformers[period][category];
                                                    return (
                                                        <tr key={category} className="hover:bg-slate-50/50 transition-colors">
                                                            <td className="px-5 py-3 font-medium text-slate-700 text-xs">{category}</td>
                                                            <td className="px-5 py-3">
                                                                <div className="font-medium text-slate-800 truncate max-w-[220px]" title={funds[0]?.scheme_name}>{funds[0]?.scheme_name || '-'}</div>
                                                                {funds[1] && <div className="text-xs text-slate-400 truncate max-w-[220px] mt-0.5" title={funds[1]?.scheme_name}>{funds[1]?.scheme_name}</div>}
                                                            </td>
                                                            <td className="px-5 py-3 text-right">
                                                                <div className="font-bold text-emerald-600">{funds[0]?.return ? `${funds[0].return}%` : '-'}</div>
                                                                {funds[1] && <div className="text-xs text-slate-400 mt-0.5">{funds[1]?.return ? `${funds[1].return}%` : '-'}</div>}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Calculation Results (Conditional) */}
                    {!showTopPerformers && comparisonResults.length > 0 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">

                            {/* Chart */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                                <h4 className="text-lg font-bold text-slate-800 mb-6">Performance Comparison (3Y)</h4>
                                <MfResultChart data={comparisonResults.map(s => ({ name: s.name.substring(0, 15) + '...', full: s.name, return: s.results['3Y'] || 0 }))} />
                            </div>

                            {/* Detailed Table */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                                    <h3 className="font-bold text-slate-800">Detailed Returns</h3>
                                    <div className="flex gap-2 text-xs">
                                        <button
                                            onClick={handleDownloadCSV}
                                            className="flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 rounded border border-slate-200 hover:bg-slate-200 transition-colors mr-2"
                                            title="Download Results as CSV"
                                        >
                                            <Download className="w-3 h-3" />
                                            CSV
                                        </button>
                                        <span className="flex items-center gap-1 px-2 py-1 bg-yellow-50 text-yellow-700 rounded border border-yellow-100">
                                            🏆 Consistent
                                        </span>
                                        <span className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded border border-blue-100">
                                            🏅 Emerging
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
                                            <tr>
                                                <th className="px-3 py-3 min-w-[180px]">Scheme</th>
                                                {PERIODS.map(p => <th key={p} className="px-2 py-3 text-center">{p}</th>)}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {comparisonResults.map(scheme => {
                                                const isConsistent = scheme.consistencyLabel === 'Consistent Performer';
                                                const isEmerging = scheme.consistencyLabel === 'Emerging Performer';

                                                return (
                                                    <tr
                                                        key={scheme.code}
                                                        className={`hover:bg-slate-50 transition-colors ${isConsistent ? 'bg-yellow-50/30' : isEmerging ? 'bg-blue-50/30' : ''}`}
                                                    >
                                                        <td className="px-3 py-3">
                                                            <div className="font-medium text-slate-800 text-sm">{scheme.name}</div>
                                                            {scheme.consistencyLabel && (
                                                                <div className={`text-[10px] font-bold mt-1 inline-block px-1.5 py-0.5 rounded border ${isConsistent ? 'text-yellow-700 border-yellow-200 bg-yellow-50' : 'text-blue-700 border-blue-200 bg-blue-50'}`}>
                                                                    {isConsistent ? '🏆 Consistent' : '🏅 Emerging'}
                                                                </div>
                                                            )}
                                                        </td>
                                                        {PERIODS.map(p => {
                                                            const val = scheme.results[p as keyof ReturnsData];

                                                            // Calculate max for this column if comparing > 1 scheme
                                                            let isMax = false;
                                                            if (comparisonResults.length > 1 && val !== undefined) {
                                                                const colValues = comparisonResults
                                                                    .map(s => s.results[p as keyof ReturnsData])
                                                                    .filter(v => v !== undefined) as number[];
                                                                if (colValues.length > 0) {
                                                                    const maxVal = Math.max(...colValues);
                                                                    isMax = val === maxVal;
                                                                }
                                                            }

                                                            return (
                                                                <td key={p} className={`px-2 py-3 text-center ${isMax ? 'bg-purple-50' : ''}`}>
                                                                    {val !== undefined ? (
                                                                        <span className={`font-semibold ${isMax ? 'text-purple-700 font-bold' : val >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                                                                            {val}%
                                                                        </span>
                                                                    ) : <span className="text-slate-300">-</span>}
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Legend/Info */}
                            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-sm text-slate-600">
                                <div className="flex items-start gap-3">
                                    <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                    <div className="space-y-2">
                                        <p><strong>Consistency Scoring:</strong> We analyze performance across multiple timeframes (1M to 10Y). <strong>Consistent Performers</strong> (Top 5%) show stable long-term growth, while <strong>Emerging Performers</strong> (Next 10%) demonstrate strong recent momentum.</p>
                                        <p className="text-xs text-slate-400">Returns are calculated based on NAV data. Past performance is not an indicator of future returns.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                    {/* Empty State / Initial Info */}
                    {!showTopPerformers && comparisonResults.length === 0 && !calculating && (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 p-12 border-2 border-dashed border-slate-200 rounded-2xl">
                            <TrendingUp className="w-12 h-12 mb-4 opacity-20" />
                            <p>Select schemes and click Calculate to view analysis</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
