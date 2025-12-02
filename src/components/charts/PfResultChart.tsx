'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PfResultChartProps {
    data: any[];
    formatCurrencyFull: (value: number) => string;
}

const PfResultChart = ({ data, formatCurrencyFull }: PfResultChartProps) => {
    return (
        <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis
                        dataKey="age"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748B', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748B', fontSize: 12 }}
                        tickFormatter={(val) => `${val / 100000}L`}
                    />
                    <Tooltip
                        cursor={{ stroke: '#94A3B8', strokeWidth: 1, strokeDasharray: '4 4' }}
                        content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="bg-white p-3 rounded-xl shadow-lg border border-slate-100">
                                        <p className="text-slate-900 font-bold mb-2 text-base">Age: {label}</p>
                                        <div className="space-y-1">
                                            {payload.map((entry: any, index: number) => (
                                                <div key={index} className="flex items-center gap-3 text-sm">
                                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                                    <span className="text-slate-500">{entry.name}:</span>
                                                    <span className="font-bold text-slate-900">{formatCurrencyFull(entry.value)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                    <Area
                        type="monotone"
                        dataKey="balance"
                        name="Total Corpus"
                        stroke="#10B981"
                        fillOpacity={1}
                        fill="url(#colorInterest)"
                        strokeWidth={2}
                    />
                    <Area
                        type="monotone"
                        dataKey="invested"
                        name="Invested Amount"
                        stroke="#3B82F6"
                        fillOpacity={1}
                        fill="url(#colorInvested)"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PfResultChart;
