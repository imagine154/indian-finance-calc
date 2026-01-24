'use client';

import React, { useState, useMemo } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import {
    getSegmentList,
    getSegmentData,
    calculateOverlap,
} from '@/lib/etfDataUtils';
import { OverlapVisualizer } from '@/components/etf/OverlapVisualizer';
import { CommonStocksTable } from '@/components/etf/CommonStocksTable';
import { EtfSegmentList } from '@/components/etf/EtfSegmentList';
import { SegmentHoldingsTable } from '@/components/etf/SegmentHoldingsTable';
import { RefreshCcw, Search, BarChart3, ListFilter, Info, CheckCircle2 } from 'lucide-react';

export default function EtfOverlapClient() {
    const [activeTab, setActiveTab] = useState<'overlap' | 'etfs'>('overlap');

    // -- Overlap Tab State --
    const segmentList = getSegmentList();
    const [selectedSegmentA, setSelectedSegmentA] = useState<string>('ETF - Nifty 50');
    const [selectedSegmentB, setSelectedSegmentB] = useState<string>('ETF - BSE Sensex');

    const overlapData = useMemo(() => {
        if (selectedSegmentA && selectedSegmentB && selectedSegmentA !== selectedSegmentB) {
            return calculateOverlap(selectedSegmentA, selectedSegmentB);
        }
        return null;
    }, [selectedSegmentA, selectedSegmentB]);

    // -- ETF List Tab State --
    const [listSegment, setListSegment] = useState<string>('');
    const etfListData = useMemo(() => {
        if (!listSegment) return null;
        return getSegmentData(listSegment);
    }, [listSegment]);


    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader title="ETF Portfolio Overlap" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-8">

                    {/* Main Tool Container */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

                        {/* Tabs Header */}
                        <div className="border-b border-gray-200 bg-white px-6 pt-6">
                            <div className="flex gap-8">
                                <button
                                    onClick={() => setActiveTab('overlap')}
                                    className={`pb-4 px-1 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'overlap'
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                        }`}
                                >
                                    <BarChart3 className="w-4 h-4" />
                                    Check Overlap
                                </button>
                                <button
                                    onClick={() => setActiveTab('etfs')}
                                    className={`pb-4 px-1 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'etfs'
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                        }`}
                                >
                                    <ListFilter className="w-4 h-4" />
                                    ETFs by Segment
                                </button>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 min-h-[500px]">
                            {activeTab === 'overlap' ? (
                                <div className="space-y-10 animate-in fade-in duration-300">

                                    {/* Controls */}
                                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-end">
                                        <div className="relative z-20">
                                            <SearchableDropdown
                                                options={segmentList}
                                                value={selectedSegmentA}
                                                onChange={setSelectedSegmentA}
                                                label="Select First Segment"
                                                placeholder="e.g. Nifty 50"
                                                colorTheme="blue"
                                            />
                                        </div>

                                        <div className="flex justify-center pb-3">
                                            <div className="bg-slate-100 p-2 rounded-full text-slate-400 hidden md:block">
                                                <RefreshCcw className="w-5 h-5" />
                                            </div>
                                            <span className="md:hidden text-slate-400 text-xs py-2 uppercase tracking-widest font-semibold">Vs</span>
                                        </div>

                                        <div className="relative z-10">
                                            <SearchableDropdown
                                                options={segmentList}
                                                value={selectedSegmentB}
                                                onChange={setSelectedSegmentB}
                                                label="Select Second Segment"
                                                placeholder="e.g. Nifty Next 50"
                                                colorTheme="amber"
                                            />
                                        </div>
                                    </div>

                                    {/* VISUALIZATION AND TABLE */}
                                    {overlapData ? (
                                        <>
                                            <OverlapVisualizer
                                                overlapScore={overlapData.overlapScore}
                                                segmentAName={selectedSegmentA}
                                                segmentBName={selectedSegmentB}
                                                countA={overlapData.countA}
                                                countB={overlapData.countB}
                                                commonCount={overlapData.commonStocks.length}
                                            />

                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                                    Common Holdings
                                                    <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                                        {overlapData.commonStocks.length} Stocks
                                                    </span>
                                                </h3>
                                                <CommonStocksTable
                                                    stocks={overlapData.commonStocks}
                                                    segmentAName={selectedSegmentA}
                                                    segmentBName={selectedSegmentB}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
                                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                                <Search className="w-8 h-8 opacity-40" />
                                            </div>
                                            <h3 className="text-lg font-medium text-slate-600 mb-1">Check Portfolio Overlap</h3>
                                            <p className="text-sm">Select two different segments above to analyze their intersection.</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-8 animate-in fade-in duration-300">
                                    {/* ETF List Tab */}
                                    <div className="max-w-md relative z-20">
                                        <SearchableDropdown
                                            options={segmentList}
                                            value={listSegment}
                                            onChange={setListSegment}
                                            label="Select Market Segment"
                                            placeholder="Choose an index to view ETFs..."
                                            colorTheme="blue"
                                        />
                                    </div>

                                    {etfListData ? (
                                        <div>
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-xl font-bold text-slate-900">
                                                    Available ETFs
                                                </h3>
                                                <div className="text-sm text-slate-500">
                                                    Showing results for <span className="font-medium text-slate-900">{listSegment}</span>
                                                </div>
                                            </div>
                                            <EtfSegmentList
                                                etfs={etfListData.etfs}
                                                segmentName={listSegment}
                                            />

                                            <div className="pt-8 border-t border-slate-100">
                                                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                                    Current Holdings
                                                    <span className="text-sm font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                                        {listSegment}
                                                    </span>
                                                </h3>
                                                <SegmentHoldingsTable
                                                    stocks={etfListData.stocks}
                                                    segmentName={listSegment}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
                                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                                <ListFilter className="w-8 h-8 opacity-40" />
                                            </div>
                                            <h3 className="text-lg font-medium text-slate-600 mb-1">Browse ETFs</h3>
                                            <p className="text-sm">Select a segment to view all available ETFs in that category.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* About / Info Section */}
                    <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Info className="w-6 h-6 text-blue-600" />
                            About this Tool
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <p className="mb-4">
                                The <strong>ETF Intersection Analyzer</strong> helps investors build a diversified portfolio by identifying the overlap between different Indices or ETF segments.
                                Many investors unknowingly buy multiple funds that hold the same stocks, leading to concentration risk rather than diversification.
                            </p>

                            <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-4">Why Check Overlap?</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900">True Diversification</h4>
                                        <p className="text-sm mt-1">Ensure your funds are actually different. Holding Nifty 50 and Nifty 100 together results in ~85% overlap.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900">Optimize Allocation</h4>
                                        <p className="text-sm mt-1">Find complementary segments (e.g., Nifty 50 + Midcap 150) that have little to no overlap.</p>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-4">How is Overlap Calculated?</h3>
                            <p className="text-sm bg-slate-50 p-4 rounded-lg border border-slate-100">
                                We calculate the "intersection weight" of common stocks.
                                Formula: <code>Sum(Minimum(Weight in A, Weight in B))</code> for all common stocks.
                                <br />
                                <em>Example: If HDFC Bank is 9% in Fund A and 5% in Fund B, the overlap contribution is 5%.</em>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
