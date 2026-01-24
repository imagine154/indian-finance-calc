'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

type Props = {
    overlapScore: number;
    segmentAName: string;
    segmentBName: string;
    countA: number;
    countB: number;
    commonCount: number;
};

export const OverlapVisualizer: React.FC<Props> = ({
    overlapScore,
    segmentAName,
    segmentBName,
    countA,
    countB,
    commonCount
}) => {
    // Simple intersection Venn-like representation using simple circles or just a progress bar as requested.
    // Requested: "Venn Diagram representation (using 2 circles overlapping) OR a clear Progress Bar".
    // A progress bar is clearer calculate and render accurately for % overlap.
    // Using a circular progress bar (RadialBar) or simply a linear one.
    // Let's do a nice linear progress bar + summary stats.

    const formattedScore = overlapScore.toFixed(1);
    const isHighOverlap = overlapScore > 70;
    const isMediumOverlap = overlapScore > 30;

    const colorClass = isHighOverlap ? 'bg-green-500' : isMediumOverlap ? 'bg-blue-500' : 'bg-amber-500';
    const textColorClass = isHighOverlap ? 'text-green-600' : isMediumOverlap ? 'text-blue-600' : 'text-amber-600';

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                {/* Score Section */}
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Portfolio Overlap
                    </h2>
                    <div className={`text-5xl font-bold ${textColorClass} mb-2`}>
                        {formattedScore}%
                    </div>
                    <p className="text-gray-600 text-sm">
                        Based on the intersection of underlying holdings by weight.
                    </p>
                </div>

                {/* Visual Bar Section */}
                <div className="flex-[2] w-full">
                    <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2">
                        <span>Distinct</span>
                        <span>Overlap</span>
                        <span>Distinct</span>
                    </div>
                    <div className="h-6 w-full bg-gray-100 rounded-full overflow-hidden flex">
                        {/* We can visualize this as: Segment A Unique | Overlap | Segment B Unique
                 But pure overlap % is easier to just show as a progress bar from 0 to 100% match.
             */}
                        <div
                            className={`h-full ${colorClass} transition-all duration-1000 ease-out`}
                            style={{ width: `${overlapScore}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                        <span>0% Similarity</span>
                        <span>100% Similarity</span>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="flex-1 flex flex-col gap-2 min-w-[200px]">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-100">
                        <span className="text-xs font-medium text-gray-600 truncate max-w-[100px]" title={segmentAName}>{segmentAName}</span>
                        <span className="text-sm font-bold text-gray-900">{countA} Stocks</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-100">
                        <span className="text-xs font-medium text-gray-600 truncate max-w-[100px]" title={segmentBName}>{segmentBName}</span>
                        <span className="text-sm font-bold text-gray-900">{countB} Stocks</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-blue-50 border border-blue-100 rounded">
                        <span className="text-xs font-medium text-blue-700">Common</span>
                        <span className="text-sm font-bold text-blue-800">{commonCount} Stocks</span>
                    </div>
                </div>

            </div>
        </div>
    );
};
