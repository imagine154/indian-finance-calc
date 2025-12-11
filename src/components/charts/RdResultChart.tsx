'use client';

import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend
} from 'recharts';

interface RdResultChartProps {
    data: any[];
    formatCurrency: (value: number) => string;
}

const RdResultChart = ({ data, formatCurrency }: RdResultChartProps) => {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                        dataKey="year"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#64748b' }}
                        tickFormatter={(value) => `${value}y`}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#64748b' }}
                        tickFormatter={(value) => `₹${value >= 100000 ? (value / 100000).toFixed(1) + 'L' : value / 1000 + 'k'}`}
                    />
                    <RechartsTooltip
                        cursor={{ stroke: '#0d9488', strokeWidth: 1, strokeDasharray: '4 4' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: number) => [formatCurrency(value), '']}
                        labelFormatter={(label) => `Year ${label}`}
                    />
                    <Legend iconType="circle" />
                    <Area
                        type="monotone"
                        dataKey="investedAmount"
                        stroke="#0d9488"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorInvested)"
                        name="Invested Amount"
                        stackId="1"
                    />
                    <Area
                        type="monotone"
                        dataKey="interestEarned"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorInterest)"
                        name="Interest Earned"
                        stackId="1"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RdResultChart;
