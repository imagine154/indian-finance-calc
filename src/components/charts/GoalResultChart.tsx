'use client';

import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Line
} from 'recharts';

interface GoalResultChartProps {
    data: any[];
    formatCurrency: (value: number) => string;
}

const GoalResultChart = ({ data, formatCurrency }: GoalResultChartProps) => {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorSip" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorCorpus" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                        dataKey="year"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#64748b' }}
                        tickFormatter={(value) => `Y${value}`}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#64748b' }}
                        tickFormatter={(value) => `₹${value / 100000}L`}
                    />
                    <RechartsTooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: number) => [formatCurrency(value), '']}
                    />
                    <Area
                        type="monotone"
                        dataKey="existingCorpusValue"
                        stackId="1"
                        stroke="#94a3b8"
                        fill="url(#colorCorpus)"
                        name="Existing Assets"
                    />
                    <Area
                        type="monotone"
                        dataKey="sipValue"
                        stackId="1"
                        stroke="#4f46e5"
                        fill="url(#colorSip)"
                        name="New SIP Growth"
                    />
                    <Line
                        type="monotone"
                        dataKey="targetLine"
                        stroke="#ef4444"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                        name="Target Goal"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GoalResultChart;
