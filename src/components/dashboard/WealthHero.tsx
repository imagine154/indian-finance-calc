import { type WealthState, selectNetWorth, selectTotalAssets, selectTotalLiabilities } from '@/store/useWealthStore';
import { useWealthStore } from '@/store/useWealthStore';
import { ArrowUpRight, ArrowDownRight, RefreshCcw, Pencil, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { EditWealthModal } from './EditWealthModal';

// Format currency helper
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};

export function WealthHero() {
    const assets = useWealthStore(selectTotalAssets);
    const liabilities = useWealthStore(selectTotalLiabilities);
    const netWorth = useWealthStore(selectNetWorth);

    const [showValues, setShowValues] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <>
            <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-xl transition-all hover:shadow-2xl">
                {/* Background Shapes for visual interest */}
                <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-indigo-500/30 blur-2xl" />

                <div className="relative z-10 flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-blue-100">
                            <span className="text-sm font-medium uppercase tracking-wider">Total Net Worth</span>
                            <button
                                onClick={() => setShowValues(!showValues)}
                                className="rounded-full p-1 hover:bg-white/10 transition-colors"
                            >
                                {showValues ? <Eye size={14} /> : <EyeOff size={14} />}
                            </button>
                        </div>
                        <button
                            onClick={() => setShowEditModal(true)}
                            className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-md transition-colors hover:bg-white/30"
                        >
                            <Pencil size={14} />
                            <span>Update</span>
                        </button>
                    </div>

                    {/* Main Number */}
                    <div>
                        <h1 className="text-4xl font-bold md:text-6xl tracking-tight">
                            {showValues ? formatCurrency(netWorth) : '••••••••'}
                        </h1>
                        <p className="mt-2 text-sm text-blue-200">
                            {netWorth >= 0 ? 'Your wealth is growing!' : 'Let\'s work on reducing those liabilities.'}
                        </p>
                    </div>

                    {/* Breakdown Stats */}
                    <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6 mt-2">
                        {/* Assets */}
                        <div className="flex flex-col gap-1">
                            <p className="text-xs text-blue-200">Total Assets</p>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-semibold">
                                    {showValues ? formatCurrency(assets) : '••••••'}
                                </span>
                                <span className="flex items-center rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-xs text-emerald-100">
                                    <ArrowUpRight size={12} />
                                </span>
                            </div>
                        </div>

                        {/* Liabilities */}
                        <div className="flex flex-col gap-1">
                            <p className="text-xs text-blue-200">Total Liabilities</p>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-semibold">
                                    {showValues ? formatCurrency(liabilities) : '••••••'}
                                </span>
                                <span className="flex items-center rounded-full bg-rose-500/20 px-1.5 py-0.5 text-xs text-rose-100">
                                    <ArrowDownRight size={12} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <EditWealthModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} />
        </>
    );
}
