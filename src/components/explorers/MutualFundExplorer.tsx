"use client";

import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowDownUp, Loader2, Info } from 'lucide-react';
import FundCard from './FundCard';
import ManagerCard from './ManagerCard';
import mutualFundsData from '@/data/mutual-funds.json';

// Define types based on our JSON structure
interface Fund {
    name: string;
    slug: string;
    amc: string;
    category: string;
    subCategory: string;
    rating: number;
    risk: string;
    returns: {
        "1Y": number;
        "3Y": number;
        "5Y": number;
    };
    expenseRatio: number;
    aum: number;
    nav: number;
    minSip: number;
    managers: string[];
}

interface ManagerStats {
    name: string;
    amc: string;
    avgReturn3Y: number;
    totalFunds: number;
    funds: Array<{
        name: string;
        return3Y: number;
    }>;
}

const ITEMS_PER_PAGE = 20;

const MutualFundExplorer = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"all" | "top" | "rated" | "managers">("all");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>("All");
    const [selectedRisk, setSelectedRisk] = useState<string>("All");
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [sortBy, setSortBy] = useState<"rating" | "1Y" | "3Y" | "5Y">("3Y");

    // Extract unique categories and risks for filters
    const categories = useMemo(() => {
        const cats = new Set(mutualFundsData.map(f => f.category));
        return ["All", ...Array.from(cats).sort()];
    }, []);

    // Extract sub-categories based on selected category
    const subCategories = useMemo(() => {
        let funds = mutualFundsData;
        if (selectedCategory !== "All") {
            funds = funds.filter(f => f.category === selectedCategory);
        }
        const subs = new Set(funds.map(f => f.subCategory));
        return ["All", ...Array.from(subs).sort()];
    }, [selectedCategory]);

    const risks = useMemo(() => {
        const rs = new Set(mutualFundsData.map(f => f.risk));
        return ["All", ...Array.from(rs).sort()];
    }, []);

    // Manager Logic
    const managersData = useMemo(() => {
        const managerMap = new Map<string, { totalReturn: number; count: number; funds: any[]; amc: string }>();

        mutualFundsData.forEach((fund) => {
            // Only consider funds with valid 3Y returns for consistency score
            if (fund.returns["3Y"] !== 0) {
                fund.managers.forEach((managerName) => {
                    if (!managerMap.has(managerName)) {
                        managerMap.set(managerName, { totalReturn: 0, count: 0, funds: [], amc: fund.amc });
                    }
                    const entry = managerMap.get(managerName)!;
                    entry.totalReturn += fund.returns["3Y"];
                    entry.count += 1;
                    entry.funds.push({ name: fund.name, return3Y: fund.returns["3Y"] });
                });
            }
        });

        const managers: ManagerStats[] = [];
        managerMap.forEach((value, key) => {
            // Filter out managers with very few funds if needed, but for now show all with valid data
            if (value.count > 0) {
                managers.push({
                    name: key,
                    amc: value.amc,
                    avgReturn3Y: value.totalReturn / value.count,
                    totalFunds: value.count,
                    funds: value.funds.sort((a, b) => b.return3Y - a.return3Y)
                });
            }
        });

        return managers.sort((a, b) => b.avgReturn3Y - a.avgReturn3Y);
    }, []);

    // Filter Logic
    const filteredItems = useMemo(() => {
        if ((activeTab as string) === "managers") {
            let managers = managersData;
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                managers = managers.filter(m => m.name.toLowerCase().includes(query));
            }
            return managers;
        }

        let funds = mutualFundsData as Fund[];

        // 1. Search Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            funds = funds.filter(f =>
                f.name.toLowerCase().includes(query) ||
                f.amc.toLowerCase().includes(query)
            );
        }

        // 2. Category Filter
        if (selectedCategory !== "All") {
            funds = funds.filter(f => f.category === selectedCategory);
        }

        // 3. Sub Category Filter
        if (selectedSubCategory !== "All") {
            funds = funds.filter(f => f.subCategory === selectedSubCategory);
        }

        // 4. Risk Filter
        if (selectedRisk !== "All") {
            funds = funds.filter(f => f.risk === selectedRisk);
        }

        // 5. Tab Logic & Sorting
        switch (activeTab) {
            case "top":
                // Returns > 20% in 3Y
                funds = funds.filter(f => f.returns["3Y"] > 20);
                break;
            case "rated":
                // 4+ Stars
                funds = funds.filter(f => f.rating >= 4);
                break;
        }

        // Apply Sorting
        funds.sort((a, b) => {
            switch (sortBy) {
                case "1Y":
                    return b.returns["1Y"] - a.returns["1Y"];
                case "3Y":
                    return b.returns["3Y"] - a.returns["3Y"];
                case "5Y":
                    return b.returns["5Y"] - a.returns["5Y"];
                case "rating":
                default:
                    // Default: Rating desc, then 3Y returns
                    return b.rating - a.rating || b.returns["3Y"] - a.returns["3Y"];
            }
        });

        return funds;
    }, [searchQuery, selectedCategory, selectedSubCategory, selectedRisk, activeTab, managersData, sortBy]);

    const visibleItems = filteredItems.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + ITEMS_PER_PAGE);
    };

    return (
        <div className="space-y-6">
            {/* Header & Search Section */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">

                {/* Tabs */}
                <div className="flex p-1 bg-slate-100 rounded-xl overflow-x-auto max-w-full no-scrollbar">
                    {[
                        { id: "all", label: "All Funds" },
                        { id: "top", label: "Top Performers" },
                        { id: "rated", label: "Highly Rated" },
                        { id: "managers", label: "Best Managers" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id as any);
                                setVisibleCount(ITEMS_PER_PAGE); // Reset pagination on tab change
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder={(activeTab as string) === "managers" ? "Search managers..." : "Search funds or AMCs..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                </div>
            </div>

            {/* Filters Bar - Hide for Managers tab for now as filters are fund specific */}
            {(activeTab as string) !== "managers" && (
                <div className="flex flex-wrap gap-3 items-center bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 text-sm text-slate-500 mr-2 pl-1">
                        <Filter className="w-4 h-4" />
                        <span className="font-medium">Filters:</span>
                    </div>

                    {/* Category Filter */}
                    <div className="relative">
                        <select
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setSelectedSubCategory("All"); // Reset sub-category on category change
                            }}
                            className="appearance-none pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer transition-colors"
                        >
                            {categories.map(c => <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>)}
                        </select>
                        <ArrowDownUp className="w-3 h-3 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Sub Category Filter */}
                    <div className="relative">
                        <select
                            value={selectedSubCategory}
                            onChange={(e) => setSelectedSubCategory(e.target.value)}
                            className="appearance-none pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer transition-colors max-w-[160px] truncate"
                        >
                            {subCategories.map(c => <option key={c} value={c}>{c === "All" ? "All Sub-Cats" : c}</option>)}
                        </select>
                        <ArrowDownUp className="w-3 h-3 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Risk Filter */}
                    <div className="relative">
                        <select
                            value={selectedRisk}
                            onChange={(e) => setSelectedRisk(e.target.value)}
                            className="appearance-none pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer transition-colors"
                        >
                            {risks.map(r => <option key={r} value={r}>{r === "All" ? "All Risk Levels" : r}</option>)}
                        </select>
                        <ArrowDownUp className="w-3 h-3 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <div className="w-px h-6 bg-slate-200 mx-2 hidden sm:block"></div>

                    {/* Sort By */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500 font-medium hidden sm:block">Sort by:</span>
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="appearance-none pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer transition-colors font-medium"
                            >
                                <option value="rating">Highest Rated</option>
                                <option value="1Y">1Y Returns</option>
                                <option value="3Y">3Y Returns</option>
                                <option value="5Y">5Y Returns</option>
                            </select>
                            <ArrowDownUp className="w-3 h-3 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>

                    <div className="ml-auto text-sm text-slate-500">
                        Showing <span className="font-semibold text-slate-900">{visibleItems.length}</span> of {filteredItems.length} {(activeTab as string) === "managers" ? "managers" : "funds"}
                    </div>
                </div>
            )}

            {/* Helper Note for Managers Tab */}
            {activeTab === "managers" && (
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    <span>Hover over a manager's card to see the list of funds they manage.</span>
                </div>
            )}

            {/* Grid */}
            {visibleItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {activeTab === "managers" ? (
                        (visibleItems as ManagerStats[]).map((manager, index) => (
                            <ManagerCard key={`${manager.name}-${index}`} manager={manager} />
                        ))
                    ) : (
                        (visibleItems as Fund[]).map((fund, index) => (
                            <FundCard key={`${fund.slug}-${index}`} fund={fund} />
                        ))
                    )}
                </div>
            ) : (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <div className="text-slate-400 mb-2">No results found matching your criteria</div>
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedCategory("All");
                            setSelectedRisk("All");
                        }}
                        className="text-blue-600 text-sm font-medium hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            )}

            {/* Load More */}
            {visibleItems.length < filteredItems.length && (
                <div className="flex justify-center pt-8 pb-4">
                    <button
                        onClick={handleLoadMore}
                        className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-full shadow-sm transition-all"
                    >
                        Load More {activeTab === "managers" ? "Managers" : "Funds"}
                        <ArrowDownUp className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default MutualFundExplorer;
