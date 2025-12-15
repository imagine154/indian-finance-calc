import React from 'react';
import Link from 'next/link';
import { Microscope, ArrowRight, LineChart } from 'lucide-react';

export const StrategyTools = () => {
    return (
        <div className="mt-12">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <LineChart className="w-5 h-5 text-indigo-600" />
                Execute this Strategy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                    href="/explore-mutual-funds"
                    className="group flex flex-col p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all no-underline"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-teal-50 rounded-lg text-teal-600 group-hover:bg-teal-100 transition-colors">
                            <Microscope className="w-6 h-6" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-1 group-hover:text-teal-700 transition-colors">Explore Mutual Funds</h4>
                        <p className="text-sm text-slate-500 line-clamp-2">
                            Filter and find the best direct mutual funds to build your portfolio.
                        </p>
                    </div>
                </Link>

                <Link
                    href="/calculators/sip-analyzer"
                    className="group flex flex-col p-6 bg-white rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all no-underline"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-50 rounded-lg text-purple-600 group-hover:bg-purple-100 transition-colors">
                            <LineChart className="w-6 h-6" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-1 group-hover:text-purple-700 transition-colors">SIP Analyzer</h4>
                        <p className="text-sm text-slate-500 line-clamp-2">
                            Check if your current monthly investments are enough to reach your goals.
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
};
