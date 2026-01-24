import React, { useState } from 'react';
import { StockHolding } from '@/lib/etfDataUtils';
import { Search } from 'lucide-react';

type Props = {
    stocks: StockHolding[];
    segmentName: string;
};

export const SegmentHoldingsTable: React.FC<Props> = ({ stocks, segmentName }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAll, setShowAll] = useState(false);

    const filteredStocks = stocks.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayedStocks = showAll ? filteredStocks : filteredStocks.slice(0, 10);
    const hasMore = filteredStocks.length > 10;

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h4 className="font-semibold text-slate-800">
                    Constituents <span className="text-slate-500 font-normal">({stocks.length})</span>
                </h4>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search stocks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full sm:w-64"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-3 w-3/4">Stock Name</th>
                            <th className="px-6 py-3 text-right">Weight (%)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {displayedStocks.length > 0 ? (
                            displayedStocks.map((stock) => (
                                <tr key={stock.name} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-3 font-medium text-slate-700">
                                        {stock.name}
                                    </td>
                                    <td className="px-6 py-3 text-right font-mono text-slate-600">
                                        {stock.weight.toFixed(2)}%
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} className="px-6 py-8 text-center text-slate-500">
                                    No stocks found matching "{searchTerm}"
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {!showAll && hasMore && (
                <div className="p-3 border-t border-slate-100 text-center">
                    <button
                        onClick={() => setShowAll(true)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                    >
                        Show All {filteredStocks.length} Stocks
                    </button>
                </div>
            )}

            {showAll && (
                <div className="p-3 border-t border-slate-100 text-center">
                    <button
                        onClick={() => setShowAll(false)}
                        className="text-sm font-medium text-slate-500 hover:text-slate-700"
                    >
                        Show Less
                    </button>
                </div>
            )}
        </div>
    );
};
