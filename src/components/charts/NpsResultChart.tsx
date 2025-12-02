'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

interface NpsPieChartProps {
    data: any[];
    formatCurrencyFull: (value: number) => string;
    formatCurrency: (value: number) => string;
    totalCorpus: number;
}

export const NpsPieChart = ({ data, formatCurrencyFull, formatCurrency, totalCorpus }: NpsPieChartProps) => {
    return (
        <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrencyFull(value)} />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <span className="text-xs text-slate-400 block">Total</span>
                <span className="text-sm font-bold text-slate-700">{formatCurrency(totalCorpus)}</span>
            </div>
        </div>
    );
};

interface NpsAreaChartProps {
    data: any[];
    formatCurrencyFull: (value: number) => string;
}

export const NpsAreaChart = ({ data, formatCurrencyFull }: NpsAreaChartProps) => {
    return (
        <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorNpsInterest" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorNpsInvested" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="age" hide />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748B', fontSize: 10 }}
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
                    <Area type="monotone" dataKey="balance" name="Corpus" stroke="#10B981" fillOpacity={1} fill="url(#colorNpsInterest)" strokeWidth={2} />
                    <Area type="monotone" dataKey="invested" name="Invested" stroke="#3B82F6" fillOpacity={1} fill="url(#colorNpsInvested)" strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
