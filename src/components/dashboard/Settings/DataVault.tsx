"use client";

import { DownloadCloud, UploadCloud, Trash2, AlertTriangle, FileJson, CheckCircle2 } from "lucide-react";
import { useState, useRef } from "react";
import { generateBackup, validateAndRestore, wipeData } from "@/lib/data-manager";

export default function DataVault() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleBackup = () => {
        try {
            const { blob, filename } = generateBackup();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            setMessage({ type: 'success', text: "Backup downloaded successfully!" });
        } catch (error) {
            setMessage({ type: 'error', text: "Failed to generate backup." });
        }
    };

    const handleRestoreClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!window.confirm("WARNING: This will overwrite your current dashboard data. This action cannot be undone. Are you sure?")) {
            e.target.value = ''; // Reset input
            return;
        }

        setIsLoading(true);
        setMessage(null);

        try {
            const result = await validateAndRestore(file);
            setMessage({ type: 'success', text: result.message });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            setMessage({
                type: 'error',
                text: error instanceof Error ? error.message : "Restore failed. Invalid file."
            });
            setIsLoading(false);
        }
        e.target.value = ''; // Reset input
    };

    const handleWipe = () => {
        const confirmed = window.confirm(
            "DANGER: This will PERMANENTLY DELETE all your financial data from this device. Are you absolutely sure?"
        );
        if (confirmed) {
            wipeData();
        }
    };

    return (
        <div className="space-y-6">
            {/* Status Message */}
            {message && (
                <div className={`p-4 rounded-lg flex items-center gap-2 text-sm font-medium animate-in fade-in slide-in-from-top-2 ${message.type === 'success'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                    {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                    {message.text}
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {/* Backup Card */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                            <DownloadCloud className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">Backup Data</h3>
                            <p className="text-sm text-slate-500">Export as JSON</p>
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-6">
                        Save a secure copy of your financial data to your device. Useful for switching devices.
                    </p>
                    <button
                        onClick={handleBackup}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <DownloadCloud className="w-4 h-4" />
                        Download Backup
                    </button>
                </div>

                {/* Restore Card */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                            <UploadCloud className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">Restore Data</h3>
                            <p className="text-sm text-slate-500">Import from JSON</p>
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-6">
                        Overwrite current data with a backup file.
                        <span className="text-amber-600 font-medium ml-1">Warning: Irreversible.</span>
                    </p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".json"
                        className="hidden"
                    />
                    <button
                        onClick={handleRestoreClick}
                        disabled={isLoading}
                        className="w-full py-2 px-4 border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <span className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <UploadCloud className="w-4 h-4" />
                        )}
                        {isLoading ? "Restoring..." : "Select Backup File"}
                    </button>
                </div>

                {/* Danger Zone */}
                <div className="bg-white rounded-xl border-2 border-red-100 shadow-sm p-6 hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Trash2 className="w-24 h-24 text-red-500" />
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-red-100 rounded-lg text-red-600">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-red-700">Danger Zone</h3>
                            <p className="text-sm text-red-500">Reset Everything</p>
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-6">
                        Permanently delete all data from this browser. This action cannot be undone.
                    </p>
                    <button
                        onClick={handleWipe}
                        className="w-full py-2 px-4 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <Trash2 className="w-4 h-4" />
                        Wipe All Data
                    </button>
                </div>
            </div>

            <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-start gap-3">
                    <FileJson className="w-5 h-5 text-slate-400 mt-0.5" />
                    <div className="space-y-1">
                        <h4 className="text-sm font-medium text-slate-900">How it works</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Your financial data is stored locally on this device. RupeeTools doesn't track or store your personal information on any server.
                            Use the <strong>Backup</strong> feature to move your data to another device or browser.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
