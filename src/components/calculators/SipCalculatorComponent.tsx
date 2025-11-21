/**
 * Example React Component for SIP Calculator
 * This demonstrates how to use the pure logic from core/logic/sip.ts
 */

'use client';

import { useState } from 'react';
import { calculateSIP, type SipResult } from '@/core/logic/sip';

export function SipCalculatorComponent() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [annualRate, setAnnualRate] = useState(12);
    const [years, setYears] = useState(10);
    const [result, setResult] = useState<SipResult | null>(null);

    const handleCalculate = () => {
        const calculationResult = calculateSIP(monthlyInvestment, annualRate, years);
        setResult(calculationResult);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">SIP Calculator</h2>

                {/* Input Section */}
                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Monthly Investment (₹)
                        </label>
                        <input
                            type="number"
                            value={monthlyInvestment}
                            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Expected Return Rate (% per annum)
                        </label>
                        <input
                            type="number"
                            value={annualRate}
                            onChange={(e) => setAnnualRate(Number(e.target.value))}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            step="0.1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Investment Duration (Years)
                        </label>
                        <input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        onClick={handleCalculate}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Calculate
                    </button>
                </div>

                {/* Results Section */}
                {result && (
                    <div className="border-t pt-6">
                        <h3 className="text-xl font-semibold mb-4">Results</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-600">Total Investment</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    ₹{result.totalInvestment.toLocaleString('en-IN')}
                                </p>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-600">Estimated Returns</p>
                                <p className="text-2xl font-bold text-green-600">
                                    ₹{result.estimatedReturns.toLocaleString('en-IN')}
                                </p>
                            </div>

                            <div className="bg-purple-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-600">Total Value</p>
                                <p className="text-2xl font-bold text-purple-600">
                                    ₹{result.totalValue.toLocaleString('en-IN')}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
