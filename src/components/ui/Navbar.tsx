"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IndianRupee, Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type NavGroup = {
    label: string;
    href?: string;
    items: { name: string; href: string }[];
};

const navGroups: NavGroup[] = [
    {
        label: "Income & Tax",
        items: [
            { name: "Salary Calculator", href: "/calculators/salary" },
            { name: "Income Tax", href: "/calculators/income-tax" },
            { name: "Freelance Tax", href: "/calculators/freelance" },
            { name: "Capital Gains", href: "/calculators/capital-gains" },
            { name: "HRA Calculator", href: "/calculators/hra" },
            { name: "GST Calculator", href: "/calculators/gst" },
        ]
    },
    {
        label: "Investments",
        items: [
            { name: "SIP Calculator", href: "/calculators/sip" },
            { name: "Goal Planner", href: "/calculators/goal" },
            { name: "FIRE Calculator", href: "/calculators/fire" },
            { name: "Explore Mutual Funds", href: "/explore-mutual-funds" },
            { name: "Explore ULIP Funds", href: "/explore-ulip-funds" },
            { name: "MF Analyzer", href: "/calculators/mutual-fund-analyzer" },
            { name: "SIP Analyzer", href: "/calculators/sip-analyzer" },
            { name: "Investment Advisor", href: "/calculators/investment-advisor" },

            { name: "SWP Calculator", href: "/calculators/swp" },
            { name: "Lumpsum", href: "/calculators/lumpsum" },
            { name: "FD Calculator", href: "/calculators/fd" },
            { name: "RD Calculator", href: "/calculators/rd" },

        ]
    },
    {
        label: "Strategies",
        href: "/strategies",
        items: [
            { name: "Core & Satellite", href: "/strategies/core-satellite" },
            { name: "3-Bucket Strategy", href: "/strategies/three-bucket" },
            { name: "Coffee Can Investing", href: "/strategies/coffee-can" },
            { name: "Barbell Strategy", href: "/strategies/barbell" },
            { name: "Factor Investing", href: "/strategies/factor-investing" },
            { name: "Magic Formula", href: "/strategies/magic-formula" },
        ]
    },
    {
        label: "Govt Schemes",
        items: [
            { name: "PPF Calculator", href: "/calculators/ppf" },
            { name: "EPF Calculator", href: "/calculators/pf" },
            { name: "NPS Calculator", href: "/calculators/nps" },
            { name: "SSY Calculator", href: "/calculators/ssy" },
            { name: "Gratuity", href: "/calculators/gratuity" },
            { name: "Mahila Samman", href: "/calculators/mssc" },
            { name: "APY Calculator", href: "/calculators/apy" },
        ]
    },
    {
        label: "Loans",
        items: [
            { name: "Home Loan EMI", href: "/calculators/loan" },
            { name: "Rent vs Buy", href: "/calculators/rent-vs-buy" },
            { name: "Balance Transfer", href: "/calculators/balance-transfer" },
        ]
    },
    {
        label: "Trading & Risk",
        items: [
            { name: "Pivot Point Calculator", href: "/calculators/pivot-point" },
            { name: "Position Size", href: "/calculators/position-size" },
            { name: "Stock Average", href: "/calculators/stock-average" },
        ]
    }
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (label: string) => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        setActiveDropdown(label);
    };

    const handleMouseLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 150);
    };

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
        setActiveDropdown(null);
    }, [pathname]);

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-blue-600 p-1.5 rounded-lg">
                                <IndianRupee className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent hidden sm:block">
                                RupeeTools
                            </span>
                            <span className="font-bold text-xl text-slate-900 sm:hidden">
                                RupeeTools
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navGroups.map((group) => {
                            const isDropdownOpen = activeDropdown === group.label;
                            const isActiveGroup = group.items.some(item => item.href === pathname) || (group.href === pathname);

                            return (
                                <div
                                    key={group.label}
                                    className="relative group"
                                    onMouseEnter={() => handleMouseEnter(group.label)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {group.href ? (
                                        <Link
                                            href={group.href}
                                            className={`flex items-center gap-1 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out ${isActiveGroup || isDropdownOpen
                                                ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                                                : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                                                }`}
                                        >
                                            {group.label}
                                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                                        </Link>
                                    ) : (
                                        <button
                                            className={`flex items-center gap-1 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out ${isActiveGroup || isDropdownOpen
                                                ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                                                : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                                                }`}
                                        >
                                            {group.label}
                                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                                        </button>
                                    )}

                                    {/* Dropdown Menu */}
                                    {isDropdownOpen && (
                                        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                            {group.items.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className={`block px-4 py-2 text-sm transition-colors ${pathname === item.href
                                                        ? "bg-blue-50 text-blue-700 font-medium"
                                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                                        }`}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
                        >
                            {isOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <div className="lg:hidden border-t border-slate-100 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
                    <div className="px-4 pt-2 pb-6 space-y-4">
                        {navGroups.map((group) => (
                            <div key={group.label} className="space-y-1">
                                {group.href ? (
                                    <Link href={group.href}>
                                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2 hover:text-blue-600 cursor-pointer">
                                            {group.label}
                                        </h3>
                                    </Link>
                                ) : (
                                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
                                        {group.label}
                                    </h3>
                                )}
                                <div className="grid grid-cols-1 gap-1">
                                    {group.items.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                                    ? "bg-blue-50 text-blue-700"
                                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                                    }`}
                                            >
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
