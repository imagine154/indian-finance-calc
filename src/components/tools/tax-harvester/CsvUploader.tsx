"use client";

import React, { useRef, useState } from 'react';
import { Upload, Download, FileSpreadsheet, Loader2, CheckCircle2 } from 'lucide-react';
import { parseHoldingsCsv } from '@/lib/csv-parser';
import { TAX_HARVESTING_TEMPLATE } from '@/lib/csv-template';
import { Holding } from '@/lib/tax-harvesting';

interface CsvUploaderProps {
    onDataLoaded: (holdings: Holding[]) => void;
}

export function CsvUploader({ onDataLoaded }: CsvUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isParsing, setIsParsing] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsParsing(true);
        setStatus('idle');
        setMessage('');

        try {
            const data = await parseHoldingsCsv(file);
            if (data.length === 0) {
                setStatus('error');
                setMessage('No valid records found in CSV.');
            } else {
                onDataLoaded(data);
                setStatus('success');
                setMessage(`Imported ${data.length} records successfully.`);

                // Reset success message after 3 seconds
                setTimeout(() => {
                    setStatus('idle');
                    setMessage('');
                }, 3000);
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
            setMessage('Failed to parse CSV file.');
        } finally {
            setIsParsing(false);
            // Reset input so same file can be selected again
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleDownloadTemplate = (e: React.MouseEvent) => {
        e.preventDefault();
        const blob = new Blob([TAX_HARVESTING_TEMPLATE], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'rupeetools-tax-template.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <input
                type="file"
                ref={fileInputRef}
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
            />

            <button
                onClick={handleUploadClick}
                disabled={isParsing}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
                {isParsing ? (
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                ) : (
                    <Upload className="w-4 h-4" />
                )}
                {isParsing ? 'Parsing...' : 'Upload CSV'}
            </button>

            <div className="flex flex-col gap-1">
                <button
                    onClick={handleDownloadTemplate}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                    <Download className="w-3 h-3" />
                    Download sample template
                </button>

                {message && (
                    <p className={`text-xs flex items-center gap-1 animate-in fade-in slide-in-from-top-1 ${status === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
                        {status === 'success' && <CheckCircle2 className="w-3 h-3" />}
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
