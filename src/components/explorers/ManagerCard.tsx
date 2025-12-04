import React from 'react';
import { TrendingUp, Award, Briefcase, Info } from 'lucide-react';
import { FUND_LOGOS, DEFAULT_LOGO } from '@/data/fund-logos';

interface ManagerProps {
    manager: {
        name: string;
        amc: string;
        avgReturn3Y: number;
        totalFunds: number;
        funds: Array<{
            name: string;
            return3Y: number;
        }>;
    };
}

const ManagerCard: React.FC<ManagerProps> = ({ manager }) => {
    const logoSrc = FUND_LOGOS[manager.amc] || DEFAULT_LOGO;

    const getReturnColor = (value: number) => {
        if (value >= 15) return "text-emerald-600";
        if (value >= 0) return "text-blue-600";
        return "text-red-500";
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 relative group h-[180px] hover:shadow-md transition-all duration-200 overflow-hidden">
            {/* Main Content (Visible by default) */}
            <div className="p-5 flex flex-col h-full justify-between relative z-0">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex-shrink-0 rounded-lg border border-slate-100 p-1 bg-white flex items-center justify-center overflow-hidden">
                            <img
                                src={logoSrc}
                                alt={`${manager.amc} logo`}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = DEFAULT_LOGO;
                                }}
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 leading-tight text-lg">
                                {manager.name}
                            </h3>
                            <div className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                                <Briefcase className="w-3.5 h-3.5" />
                                <span>
                                    Manages {manager.totalFunds} {manager.totalFunds === 1 ? 'Fund' : 'Funds'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-end justify-between mt-auto">
                    <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Consistency Score</div>
                        <div className={`font-bold text-2xl ${getReturnColor(manager.avgReturn3Y)}`}>
                            {manager.avgReturn3Y.toFixed(1)}%
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">Avg 3Y Return</div>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 opacity-60">
                        <Info className="w-3 h-3" />
                        Hover for details
                    </div>
                </div>
            </div>

            {/* Hover Overlay (Visible on hover) */}
            <div className="absolute inset-0 bg-white/95 backdrop-blur-sm p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 overflow-y-auto flex flex-col">
                <div className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider flex items-center gap-1 sticky top-0 bg-white/95 py-1 border-b border-slate-100">
                    <Award className="w-3 h-3" />
                    Managed Funds ({manager.totalFunds})
                </div>
                <div className="space-y-2 overflow-y-auto custom-scrollbar">
                    {manager.funds.map((fund, idx) => (
                        <div key={idx} className="flex justify-between items-start text-sm border-b border-slate-50 last:border-0 pb-2 last:pb-0">
                            <span className="text-slate-700 font-medium text-xs leading-snug flex-1 pr-2">
                                {fund.name}
                            </span>
                            <span className={`font-bold text-xs whitespace-nowrap ${getReturnColor(fund.return3Y)}`}>
                                {fund.return3Y.toFixed(1)}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManagerCard;
