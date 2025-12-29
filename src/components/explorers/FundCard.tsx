import React from 'react';
import { Star, TrendingUp, Shield, Banknote } from 'lucide-react';
import { FUND_LOGOS, DEFAULT_LOGO } from '@/data/fund-logos';
import { InfoTooltip } from '../ui/InfoTooltip';

interface FundProps {
    fund: {
        name: string;
        amc: string;
        category: string;
        rating: number;
        risk: string;
        returns: {
            "1Y": number;
            "3Y": number;
            "5Y": number;
            "10Y"?: number;
            rolling?: number;
        };
        aum: number;
        managers: string[];
        benchmark?: string;
        alpha?: number;
    };
}

const FundCard: React.FC<FundProps> = ({ fund }) => {
    const logoSrc = FUND_LOGOS[fund.amc] || DEFAULT_LOGO;

    const getReturnColor = (value: number) => {
        if (value >= 15) return "text-emerald-600";
        if (value >= 0) return "text-blue-600";
        return "text-red-500";
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 flex-shrink-0 rounded-lg border border-slate-100 p-1 bg-white flex items-center justify-center overflow-hidden">
                    <img
                        src={logoSrc}
                        alt={`${fund.amc} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = DEFAULT_LOGO;
                        }}
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 leading-tight line-clamp-2 mb-1 h-10" title={fund.name}>
                        {fund.name}
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-full">
                            {fund.category}
                        </span>
                        {fund.rating > 0 && (
                            <div className="flex items-center bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-100">
                                <span className="text-xs font-bold text-amber-700 mr-1">{fund.rating}</span>
                                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            </div>
                        )}
                        {(!fund.returns["3Y"] || fund.returns["3Y"] === 0) && (
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-100 uppercase tracking-wider">
                                New
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Benchmark Display - kept separate for clarity */}
            {fund.benchmark && (
                <div className="flex items-center gap-1.5 mb-2 px-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Benchmark:</span>
                    <span className="text-xs font-medium text-slate-700 truncate" title={fund.benchmark}>
                        {fund.benchmark}
                        <InfoTooltip content="The standard index (like Nifty 50) used to measure the fund's performance." />
                    </span>
                </div>
            )}

            {/* Unified Metrics Grid (2x3) */}
            <div className="grid grid-cols-3 gap-y-3 gap-x-1 mb-4 bg-slate-50 rounded-lg p-2">
                {/* Row 1: Standard Returns */}
                <div className="text-center border-r border-slate-200 last:border-0">
                    <div className="text-xs text-slate-500 mb-1">1Y Return</div>
                    <div className={`font-bold text-xs ${getReturnColor(fund.returns["1Y"])}`}>
                        {fund.returns["1Y"].toFixed(1)}%
                    </div>
                </div>
                <div className="text-center border-r border-slate-200 last:border-0">
                    <div className="text-xs text-slate-500 mb-1">3Y Return</div>
                    <div className={`font-bold text-xs ${getReturnColor(fund.returns["3Y"])}`}>
                        {fund.returns["3Y"].toFixed(1)}%
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-xs text-slate-500 mb-1">5Y Return</div>
                    <div className={`font-bold text-xs ${getReturnColor(fund.returns["5Y"])}`}>
                        {fund.returns["5Y"].toFixed(1)}%
                    </div>
                </div>

                {/* Row 2: Advanced Metrics */}
                <div className="text-center border-r border-slate-200 last:border-0 pt-1 border-t border-slate-200/50">
                    <div className="text-xs text-slate-500 mb-1">10Y Return</div>
                    <div className="font-bold text-xs text-slate-700">
                        {fund.returns["10Y"] !== undefined ? `${fund.returns["10Y"].toFixed(1)}%` : '-'}
                    </div>
                </div>
                <div className="text-center border-r border-slate-200 last:border-0 pt-1 border-t border-slate-200/50">
                    <div className="text-xs text-slate-500 mb-1 flex items-center justify-center gap-1">
                        Alpha
                        <InfoTooltip content="The % outperformance of the fund over its benchmark. A positive Alpha indicates the fund manager added value." />
                    </div>
                    <div className={`font-bold text-xs ${fund.alpha !== undefined ? (fund.alpha >= 0 ? 'text-emerald-600' : 'text-red-500') : 'text-slate-700'}`}>
                        {fund.alpha !== undefined ? (
                            <>{fund.alpha > 0 ? '+' : ''}{fund.alpha.toFixed(2)}%</>
                        ) : '-'}
                    </div>
                </div>
                <div className="text-center pt-1 border-t border-slate-200/50">
                    <div className="text-xs text-slate-500 mb-1 flex items-center justify-center gap-1 whitespace-nowrap">
                        3Y Rolling
                        <InfoTooltip content="A measure of consistency. Average return for every 3-year holding period in history." />
                    </div>
                    <div className="font-bold text-xs text-slate-700">
                        {fund.returns.rolling !== undefined ? `${fund.returns.rolling.toFixed(1)}%` : '-'}
                    </div>
                </div>
            </div>

            {/* Stats & Tags */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Shield className="w-3.5 h-3.5" />
                        <span>{fund.risk} Risk</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Banknote className="w-3.5 h-3.5" />
                        <span>AUM: ₹{(fund.aum / 1000).toFixed(1)}k Cr</span>
                    </div>
                </div>

                {fund.managers.length > 0 && (
                    <div className="text-right max-w-[50%]">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Manager</div>
                        <div className="text-xs font-medium text-slate-700 truncate" title={fund.managers.join(", ")}>
                            {fund.managers[0]} {fund.managers.length > 1 && `+${fund.managers.length - 1}`}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FundCard;
