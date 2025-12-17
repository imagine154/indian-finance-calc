
import { useState, useEffect } from 'react';
import { useWealthStore, type Assets, type Liabilities } from '@/store/useWealthStore';
import { X, Save, IndianRupee } from 'lucide-react';

interface EditWealthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function EditWealthModal({ isOpen, onClose }: EditWealthModalProps) {
    const storeAssets = useWealthStore((state) => state.assets);
    const storeLiabilities = useWealthStore((state) => state.liabilities);
    const updateAsset = useWealthStore((state) => state.updateAsset);
    const updateLiability = useWealthStore((state) => state.updateLiability);

    const [activeTab, setActiveTab] = useState<'assets' | 'liabilities'>('assets');

    // Local state for form handling
    const [localAssets, setLocalAssets] = useState<Assets>(storeAssets);
    const [localLiabilities, setLocalLiabilities] = useState<Liabilities>(storeLiabilities);

    // Sync local state when modal opens
    useEffect(() => {
        if (isOpen) {
            setLocalAssets(storeAssets);
            setLocalLiabilities(storeLiabilities);
        }
    }, [isOpen, storeAssets, storeLiabilities]);

    const handleSave = () => {
        // Batch update assets
        Object.entries(localAssets).forEach(([key, value]) => {
            updateAsset(key as keyof Assets, Number(value));
        });

        // Batch update liabilities
        Object.entries(localLiabilities).forEach(([key, value]) => {
            updateLiability(key as keyof Liabilities, Number(value));
        });

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200 scale-100">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                    <h2 className="text-lg font-semibold text-slate-900">Update Finances</h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-slate-400 hover:bg-slate-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-100">
                    <button
                        onClick={() => setActiveTab('assets')}
                        className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'assets'
                            ? 'border-b-2 border-blue-600 text-blue-600'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Assets
                    </button>
                    <button
                        onClick={() => setActiveTab('liabilities')}
                        className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'liabilities'
                            ? 'border-b-2 border-rose-600 text-rose-600'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Liabilities
                    </button>
                </div>

                {/* Form Body - Scrollable */}
                <div className="max-h-[60vh] overflow-y-auto p-6">
                    {activeTab === 'assets' ? (
                        <div className="space-y-4">
                            <p className="text-sm text-slate-500 mb-4">
                                Enter the current market value of your assets.
                            </p>
                            {Object.keys(localAssets).map((key) => (
                                <CurrencyInput
                                    key={key}
                                    label={formatLabel(key)}
                                    value={localAssets[key as keyof Assets]}
                                    onChange={(val) => setLocalAssets(prev => ({ ...prev, [key]: val }))}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-sm text-slate-500 mb-4">
                                Enter the outstanding balance of your loans/liabilities.
                            </p>
                            {Object.keys(localLiabilities).map((key) => (
                                <CurrencyInput
                                    key={key}
                                    label={formatLabel(key)}
                                    value={localLiabilities[key as keyof Liabilities]}
                                    onChange={(val) => setLocalLiabilities(prev => ({ ...prev, [key]: val }))}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
                    <button
                        onClick={onClose}
                        className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 active:scale-95 transition-all"
                    >
                        <Save size={16} />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

// Helper Components & Functions

function formatLabel(key: string) {
    // Convert camelCase to Title Case (e.g., mutualFunds -> Mutual Funds)
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
}

interface CurrencyInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
}

function CurrencyInput({ label, value, onChange }: CurrencyInputProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase text-slate-500">
                {label}
            </label>
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <IndianRupee size={16} />
                </div>
                <input
                    type="number"
                    value={value === 0 ? '' : value}
                    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
            </div>
        </div>
    );
}
