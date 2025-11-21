"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
    { name: "Salary", href: "/calculators/salary" },
    { name: "Income Tax", href: "/calculators/income-tax" },
    { name: "SIP", href: "/calculators/sip" },
    { name: "Home Loan", href: "/calculators/loan" },
    { name: "PF", href: "/calculators/pf" },
    { name: "NPS", href: "/calculators/nps" },
    { name: "SSY", href: "/calculators/ssy" },
    { name: "Goal Planner", href: "/calculators/goal" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-blue-600 p-1.5 rounded-lg">
                                <Calculator className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl text-slate-900 hidden sm:block">
                                Indian Finance Tools
                            </span>
                            <span className="font-bold text-xl text-slate-900 sm:hidden">
                                IFT
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                            ? "bg-blue-50 text-blue-700"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        }`}
                                >
                                    {link.name}
                                </Link>
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
                <div className="lg:hidden border-t border-slate-100 bg-white">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${isActive
                                            ? "bg-blue-50 text-blue-700"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
}
