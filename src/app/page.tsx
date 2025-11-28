import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'RupeeTools - Best Indian Finance Calculators (SIP, Tax, Salary)',
  description: 'All-in-one financial toolkit for Indians. Calculate SIP Returns, In-hand Salary, Income Tax (FY 2025-26), and Home Loan Prepayment. Free & Accurate.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Indian Finance Tools
        </h1>
        <p className="text-slate-600 mb-10">
          Free, accurate financial calculators for Indian investors.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: SIP Calculator */}
          <Link
            href="/calculators/sip"
            className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200"
          >
            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600 font-bold">
              ₹
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">SIP Calculator</h2>
            <p className="text-slate-500 text-sm">
              Calculate returns on your monthly mutual fund investments.
            </p>
          </Link>

          {/* Card 1.5: Lumpsum Calculator */}
          <Link
            href="/calculators/lumpsum"
            className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200"
          >
            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600 font-bold">
              💰
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Lumpsum Calculator</h2>
            <p className="text-slate-500 text-sm">
              Calculate future value of your one-time investment.
            </p>
          </Link>

          {/* Card 1.6: SWP Calculator */}
          <Link
            href="/calculators/swp"
            className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200"
          >
            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600 font-bold">
              💸
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">SWP Calculator</h2>
            <p className="text-slate-500 text-sm">
              Plan your monthly income withdrawals from mutual funds.
            </p>
          </Link>

          {/* Card 1.7: FD Calculator */}
          <Link
            href="/calculators/fd"
            className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200"
          >
            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600 font-bold">
              🏦
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">FD Calculator</h2>
            <p className="text-slate-500 text-sm">
              Calculate maturity amount and interest for Fixed Deposits.
            </p>
          </Link>

          {/* Card 2: Income Tax */}
          <Link
            href="/calculators/income-tax"
            className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200"
          >
            <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4 text-orange-600 font-bold">
              %
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Income Tax</h2>
            <p className="text-slate-500 text-sm">
              Compare Old vs New regime and find the best option for you.
            </p>
          </Link>

          {/* Card 2.5: Freelance Tax */}
          <Link
            href="/calculators/freelance"
            className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200"
          >
            <div className="h-10 w-10 bg-teal-100 rounded-lg flex items-center justify-center mb-4 text-teal-600 font-bold">
              💻
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Freelance Tax</h2>
            <p className="text-slate-500 text-sm">
              Save 50% tax with Section 44ADA. For developers & professionals.
            </p>
          </Link>

          {/* Card 3: Salary Calculator */}
          <Link
            href="/calculators/salary"
            className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200"
          >
            <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center mb-4 text-green-600 font-bold">
              ₹
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Salary Calculator</h2>
            <p className="text-slate-500 text-sm">
              Calculate monthly in-hand salary from your annual CTC.
            </p>
          </Link>

          {/* Card 4: EPF Calculator */}
          <Link
            href="/calculators/pf"
            className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200"
          >
            <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 text-emerald-600 font-bold">
              PF
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">EPF Calculator</h2>
            <p className="text-slate-500 text-sm">
              Project your retirement corpus with compound interest.
            </p>
          </Link>

          {/* Card 5: NPS Calculator */}
          <Link
            href="/calculators/nps"
            className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200"
          >
            <div className="h-10 w-10 bg-teal-100 rounded-lg flex items-center justify-center mb-4 text-teal-600 font-bold">
              NPS
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">NPS Calculator</h2>
            <p className="text-slate-500 text-sm">
              Estimate pension & lump sum from National Pension System.
            </p>
          </Link>

          {/* Card 6: Home Loan Calculator */}
          <Link
            href="/calculators/loan"
            className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200"
          >
            <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600 font-bold">
              🏠
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Home Loan EMI</h2>
            <p className="text-slate-500 text-sm">
              Calculate EMI and see how pre-payments save you lakhs.
            </p>
          </Link>

          {/* Card 7: SSY Calculator */}
          <Link
            href="/calculators/ssy"
            className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200"
          >
            <div className="h-10 w-10 bg-rose-100 rounded-lg flex items-center justify-center mb-4 text-rose-600 font-bold">
              👧
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">SSY Calculator</h2>
            <p className="text-slate-500 text-sm">
              Sukanya Samriddhi Yojana maturity & education planning.
            </p>
          </Link>

          {/* Card 8: Goal Planner */}
          <Link
            href="/calculators/goal"
            className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200"
          >
            <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 text-indigo-600 font-bold">
              🎯
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Goal Planner</h2>
            <p className="text-slate-500 text-sm">
              Reverse SIP calculator. Plan for goals with inflation adjustment.
            </p>
          </Link>

          {/* Card 9: Investment Advisor */}
          <Link
            href="/calculators/investment-advisor"
            className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200"
          >
            <div className="h-10 w-10 bg-cyan-100 rounded-lg flex items-center justify-center mb-4 text-cyan-600 font-bold">
              🧠
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Robo Advisor</h2>
            <p className="text-slate-500 text-sm">
              Get expert asset allocation advice based on your time horizon.
            </p>
          </Link>

          {/* Card 10: Mutual Fund Analyzer */}
          <Link
            href="/calculators/mutual-fund"
            className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200"
          >
            <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 text-indigo-600 font-bold">
              📈
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">MF Analyzer</h2>
            <p className="text-slate-500 text-sm">
              Analyze historical returns of 3000+ Mutual Funds & ETFs.
            </p>
          </Link>

          {/* Card 11: Position Size Calculator */}
          <Link
            href="/calculators/position-size"
            className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200"
          >
            <div className="h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4 text-amber-600 font-bold">
              ⚖️
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Position Size</h2>
            <p className="text-slate-500 text-sm">
              Calculate exact share quantity for risk management.
            </p>
          </Link>

          {/* Card 12: PPF Calculator */}
          <Link
            href="/calculators/ppf"
            className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200"
          >
            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600 font-bold">
              🏦
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">PPF Calculator</h2>
            <p className="text-slate-500 text-sm">
              Calculate tax-free returns on your Public Provident Fund.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}