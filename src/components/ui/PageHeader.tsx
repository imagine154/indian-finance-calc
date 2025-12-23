"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    badge?: string;
    backHref?: string;
    className?: string;
}

export function PageHeader({
    title,
    badge,
    backHref = "/",
    className = ""
}: PageHeaderProps) {
    return (
        <div className={`bg-white border-b border-slate-200 sticky top-0 z-40 bg-white/80 backdrop-blur-md ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center gap-4">
                    <Link href={backHref} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                            {title}
                            {badge && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 shadow-sm">
                                    {badge}
                                </span>
                            )}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
