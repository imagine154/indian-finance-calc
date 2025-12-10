import React from 'react';
import { TrendingUp, Shield, Banknote } from 'lucide-react';
import { FUND_LOGOS, DEFAULT_LOGO } from '@/data/fund-logos';

interface UlipFundProps {
    fund: {
        name: string;
        amc: string;
        category: string;
        returns: {
            "1Y": number | null | undefined;
            "3Y": number | null | undefined;
            "5Y": number | null | undefined;
            "10Y": number | null | undefined;
            "Inception": number | null | undefined;
        };
    };
}

const UlipFundCard: React.FC<UlipFundProps> = ({ fund }) => {
    // Helper to get logo, strictly falling back to DEFAULT_LOGO
    const logoSrc = FUND_LOGOS[fund.amc] || DEFAULT_LOGO;

    const getReturnColor = (value: number | null | undefined) => {
        if (value === null || value === undefined) return "text-slate-400";
        if (value >= 15) return "text-emerald-600";
        if (value >= 0) return "text-blue-600";
        return "text-red-500";
    };

    const formatReturn = (value: number | null | undefined) => {
        return (value === null || value === undefined) ? "N/A" : `${value.toFixed(1)}%`;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
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
                    <h3 className="font-semibold text-slate-900 leading-tight line-clamp-2 mb-1" title={fund.name}>
                        {fund.name}
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-full">
                            {fund.category}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                            ULIP
                        </span>
                        {(!fund.returns["3Y"] || fund.returns["3Y"] === 0) && (
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-100 uppercase tracking-wider">
                                New
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Returns Grid */}
            <div className="grid grid-cols-4 gap-2 mb-3 bg-slate-50 rounded-lg p-3">
                <div className="text-center border-r border-slate-200 last:border-0">
                    <div className="text-[10px] text-slate-500 mb-1">1Y</div>
                    <div className={`font-bold text-sm ${getReturnColor(fund.returns["1Y"])}`}>
                        {formatReturn(fund.returns["1Y"])}
                    </div>
                </div>
                <div className="text-center border-r border-slate-200 last:border-0">
                    <div className="text-[10px] text-slate-500 mb-1">3Y</div>
                    <div className={`font-bold text-sm ${getReturnColor(fund.returns["3Y"])}`}>
                        {formatReturn(fund.returns["3Y"])}
                    </div>
                </div>
                <div className="text-center border-r border-slate-200 last:border-0">
                    <div className="text-[10px] text-slate-500 mb-1">5Y</div>
                    <div className={`font-bold text-sm ${getReturnColor(fund.returns["5Y"])}`}>
                        {formatReturn(fund.returns["5Y"])}
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-[10px] text-slate-500 mb-1">10Y</div>
                    <div className={`font-bold text-sm ${getReturnColor(fund.returns["10Y"])}`}>
                        {formatReturn(fund.returns["10Y"])}
                    </div>
                </div>
            </div>

            {/* Inception Return Row */}
            <div className="flex items-center justify-between px-3 py-2 bg-blue-50/50 rounded-lg mb-4 border border-blue-100/50">
                <span className="text-xs text-slate-500 font-medium">Since Inception</span>
                <span className={`font-bold text-sm ${getReturnColor(fund.returns["Inception"])}`}>
                    {formatReturn(fund.returns["Inception"])}
                </span>
            </div>

            {/* Stats & Tags (Reduced since we have less data for ULIPs) */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Banknote className="w-3.5 h-3.5" />
                        <span>{fund.amc}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UlipFundCard;
