import DataVault from "@/components/dashboard/Settings/DataVault";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Settings | RupeeTools",
    description: "Manage your financial data, backup, and restore options.",
    robots: "noindex",
};

export default function SettingsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings & Privacy</h1>
                <p className="text-lg text-slate-600 max-w-2xl">
                    Manage your personal datavault. Your financial information never leaves your device unless you export it.
                </p>
            </div>

            <section className="pt-4">
                <DataVault />
            </section>
        </div>
    );
}
