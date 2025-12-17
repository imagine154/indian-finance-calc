
import { useState } from 'react';
import { useWealthStore, type SavedGoal } from '@/store/useWealthStore';
import { PlusCircle, Check, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface SaveToDashboardProps {
    type: 'SIP' | 'Lumpsum' | 'RD' | 'PPF' | 'Goal';
    defaultTitle: string;
    targetAmount: number;
    currentAmount: number; // For SIP/RD this might be monthly investment, for Lumpsum it's principal
    years: number;
}

export function SaveToDashboard({
    type,
    defaultTitle,
    targetAmount,
    currentAmount,
    years,
}: SaveToDashboardProps) {
    const addGoal = useWealthStore((state) => state.addGoal);

    const [isOpen, setIsOpen] = useState(false);
    const [goalName, setGoalName] = useState(defaultTitle);
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        // Calculate deadline
        const deadlineDate = new Date();
        deadlineDate.setFullYear(deadlineDate.getFullYear() + years);

        const newGoal: SavedGoal = {
            id: crypto.randomUUID(),
            title: goalName,
            targetAmount,
            currentAmount, // Note: In a real app we might want to track current accumulated vs target. For now we store input.
            deadline: deadlineDate.toISOString(),
            type: type === 'SIP' || type === 'RD' ? 'SIP' : 'Lumpsum', // Mapping to store types
        };

        addGoal(newGoal);
        setIsSaved(true);
        setIsOpen(false);
    };

    if (isSaved) {
        return (
            <div className="flex items-center gap-3 animate-in fade-in duration-300">
                <button
                    disabled
                    className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 cursor-default"
                >
                    <Check size={18} />
                    Saved to Dashboard
                </button>
                <Link
                    href="/dashboard"
                    className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                    View
                    <ArrowRight size={14} />
                </Link>
            </div>
        );
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-transparent px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-blue-200 hover:bg-blue-50 active:scale-95"
            >
                <PlusCircle size={18} />
                Track this Goal
            </button>

            {/* Simple Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
                    <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900">Save Goal</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-full p-1 text-slate-400 hover:bg-slate-100"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="mt-4 space-y-4">
                            <div>
                                <label className="mb-1 block text-xs font-medium text-slate-500">Goal Name</label>
                                <input
                                    type="text"
                                    value={goalName}
                                    onChange={(e) => setGoalName(e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
                                <p>Target: <strong>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(targetAmount)}</strong></p>
                                <p>Deadline: {years} Years</p>
                            </div>

                            <button
                                onClick={handleSave}
                                className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95"
                            >
                                Confirm Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
