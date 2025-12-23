'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { useWealthStore, selectNetWorth } from '@/store/useWealthStore';
import { calculateWealthProjection } from '@/lib/projections';
import { TrendingUp } from 'lucide-react';


// Indian Currency Formatter (Compact: 1.2Cr, 50L)
const formatCompactCurrency = (value: number) => {
    if (value >= 10000000) {
        return `₹${(value / 10000000).toFixed(1)}Cr`;
    }
    if (value >= 100000) {
        return `₹${(value / 100000).toFixed(0)}L`;
    }
    return `₹${(value / 1000).toFixed(0)}k`;
};

// Full Currency Formatter for Tooltip
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};

// Custom Tooltip Component
interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-xl border border-slate-100 bg-white/80 p-4 shadow-xl backdrop-blur-md">
                <p className="mb-1 text-xs font-medium text-slate-500">{label}</p>
                <div className="flex items-baseline gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                    <span className="text-lg font-bold text-slate-900">
                        {formatCurrency(payload[0].value as number)}
                    </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">
                    Invested: {formatCurrency(payload[0].payload.invested)}
                </p>
            </div>
        );
    }
    return null;
};

// Helper for Input display (e.g. "₹5.00 L")
const formatHelperCurrency = (value: number) => {
    if (value >= 10000000) {
        return `₹ ${(value / 10000000).toFixed(2)} Cr`;
    }
    if (value >= 100000) {
        return `₹ ${(value / 100000).toFixed(2)} L`;
    }
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(value);
};

export function WealthTimeline() {
    const netWorth = useWealthStore(selectNetWorth);
    const goals = useWealthStore((state) => state.goals);

    // Local State for projection parameters
    const [monthlySip, setMonthlySip] = useState(25000);
    const [returnRate, setReturnRate] = useState(12);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Generate Projection Data
    const data = useMemo(() => {
        return calculateWealthProjection(netWorth, monthlySip, returnRate, 15);
    }, [netWorth, monthlySip, returnRate]);

    if (!isMounted) return <div className="h-72 w-full animate-pulse rounded-3xl bg-slate-100" />;

    return (
        <div className="w-full rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
            {/* Header / Controls */}
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <TrendingUp size={18} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Wealth Timeline</h2>
                        <p className="text-xs text-slate-500">Project your financial freedom</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-start gap-2">
                        <label className="font-medium text-slate-600 mt-2">Simulated SIP:</label>
                        <div className="flex flex-col gap-1">
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
                                <input
                                    type="number"
                                    step="500"
                                    value={monthlySip}
                                    onChange={(e) => setMonthlySip(Number(e.target.value))}
                                    className="w-32 rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-6 pr-2 text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <span className="ml-1 text-[10px] font-medium text-slate-500">
                                {formatHelperCurrency(monthlySip)}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="font-medium text-slate-600">Return:</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={returnRate}
                                onChange={(e) => setReturnRate(Number(e.target.value))}
                                className="w-24 rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-3 pr-6 text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart Area */}
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="year"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            hide={true}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                        <Area
                            type="monotone"
                            dataKey="amount"
                            stroke="#3B82F6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorWealth)"
                            animationDuration={1500}
                        />

                        {/* Goal Reference Lines */}
                        {goals.map((goal) => {
                            const goalYear = new Date(goal.deadline).getFullYear();
                            // Only show if within our projection range
                            if (goalYear >= data[0].year && goalYear <= data[data.length - 1].year) {
                                return (
                                    <ReferenceLine
                                        key={goal.id}
                                        x={goalYear}
                                        stroke="#ef4444"
                                        strokeDasharray="3 3"
                                    >
                                        <Label
                                            value={goal.title}
                                            position="top"
                                            fill="#ef4444"
                                            fontSize={11}
                                            fontWeight={500}
                                            offset={10}
                                        />
                                    </ReferenceLine>
                                );
                            }
                            return null;
                        })}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
