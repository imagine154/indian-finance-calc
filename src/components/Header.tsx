import Link from "next/link";
import { Home } from "lucide-react";

export default function Header() {
    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-medium"
                >
                    <Home className="w-5 h-5" />
                    <span>Home</span>
                </Link>
                <div className="text-sm font-semibold text-slate-800">
                    Indian Finance Tools
                </div>
            </div>
        </header>
    );
}
