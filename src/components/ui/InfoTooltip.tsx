"use client";

import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface InfoTooltipProps {
    content: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ content }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className="relative inline-flex items-center ml-1 z-10"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            <Info className="w-3.5 h-3.5 text-slate-400 hover:text-blue-500 cursor-help transition-colors" />

            {isVisible && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded-lg shadow-xl animate-in fade-in zoom-in-95 duration-200 z-50">
                    {content}
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                </div>
            )}
        </div>
    );
};
