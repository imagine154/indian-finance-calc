
"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
    FileLock,
    ShieldCheck,
    AlertTriangle,
    Upload,
    Loader2,
    CheckCircle2,
    PieChart as PieChartIcon,
    Banknote
} from "lucide-react";
import { parseCasPdf, PortfolioSummary } from "@/lib/cas-parser-client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#FFBB28", "#FF8042", "#00C49F"];

export const CasAnalyzer = () => {
    const [file, setFile] = useState<File | null>(null);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<PortfolioSummary | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            setError(null);
            setResult(null);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "application/pdf": [".pdf"] },
        multiple: false,
    });

    const handleAnalyze = async () => {
        if (!file) return;
        if (!password) {
            setError("Please enter the PDF password (usually your PAN or DOB).");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const summary = await parseCasPdf(file, password);
            // Basic validation if parsing returned empty
            if (summary.funds.length === 0) {
                setError("Could not detect any funds. Ensure this is a standard CAMS/KFintech CAS statement.");
                setResult(null);
            } else {
                setResult(summary);
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to parse PDF. Please ensure password is correct.";

            // Only log actual crashes, not validation errors
            if (!message.match(/(Detailed CAS|Password)/)) {
                console.error("CAS Parse Error:", err);
            }
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    const chartData = result ? [
        { name: 'Direct Plans', value: result.directValue },
        { name: 'Regular Plans', value: result.regularValue }
    ] : [];

    return (
        <div className="w-full max-w-4xl mx-auto p-4 space-y-8">

            {/* Header Section */}

            {/* Upload and Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transition-all">
                {!result ? (
                    <div className="space-y-6">
                        <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${isDragActive
                                ? "border-teal-500 bg-teal-50"
                                : "border-gray-300 hover:border-teal-400"
                                }`}
                        >
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center gap-4">
                                <div className="p-4 bg-teal-100 rounded-full">
                                    <Upload className="w-8 h-8 text-teal-600" />
                                </div>
                                <div>
                                    {file ? (
                                        <p className="text-teal-700 font-semibold text-lg">
                                            {file.name}
                                        </p>
                                    ) : (
                                        <>
                                            <p className="text-gray-700 font-medium text-lg">
                                                Drop your Summary CAS PDF here
                                            </p>
                                            <p className="text-xs text-gray-400 mt-2">
                                                (Must contain &quot;Consolidated Account Summary&quot; header)
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                or click to browse
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    PDF Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="PAN (lowercase) or DOB (ddmmyyyy)"
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleAnalyze();
                                        }
                                    }}
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Required to unlock the PDF. Press <strong>Enter</strong> to analyze.
                                </p>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handleAnalyze}
                                disabled={loading || !file || !password}
                                className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-lg font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Decrypting & Analyzing...
                                    </>
                                ) : (
                                    "Analyze Portfolio"
                                )}
                            </button>
                        </div>

                        {/* FAQ Section */}
                        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 space-y-2">
                            <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-2">
                                How to get your CAS?
                            </h4>
                            <p>
                                You can download your <strong>Consolidated Account Statement (CAS)</strong> for free from the official registrars:
                            </p>
                            <ul className="pl-5 space-y-1 list-disc text-teal-700 font-medium">
                                <li>
                                    <a href="https://mfs.kfintech.com/investor/General/ConsolidatedAccountStatement" target="_blank" rel="noreferrer" className="hover:underline hover:text-teal-800">
                                        KFintech CAS
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.camsonline.com/Investors/Statements/Consolidated-Account-Statement" target="_blank" rel="noreferrer" className="hover:underline hover:text-teal-800">
                                        CAMS CAS
                                    </a>
                                </li>
                            </ul>
                            <p className="text-xs text-gray-500 pt-2">
                                * Select <strong>&quot;Summary&quot;</strong> as the statement type (Detailed CAS is not supported).
                            </p>
                        </div>
                    </div>
                ) : (
                    // RESULT STATE
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-gray-800">Analysis Results</h3>
                            <button
                                onClick={() => { setResult(null); setFile(null); setPassword(""); }}
                                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                            >
                                Analyze Another
                            </button>
                        </div>

                        {/* KPI Cards */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 flex flex-col justify-between">
                                <span className="text-sm text-blue-600 font-medium uppercase tracking-wider">Total Portfolio Value</span>
                                <div className="text-4xl font-bold text-gray-900 mt-2">
                                    {formatCurrency(result.totalValue)}
                                </div>
                            </div>

                            <div className="p-6 bg-amber-50 rounded-xl border border-amber-100 flex flex-col justify-between relative overflow-hidden">
                                <span className="text-sm text-amber-700 font-medium uppercase tracking-wider flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" /> Est. Yearly Commissions
                                </span>
                                <div className="text-4xl font-bold text-amber-600 mt-2">
                                    {formatCurrency(result.potentialSavings)}
                                </div>
                                <p className="text-xs text-amber-800/70 mt-2">
                                    You likely pay this amount annually to distributors. Switching to Direct plans avoids this.
                                </p>
                            </div>
                        </div>

                        {/* Chart Section */}
                        <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center">
                            <h4 className="text-gray-700 font-medium mb-4 flex items-center gap-2">
                                <PieChartIcon className="w-5 h-5" /> Allocation Split
                            </h4>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={chartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index === 0 ? '#10B981' : '#F59E0B'} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip formatter={(val: number) => formatCurrency(val)} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Detailed Table */}
                        <div className="space-y-4">
                            <h4 className="text-gray-700 font-medium flex items-center gap-2">
                                <Banknote className="w-5 h-5" /> Fund Details
                            </h4>
                            <div className="overflow-hidden border border-gray-200 rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fund Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan Type</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {result.funds.map((fund, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                                    {fund.name}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${fund.type === 'DIRECT'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-amber-100 text-amber-800'
                                                        }`}>
                                                        {fund.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 text-right font-mono">
                                                    {formatCurrency(fund.value)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};



