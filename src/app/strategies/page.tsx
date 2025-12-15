import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
    Orbit,
    Layers,
    Trophy,
    BarChart3,
    Dumbbell,
    Sparkles,
    ArrowRight
} from 'lucide-react';
import { STRATEGIES, Strategy } from '@/config/strategies';

export const metadata: Metadata = {
    title: "Wealth Strategies Hub | RupeeTools",
    description: "Explore proven investment frameworks used by professionals. Build, protect, and grow your wealth with systematic strategies.",
};

const ICON_MAP: Record<string, React.ElementType> = {
    'Orbit': Orbit,
    'Layers': Layers,
    'Trophy': Trophy,
    'BarChart3': BarChart3,
    'Dumbbell': Dumbbell,
    'Sparkles': Sparkles,
};

const COLOR_MAP = {
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'hover:border-indigo-300', iconBg: 'bg-indigo-100' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'hover:border-emerald-300', iconBg: 'bg-emerald-100' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'hover:border-amber-300', iconBg: 'bg-amber-100' },
    violet: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'hover:border-violet-300', iconBg: 'bg-violet-100' },
    cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'hover:border-cyan-300', iconBg: 'bg-cyan-100' },
    rose: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'hover:border-rose-300', iconBg: 'bg-rose-100' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'hover:border-blue-300', iconBg: 'bg-blue-100' }, // Fallback
};

const StrategiesPage = () => {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-20 bg-slate-50 border-b border-slate-100 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider mb-6">
                        Pro Tools
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        Wealth Strategies used by the Pros.
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Move beyond simple calculators. Adopt a proven framework to build, protect, and grow your wealth systematically.
                    </p>
                </div>
            </section>

            {/* Grid Section */}
            <section className="py-16 max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {STRATEGIES.map((strategy) => {
                        const Icon = ICON_MAP[strategy.icon] || BarChart3;
                        // Use type assertion to ensure TypeScript knows these keys exist
                        const theme = COLOR_MAP[strategy.colorTheme as keyof typeof COLOR_MAP] || COLOR_MAP.blue;

                        return (
                            <Link
                                key={strategy.id}
                                href={strategy.href}
                                className={`group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${theme.border}`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-3 rounded-xl ${theme.iconBg} ${theme.text}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex gap-2">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide 
                                            ${strategy.riskLevel === 'Low' ? 'bg-emerald-100 text-emerald-700' :
                                                strategy.riskLevel === 'High' ? 'bg-rose-100 text-rose-700' :
                                                    'bg-amber-100 text-amber-700'}`}>
                                            {strategy.riskLevel} Risk
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                                    {strategy.title}
                                </h3>

                                <p className="text-slate-500 mb-6 h-12 leading-snug">
                                    {strategy.description}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        Best For: {strategy.targetAudience}
                                    </span>
                                    <div className={`flex items-center gap-1 text-sm font-bold ${theme.text} group-hover:gap-2 transition-all`}>
                                        Explore <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </main>
    );
};

export default StrategiesPage;
