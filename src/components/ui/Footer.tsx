import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Column 1: Brand */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">
                            Indian Finance Tools
                        </h3>
                        <p className="text-sm leading-relaxed">
                            Simplifying personal finance for Indian investors. Free, accurate,
                            and privacy-focused calculators to help you plan your financial
                            future.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/calculators/income-tax"
                                    className="hover:text-white transition-colors"
                                >
                                    Income Tax Calculator
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/calculators/salary"
                                    className="hover:text-white transition-colors"
                                >
                                    Salary Calculator
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/calculators/sip"
                                    className="hover:text-white transition-colors"
                                >
                                    SIP Calculator
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/calculators/loan"
                                    className="hover:text-white transition-colors"
                                >
                                    Home Loan EMI
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-white transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-white transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy"
                                    className="hover:text-white transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="hover:text-white transition-colors"
                                >
                                    Terms of Use
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Legal Disclaimer */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Disclaimer</h3>
                        <p className="text-sm leading-relaxed">
                            Results provided by these calculators are estimates based on the
                            inputs and formulas used. They are for informational purposes only
                            and do not constitute financial advice. Please consult a qualified
                            financial advisor before making investment decisions.
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© 2025 Indian Finance Tools. All rights reserved.</p>
                    <p>Built with Next.js</p>
                </div>
            </div>
        </footer>
    );
}
