"use client";

import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowDownUp, Info } from 'lucide-react';
import UlipFundCard from './UlipFundCard';
import ulipSchemes from '@/data/ulip_schemes.json';
import ulipReturns from '@/data/ulip_returns.json';

// Define types
interface UlipFund {
    name: string;
    amc: string;
    category: string;
    returns: {
        "1Y": number | null;
        "3Y": number | null;
        "5Y": number | null;
        "10Y": number | null;
        "Inception": number | null;
    };
}

const ITEMS_PER_PAGE = 20;

const UlipExplorer = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAmc, setSelectedAmc] = useState<string>("All");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [sortBy, setSortBy] = useState<"1Y" | "3Y" | "5Y" | "10Y" | "Inception">("3Y");
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    // Merge Data
    const allFunds = useMemo(() => {
        return ulipSchemes.map((scheme) => {
            const returnsData = (ulipReturns as any)[scheme.name] || {
                "1Y": null,
                "3Y": null,
                "5Y": null,
                "10Y": null,
                "Inception": null
            };
            return {
                ...scheme,
                returns: returnsData
            } as UlipFund;
        });
    }, []);

    // Extract unique AMCs and Categories for filters
    const amcs = useMemo(() => {
        const set = new Set(allFunds.map(f => f.amc));
        return ["All", ...Array.from(set).sort()];
    }, [allFunds]);

    const categories = useMemo(() => {
        const set = new Set(allFunds.map(f => f.category));
        return ["All", ...Array.from(set).sort()];
    }, [allFunds]);

    // Filter Logic
    const filteredItems = useMemo(() => {
        let funds = allFunds;

        // 1. Search Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            funds = funds.filter(f =>
                f.name.toLowerCase().includes(query) ||
                f.amc.toLowerCase().includes(query)
            );
        }

        // 2. AMC Filter
        if (selectedAmc !== "All") {
            funds = funds.filter(f => f.amc === selectedAmc);
        }

        // 3. Category Filter
        if (selectedCategory !== "All") {
            funds = funds.filter(f => f.category === selectedCategory);
        }

        // 4. Sorting
        funds = [...funds].sort((a, b) => { // Create a copy to avoid mutating original array
            const valA = a.returns[sortBy] || -9999;
            const valB = b.returns[sortBy] || -9999;
            return valB - valA;
        });

        return funds;
    }, [searchQuery, selectedAmc, selectedCategory, sortBy, allFunds]);

    const visibleItems = filteredItems.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + ITEMS_PER_PAGE);
    };

    return (
        <div className="space-y-6">
            {/* Header & Search Section */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">

                {/* Search */}
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search funds or insurers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                </div>

                <div className="hidden md:block text-sm text-slate-500">
                    Exploring <span className="font-bold text-slate-900">{allFunds.length}</span> ULIP Funds
                </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-wrap gap-3 items-center bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 text-sm text-slate-500 mr-2 pl-1">
                    <Filter className="w-4 h-4" />
                    <span className="font-medium">Filters:</span>
                </div>

                {/* AMC Filter */}
                <div className="relative">
                    <select
                        value={selectedAmc}
                        onChange={(e) => setSelectedAmc(e.target.value)}
                        className="appearance-none pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer transition-colors max-w-[200px] truncate"
                    >
                        {amcs.map(c => <option key={c} value={c}>{c === "All" ? "All Insurers" : c}</option>)}
                    </select>
                    <ArrowDownUp className="w-3 h-3 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Category Filter */}
                <div className="relative">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="appearance-none pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer transition-colors"
                    >
                        {categories.map(c => <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>)}
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
                            <option value="3Y">3Y Returns</option>
                            <option value="1Y">1Y Returns</option>
                            <option value="5Y">5Y Returns</option>
                            <option value="10Y">10Y Returns</option>
                            <option value="Inception">Inception</option>
                        </select>
                        <ArrowDownUp className="w-3 h-3 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                </div>

                <div className="ml-auto text-sm text-slate-500">
                    Showing <span className="font-semibold text-slate-900">{visibleItems.length}</span> of {filteredItems.length} funds
                </div>
            </div>

            {/* Grid */}
            {visibleItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {visibleItems.map((fund, index) => (
                        <UlipFundCard key={`${fund.name}-${index}`} fund={fund} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <div className="text-slate-400 mb-2">No results found matching your criteria</div>
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedAmc("All");
                            setSelectedCategory("All");
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
                        Load More Funds
                        <ArrowDownUp className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default UlipExplorer;
