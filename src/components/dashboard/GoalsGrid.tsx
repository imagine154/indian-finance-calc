
import { useWealthStore, type SavedGoal } from '@/store/useWealthStore';
import { Target, TrendingUp, Calendar, Plus } from 'lucide-react';
import Link from 'next/link';

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};

export function GoalsGrid() {
    const goals = useWealthStore((state) => state.goals);

    if (!goals || goals.length === 0) {
        return (
            <div className="flex flex-col gap-6">
                <h3 className="text-xl font-semibold text-slate-800">My Financial Goals</h3>
                <div className="flex h-48 w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-6">
                    <div className="rounded-full bg-blue-100 p-4">
                        <Target className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="mt-4 text-sm font-medium text-slate-600">No goals set yet</p>
                    <Link href="/calculators/goal" className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                        Plan a new Goal
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-800">My Financial Goals</h3>
                <Link href="/calculators/goal" className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
                    <Plus size={16} />
                    <span>Add Goal</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {goals.map((goal) => (
                    <GoalCard key={goal.id} goal={goal} />
                ))}
            </div>
        </div>
    );
}

function GoalCard({ goal }: { goal: SavedGoal }) {
    const progress = Math.min(100, Math.max(0, (goal.currentAmount / goal.targetAmount) * 100));

    return (
        <div className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm border border-slate-100 transition-all hover:shadow-md">
            <div className="flex items-start justify-between">
                <div className="rounded-full bg-blue-50 p-2">
                    <TrendingUp size={18} className="text-blue-600" />
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                    {goal.type}
                </span>
            </div>

            <h4 className="mt-4 text-lg font-semibold text-slate-900">{goal.title}</h4>

            <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Progress</span>
                    <span className="font-medium text-slate-900">{progress.toFixed(0)}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                        className="h-full bg-blue-600 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>{formatCurrency(goal.currentAmount)}</span>
                    <span>Target: {formatCurrency(goal.targetAmount)}</span>
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-slate-50 pt-3 text-xs text-slate-400">
                <Calendar size={12} />
                <span>Target: {new Date(goal.deadline).toLocaleDateString()}</span>
            </div>
        </div>
    )
}
