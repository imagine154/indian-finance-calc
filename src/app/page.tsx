import Link from "next/link";

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
        </div>
      </div>
    </main>
  );
}