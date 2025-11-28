'use client';

import { useState } from 'react';
import { SipCalculator } from './SipCalculator';
import { LumpsumCalculator } from './LumpsumCalculator';

export function SipLumpsumWrapper() {
    const [mode, setMode] = useState<'SIP' | 'Lumpsum'>('SIP');

    return (
        <div className="space-y-8">
            {/* Toggle Switch */}
            <div className="flex justify-center">
                <div className="bg-slate-100 p-1 rounded-xl inline-flex shadow-inner border border-slate-200">
                    <button
                        onClick={() => setMode('SIP')}
                        className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${mode === 'SIP'
                                ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200'
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        SIP Calculator
                    </button>
                    <button
                        onClick={() => setMode('Lumpsum')}
                        className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${mode === 'Lumpsum'
                                ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200'
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Lumpsum Calculator
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {mode === 'SIP' ? <SipCalculator /> : <LumpsumCalculator />}
            </div>
        </div>
    );
}
