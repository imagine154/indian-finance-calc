"use client";

import React, { useState, useMemo, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    Cell,
    PieChart,
    Pie,
    Sector,
    Legend
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, PieChart as PieChartIcon, BarChart2, Info, ArrowRight } from 'lucide-react';

interface AmfiSchemeData {
    name: string;
    category: string;
    inflow: number;
    outflow: number;
    netFlow: number;
    aum: number;
}

interface AmfiDashboardProps {
    data: AmfiSchemeData[];
}

// Vibrant Palette
const COLORS = [
    "#3b82f6", // Blue
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#ef4444", // Red
    "#8b5cf6", // Violet
    "#ec4899", // Pink
    "#06b6d4", // Cyan
    "#84cc16", // Lime
    "#f97316", // Orange
    "#6366f1", // Indigo
];

const CustomTooltip = ({ active, payload, separator }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-lg text-sm z-50">
                <p className="font-bold text-gray-800 mb-2">{data.name}</p>
                <div className="space-y-1">
                    {data.inflow !== undefined && (
                        <>
                            <p className="text-emerald-600">Inflow: ₹{data.inflow.toLocaleString()} Cr</p>
                            <p className="text-rose-600">Outflow: ₹{data.outflow.toLocaleString()} Cr</p>
                            <div className="border-t border-gray-100 my-1 pt-1">
                                <p className={`font-semibold ${data.netFlow >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                                    Net: {data.netFlow >= 0 ? '+' : ''}₹{data.netFlow.toLocaleString()} Cr
                                </p>
                            </div>
                        </>
                    )}
                    <p className="text-blue-600 font-medium mt-1">AUM: ₹{data.aum.toLocaleString()} Cr</p>
                </div>
            </div>
        );
    }
    return null;
};

// Custom Active Shape for Donut
const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

    return (
        <g>
            <text x={cx} y={cy} dy={-10} textAnchor="middle" fill="#374151" className="text-lg font-bold">
                {payload.name.length > 15 ? payload.name.substring(0, 12) + '..' : payload.name}
            </text>
            <text x={cx} y={cy} dy={15} textAnchor="middle" fill="#6b7280" className="text-sm">
                {`₹${(value / 1000).toFixed(1)}k Cr`}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 8}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={innerRadius - 4}
                outerRadius={innerRadius - 2}
                fill={fill}
            />
        </g>
    );
};



const SimpleTooltip = ({ children, content }: { children: React.ReactNode, content: string }) => {
    return (
        <div className="relative group">
            {children}
            <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap z-10 pointer-events-none shadow-md">
                {content}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
            </div>
        </div>
    );
};

export default function AmfiDashboard({ data }: AmfiDashboardProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [viewMode, setViewMode] = useState<'flow' | 'aum'>('flow');
    const [mounted, setMounted] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 1024); // lg breakpoint
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    // Compute Categories
    const categories = useMemo(() => {
        const cats = Array.from(new Set(data.map(d => d.category)));
        return ['All', ...cats.sort()];
    }, [data]);

    // Filter Data
    const filteredData = useMemo(() => {
        if (selectedCategory === 'All') return data;
        return data.filter(d => d.category === selectedCategory);
    }, [data, selectedCategory]);

    // Table Data (Simply sorted by AUM Desc)
    const tableData = useMemo(() => {
        return [...filteredData].sort((a, b) => b.aum - a.aum);
    }, [filteredData]);

    // Prepared AUM Data for Pie Chart
    const aumChartData = useMemo(() => {
        if (selectedCategory === 'All') {
            const grouped = data.reduce((acc, curr) => {
                const existing = acc.find(x => x.name === curr.category);
                if (existing) {
                    existing.aum += curr.aum;
                } else {
                    acc.push({ name: curr.category, aum: curr.aum });
                }
                return acc;
            }, [] as { name: string, aum: number }[]);
            return grouped.sort((a, b) => b.aum - a.aum);
        } else {
            // Sort by AUM
            const sorted = [...filteredData].sort((a, b) => b.aum - a.aum);
            if (sorted.length <= 9) return sorted;

            // Take top 8 and merge rest
            const top = sorted.slice(0, 8);
            const others = sorted.slice(8).reduce((sum, curr) => sum + curr.aum, 0);
            return [...top, { name: "Others", category: "Mixed", inflow: 0, outflow: 0, netFlow: 0, aum: others }];
        }
    }, [data, filteredData, selectedCategory]);


    // Summary Stats
    const summary = useMemo(() => {
        return filteredData.reduce((acc, curr) => ({
            inflow: acc.inflow + curr.inflow,
            outflow: acc.outflow + curr.outflow,
            net: acc.net + curr.netFlow,
        }), { inflow: 0, outflow: 0, net: 0 });
    }, [filteredData]);

    // Top Insights Generation
    const insights = useMemo(() => {
        if (filteredData.length === 0) return null;

        // Sort by Net Flow
        const sortedByNet = [...filteredData].sort((a, b) => b.netFlow - a.netFlow);
        const topGainer = sortedByNet[0];
        const topLoser = sortedByNet[sortedByNet.length - 1];

        // Category Level Aggregation (if showing All)
        const catAggregation = data.reduce((acc, curr) => {
            if (!acc[curr.category]) acc[curr.category] = 0;
            acc[curr.category] += curr.netFlow;
            return acc;
        }, {} as Record<string, number>);

        const bestCat = Object.entries(catAggregation).sort((a, b) => b[1] - a[1])[0];
        const worstCat = Object.entries(catAggregation).sort((a, b) => a[1] - b[1])[0];

        return {
            topGainer,
            topLoser,
            bestCat,
            worstCat
        };
    }, [filteredData, data]);


    const formatCr = (num: number) => `₹${Math.round(num).toLocaleString()} Cr`;

    if (!mounted) {
        return (
            <div className="w-full max-w-7xl mx-auto p-4 space-y-6 animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-[500px] bg-gray-200 rounded"></div>
            </div>
        )
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-4 space-y-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Activity className="w-6 h-6 text-blue-600" />
                        Mutual Fund Flows <span className="text-gray-400 font-light text-xl">(Nov 2025)</span>
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Data Source: AMFI Monthly Cumulative Report</p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-1 rounded-lg flex space-x-1">
                        <SimpleTooltip content="Net Flows View">
                            <button
                                onClick={() => setViewMode('flow')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'flow' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <BarChart2 className="w-4 h-4" />
                            </button>
                        </SimpleTooltip>
                        <SimpleTooltip content="Asset Allocation View">
                            <button
                                onClick={() => setViewMode('aum')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'aum' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <PieChartIcon className="w-4 h-4" />
                            </button>
                        </SimpleTooltip>
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => { setSelectedCategory(cat); setActiveIndex(0); }}
                        className={`px-4 py-1.5 text-sm rounded-full border transition-colors
                  ${selectedCategory === cat
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}
                `}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Inflow</p>
                    <p className="text-2xl font-bold text-emerald-600 mt-1 flex items-center gap-1">
                        <ArrowUpRight className="w-5 h-5" /> {formatCr(summary.inflow)}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Outflow</p>
                    <p className="text-2xl font-bold text-rose-600 mt-1 flex items-center gap-1">
                        <ArrowDownRight className="w-5 h-5" /> {formatCr(summary.outflow)}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Net Movement</p>
                    <p className={`text-2xl font-bold mt-1 flex items-center gap-1 ${summary.net >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {summary.net >= 0 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                        {formatCr(Math.abs(summary.net))}
                    </p>
                </div>
            </div>

            {/* Main Grid: Table + Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px] min-h-[800px] lg:min-h-0">

                {/* Left Table Panel */}
                <div className="order-2 lg:order-1 lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden h-[400px] lg:h-full">
                    <div className="p-3 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-700 text-sm">Top Assets ({selectedCategory})</h3>
                        <span className="text-xs text-gray-400">By size</span>
                    </div>

                    <div className="overflow-y-auto flex-1 p-0">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50 sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-2 font-medium">Scheme</th>
                                    <th className="px-4 py-2 font-medium text-right">AUM (Cr)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {tableData.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-800">
                                            {item.name}
                                            <div className="text-[10px] sm:hidden text-gray-400 font-normal">{item.category}</div>
                                        </td>
                                        <td className="px-4 py-3 text-right text-gray-600 font-mono">
                                            <div>{Math.round(item.aum).toLocaleString()}</div>
                                            <div className={`text-[10px] flex items-center justify-end gap-1 mt-1 ${item.netFlow >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                {item.netFlow >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                                <span>{formatCr(Math.abs(item.netFlow))}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {tableData.length === 0 && (
                                    <tr><td colSpan={2} className="p-4 text-center text-gray-400">No data available</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>


                {/* Right Chart Panel */}
                <div className="order-1 lg:order-2 lg:col-span-8 bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col h-[400px] lg:h-full">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                            {viewMode === 'flow' ? 'Net Flows by Scheme' : 'Asset Allocation (AUM)'}
                        </h3>
                        {viewMode === 'aum' && selectedCategory === 'All' && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Grouped by Category</span>
                        )}
                    </div>

                    <div className="flex-1 min-h-0">
                        {viewMode === 'flow' ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={filteredData}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        angle={-45}
                                        textAnchor="end"
                                        interval={0}
                                        tick={{ fontSize: 10, fill: '#6b7280' }}
                                        height={80}
                                    />
                                    <YAxis
                                        label={{ value: 'Net Flow (₹ Cr)', angle: -90, position: 'insideLeft', fontSize: 12 }}
                                        tickFormatter={(val) => `₹${val / 1000}k`}
                                    />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                                    <ReferenceLine y={0} stroke="#9ca3af" />
                                    <Bar dataKey="netFlow" radius={[4, 4, 0, 0]}>
                                        {filteredData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.netFlow >= 0 ? '#10b981' : '#f43f5e'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        // @ts-ignore
                                        activeIndex={activeIndex}
                                        activeShape={renderActiveShape}
                                        data={aumChartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={isMobile ? 60 : 100}
                                        outerRadius={isMobile ? 100 : 160}
                                        fill="#3b82f6"
                                        dataKey="aum"
                                        onMouseEnter={onPieEnter}
                                        paddingAngle={2}
                                    >
                                        {aumChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        formatter={(value, entry: any) => <span className="text-gray-600 text-xs ml-1">{value}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </div>

            {/* Insights Section */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2 mb-3">
                    <Info className="w-5 h-5" /> Market Insights
                </h3>
                <div className="space-y-2 text-blue-800 text-sm md:text-base leading-relaxed">
                    {selectedCategory === 'All' ? (
                        <>
                            <p>
                                The market overall is led by the <strong>{insights?.bestCat[0]}</strong> category, which saw the highest net inflow of
                                <span className="font-semibold text-emerald-700"> {formatCr(insights?.bestCat[1] || 0)}</span>.
                                Conversely, the <strong>{insights?.worstCat[0]}</strong> category faced the most pressure.
                            </p>
                            <p>
                                In terms of individual performance, <strong>{insights?.topGainer.name}</strong> emerged as the top favorite with inflows of {formatCr(insights?.topGainer.netFlow || 0)},
                                while <strong>{insights?.topLoser.name}</strong> saw the largest exits ({formatCr(insights?.topLoser.netFlow || 0)}).
                            </p>
                        </>
                    ) : (
                        <>
                            <p>
                                In the <strong>{selectedCategory}</strong> segment, the total net movement was
                                <span className={`font-semibold ${summary.net >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}> {formatCr(summary.net)}</span>.
                            </p>
                            <p>
                                <strong>{insights?.topGainer.name}</strong> was the top performer in this category with inflows of {formatCr(insights?.topGainer.netFlow || 0)}.
                                {insights?.topLoser.netFlow! < 0 && (
                                    <span> On the flip side, <strong>{insights?.topLoser.name}</strong> recorded significant redemptions of {formatCr(insights?.topLoser.netFlow || 0)}.</span>
                                )}
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">About this Data</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                    This dashboard visualizes the monthly <strong>Association of Mutual Funds in India (AMFI)</strong> data.
                    It tracks the flow of funds (Inflows vs Outflows) and the Net Assets Under Management (AUM) across various mutual fund categories
                    like Equity, Debt, and Hybrid funds. This data helps investors understand market sentiment—whether the broader market is buying (positive net flow)
                    or selling (negative net flow) specific categories of funds.
                </p>
                <p className="text-gray-500 text-xs mt-3">
                    Source: AMFI Monthly Cumulative Report (Nov 2025). Taking informed investment decisions requires analyzing long-term trends alongside monthly data.
                </p>
            </div>

            {/* Related Tools */}
            <div className="pt-6 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Explore Related Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="/explore-mutual-funds" className="group p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all flex items-start gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <ArrowRight className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">Explore Mutual Funds</h4>
                            <p className="text-sm text-gray-500 mt-1">Discover, filter, and analyze over 1500+ mutual fund schemes in India.</p>
                        </div>
                    </a>
                    <a href="/calculators/sip" className="group p-4 bg-white rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-md transition-all flex items-start gap-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
                            <ArrowUpRight className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">SIP Calculator</h4>
                            <p className="text-sm text-gray-500 mt-1">Plan your systematic investments and visualize your wealth growth.</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
