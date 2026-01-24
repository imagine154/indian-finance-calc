import React from 'react';

type StockOverlap = {
    name: string;
    weightA: number;
    weightB: number;
};

type Props = {
    stocks: StockOverlap[];
    segmentAName: string;
    segmentBName: string;
};

export const CommonStocksTable: React.FC<Props> = ({ stocks, segmentAName, segmentBName }) => {
    if (stocks.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
                No common stocks found between these indices.
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
            <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-3 font-semibold">Stock Name</th>
                        <th scope="col" className="px-6 py-3 font-semibold text-right">
                            {segmentAName} Weight
                        </th>
                        <th scope="col" className="px-6 py-3 font-semibold text-right">
                            {segmentBName} Weight
                        </th>
                        <th scope="col" className="px-6 py-3 font-semibold text-right">
                            Overlap Contribution
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((stock, index) => {
                        const overlap = Math.min(stock.weightA, stock.weightB);
                        return (
                            <tr
                                key={index}
                                className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-0"
                            >
                                <td className="px-6 py-3 font-medium text-gray-900 border-r border-gray-100">
                                    {stock.name}
                                </td>
                                <td className="px-6 py-3 text-right">
                                    {stock.weightA.toFixed(2)}%
                                </td>
                                <td className="px-6 py-3 text-right border-l border-gray-100">
                                    {stock.weightB.toFixed(2)}%
                                </td>
                                <td className="px-6 py-3 text-right font-semibold text-blue-600 bg-blue-50/30">
                                    {overlap.toFixed(2)}%
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
