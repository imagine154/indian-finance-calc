
import { useWealthStore } from '@/store/useWealthStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useMemo } from 'react';

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};

export function AssetAllocationChart() {
    const assets = useWealthStore((state) => state.assets);

    const data = useMemo(() => {
        return [
            { name: 'Mutual Funds', value: assets.mutualFunds, color: '#3B82F6' }, // Blue
            { name: 'Stocks', value: assets.stocks, color: '#6366F1' },       // Indigo
            { name: 'Gold', value: assets.gold, color: '#EAB308' },          // Yellow
            { name: 'Real Estate', value: assets.realEstate, color: '#10B981' }, // Emerald
            { name: 'Bank / Cash', value: assets.bank, color: '#64748B' },    // Slate
            { name: 'Crypto', value: assets.crypto, color: '#F97316' },      // Orange
            { name: 'EPF / PPF', value: assets.epf, color: '#8B5CF6' },      // Violet
        ].filter(item => item.value > 0);
    }, [assets]);

    const total = data.reduce((acc, curr) => acc + curr.value, 0);

    if (total === 0) {
        return (

            <div className="flex h-64 w-full flex-col items-center justify-center rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
                <p className="text-slate-400">No assets allocated yet.</p>
            </div>
        )
    }

    return (
        <div className="flex h-96 w-full flex-col rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Asset Allocation</h3>
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                            cornerRadius={4}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number) => formatCurrency(value)}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
