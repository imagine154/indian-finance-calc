import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { CsvUploader } from './CsvUploader';
import { Holding, HoldingType, STCG_RATE, LTCG_RATE, LTCG_EXEMPTION } from '@/lib/tax-harvesting';

interface HarvestingInputProps {
    realizedSTCG: number;
    setRealizedSTCG: (val: number) => void;
    realizedLTCG: number;
    setRealizedLTCG: (val: number) => void;
    holdings: Holding[];
    setHoldings: (val: Holding[]) => void;
}

export function HarvestingInput({
    realizedSTCG,
    setRealizedSTCG,
    realizedLTCG,
    setRealizedLTCG,
    holdings,
    setHoldings
}: HarvestingInputProps) {

    // Local state for new row input
    const [newStock, setNewStock] = useState('');
    const [newQty, setNewQty] = useState('');
    const [newPnL, setNewPnL] = useState('');
    const [newType, setNewType] = useState<HoldingType>('STCG');

    const handleAddHolding = () => {
        if (!newStock || !newQty || !newPnL) return;

        const qty = parseInt(newQty);
        const pnl = parseFloat(newPnL);

        // Validate: PnL should be negative for "Losers" list, but let's allow user to enter whatever, 
        // though the prompt calls it "The Losers List". 
        // If they enter positive PnL, our logic just ignores it for harvesting.
        // Let's enforce negative for UX clarity or just accept it. 
        // Since input is "Unrealized P&L", it could be positive. 
        // But the context is "Tax Harvester". Let's allow any, but logic filters.

        const newHolding: Holding = {
            id: Math.random().toString(36).substr(2, 9),
            name: newStock,
            quantity: qty,
            unrealizedPnL: pnl,
            type: newType
        };

        setHoldings([...holdings, newHolding]);

        // Reset inputs
        setNewStock('');
        setNewQty('');
        setNewPnL('');
    };

    const removeHolding = (id: string) => {
        setHoldings(holdings.filter(h => h.id !== id));
    };

    const handleCsvDataLoaded = (newHoldings: Holding[]) => {
        setHoldings([...holdings, ...newHoldings]);
    };

    // Calculate quick tax summary for display
    const taxableSTCG = Math.max(0, realizedSTCG);
    const taxableLTCG = Math.max(0, realizedLTCG - LTCG_EXEMPTION);
    const estimatedTax = (taxableSTCG * STCG_RATE) + (taxableLTCG * LTCG_RATE);

    // Compact currency formatter (Lakhs/Crores)
    const formatCurrencyCompact = (val: number) => {
        if (val === 0) return '₹0';

        const absVal = Math.abs(val);
        if (absVal >= 10000000) { // 1 Crore
            return `₹${(val / 10000000).toFixed(2)} Cr`;
        } else if (absVal >= 100000) { // 1 Lakh
            return `₹${(val / 100000).toFixed(2)} L`;
        } else {
            return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
        }
    };

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

    return (
        <div className="space-y-8">
            {/* Step 1: Realized Gains */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">Step 1: Your Realized Gains</h2>
                        <p className="text-sm text-slate-500">Enter gains you have already booked this financial year.</p>
                    </div>
                    <div className="bg-blue-50 px-4 py-2 rounded-lg text-right">
                        <p className="text-xs text-blue-600 font-medium uppercase tracking-wider">Current Tax Bill</p>
                        <p className="text-xl font-bold text-blue-700">{formatCurrency(estimatedTax)}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-700">Realized Short Term Gains (STCG)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-3 text-slate-400 text-xl font-medium">₹</span>
                            <input
                                type="number"
                                step="1000"
                                value={realizedSTCG || ''}
                                onChange={(e) => setRealizedSTCG(parseFloat(e.target.value) || 0)}
                                placeholder="0"
                                className="w-full pl-10 pr-4 py-3 text-2xl font-bold text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300"
                            />
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <p className="text-slate-500 font-medium">Taxed at 20% flat.</p>
                            <p className="text-slate-700 font-bold">{formatCurrencyCompact(realizedSTCG || 0)}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-700">Realized Long Term Gains (LTCG)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-3 text-slate-400 text-xl font-medium">₹</span>
                            <input
                                type="number"
                                step="1000"
                                value={realizedLTCG || ''}
                                onChange={(e) => setRealizedLTCG(parseFloat(e.target.value) || 0)}
                                placeholder="0"
                                className="w-full pl-10 pr-4 py-3 text-2xl font-bold text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300"
                            />
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <p className="text-slate-500 font-medium">First ₹1.25L exempt, then 12.5%.</p>
                            <p className="text-slate-700 font-bold">{formatCurrencyCompact(realizedLTCG || 0)}</p>
                        </div>
                    </div>
                </div>
            </div>



            {/* Step 2: Losers List */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900 mb-1">Step 2: Add Loss-Making Holdings</h2>
                        <p className="text-sm text-slate-500">
                            Add stocks from your portfolio manually or upload a CSV.
                        </p>
                    </div>
                    <CsvUploader onDataLoaded={handleCsvDataLoaded} />
                </div>

                {/* Input Row */}
                <div className="grid grid-cols-12 gap-3 items-end mb-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="col-span-12 md:col-span-3 space-y-1">
                        <label className="text-xs font-medium text-slate-600">Stock Name</label>
                        <input
                            type="text"
                            value={newStock}
                            onChange={(e) => setNewStock(e.target.value)}
                            placeholder="e.g. Tata Motors"
                            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="col-span-6 md:col-span-2 space-y-1">
                        <label className="text-xs font-medium text-slate-600">Quantity</label>
                        <input
                            type="number"
                            step="1"
                            value={newQty}
                            onChange={(e) => setNewQty(e.target.value)}
                            placeholder="100"
                            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="col-span-6 md:col-span-3 space-y-1">
                        <label className="text-xs font-medium text-slate-600">Unrealized P&L (-ve)</label>
                        <input
                            type="number"
                            step="100"
                            value={newPnL}
                            onChange={(e) => setNewPnL(e.target.value)}
                            placeholder="-5000"
                            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none text-red-600"
                        />
                    </div>
                    <div className="col-span-6 md:col-span-3 space-y-1">
                        <label className="text-xs font-medium text-slate-600">Type</label>
                        <select
                            value={newType}
                            onChange={(e) => setNewType(e.target.value as HoldingType)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                        >
                            <option value="STCG">Short Term</option>
                            <option value="LTCG">Long Term</option>
                        </select>
                    </div>
                    <div className="col-span-6 md:col-span-1">
                        <button
                            onClick={handleAddHolding}
                            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Holdings List */}
                {holdings.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-600 font-medium">
                                <tr>
                                    <th className="px-4 py-3 rounded-l-lg">Stock</th>
                                    <th className="px-4 py-3">Qty</th>
                                    <th className="px-4 py-3">Unrealized P&L</th>
                                    <th className="px-4 py-3">Type</th>
                                    <th className="px-4 py-3 rounded-r-lg text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {holdings.map((h) => (
                                    <tr key={h.id} className="hover:bg-slate-50/50">
                                        <td className="px-4 py-3 font-medium text-slate-900">{h.name}</td>
                                        <td className="px-4 py-3 text-slate-600">{h.quantity}</td>
                                        <td className={`px-4 py-3 font-medium ${h.unrealizedPnL < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                            {formatCurrency(h.unrealizedPnL)}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${h.type === 'STCG' ? 'bg-orange-100 text-orange-800' : 'bg-purple-100 text-purple-800'
                                                }`}>
                                                {h.type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() => removeHolding(h.id)}
                                                className="text-slate-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-8 text-slate-400 bg-slate-50/50 rounded-lg border border-dashed border-slate-200">
                        No holdings added yet. Add your loss-making stocks above.
                    </div>
                )}
            </div>
        </div>
    );
}
