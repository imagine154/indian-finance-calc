
"use client";

import { useWealthStoreHydration, useWealthStore, selectNetWorth } from "@/store/useWealthStore";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { WealthHero } from "@/components/dashboard/WealthHero";
import { AssetAllocationChart } from "@/components/dashboard/AssetAllocationChart";
import { GoalsGrid } from "@/components/dashboard/GoalsGrid";
import { Shield } from "lucide-react";
import Link from 'next/link';
import { useState, useEffect } from "react";

export function DashboardClient() {
    const hydrated = useWealthStoreHydration();

    // We need to use store values to check for "Empty State" (First time user)
    // But we must wait for hydration first.
    const netWorth = useWealthStore(selectNetWorth);

    // Simple local check for "Is New User" - if Net Worth is 0, we assume new user for now.
    // In a real app, we might check if they have interaction flags.
    const isNewUser = netWorth === 0;

    if (!hydrated) {
        return (
            <div className="min-h-screen bg-white p-4 md:p-8">
                <div className="mx-auto max-w-7xl animate-pulse space-y-8">
                    <DashboardSkeleton />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white p-4 md:p-8">
            <div className="mx-auto max-w-6xl space-y-8">

                {/* Header Section */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Wealth</h1>
                    <p className="text-slate-500">Track your assets, liabilities, and financial goals in one place.</p>
                </div>

                {/* Hero Section */}
                <WealthHero />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Chart */}
                    <AssetAllocationChart />

                    {/* Goals */}
                    <div className="h-full">
                        <GoalsGrid />
                    </div>
                </div>

                {/* Privacy Footer */}
                <div className="mt-12 flex items-center justify-center gap-2 rounded-xl bg-blue-50 p-4 text-center text-xs text-blue-600">
                    <Shield size={14} />
                    <p>Privacy First: Data is stored locally on your device. We cannot see your finances.</p>
                </div>

            </div>
        </div>
    );
}
