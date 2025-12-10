import Link from "next/link";
import type { Metadata } from "next";
import {
  Briefcase,
  Landmark,
  TrendingUp,
  Home as HomeIcon,
  IndianRupee,
  PiggyBank,
  Baby,
  Coins,
  LineChart,
  Target,
  Wallet,
  PieChart,
  Scale,
  Building,
  ArrowRightLeft,
  Percent,
  Laptop,
  Receipt,
  Flame,
  Microscope,
  Crosshair,
  Shield
} from "lucide-react";

export const metadata: Metadata = {
  title: 'RupeeTools - Best Indian Finance Calculators (SIP, Tax, Salary)',
  description: 'All-in-one financial toolkit for Indians. Calculate SIP Returns, In-hand Salary, Income Tax (FY 2025-26), and Home Loan Prepayment. Free & Accurate.',
};

const categories = [
  {
    title: "Income & Tax",
    icon: <IndianRupee className="w-6 h-6 text-blue-600" />,
    calculators: [
      {
        name: "Income Tax",
        href: "/calculators/income-tax",
        desc: "Old vs New Regime comparison.",
        icon: <Percent className="w-6 h-6 text-orange-600" />,
        iconBg: "bg-orange-100"
      },
      {
        name: "Salary",
        href: "/calculators/salary",
        desc: "In-hand salary from CTC.",
        icon: <Briefcase className="w-6 h-6 text-green-600" />,
        iconBg: "bg-green-100"
      },
      {
        name: "Freelance Tax",
        href: "/calculators/freelance",
        desc: "Section 44ADA for professionals.",
        icon: <Laptop className="w-6 h-6 text-teal-600" />,
        iconBg: "bg-teal-100"
      },
      {
        name: "Capital Gains",
        href: "/calculators/capital-gains",
        desc: "LTCG & STCG on Stocks/Property.",
        icon: <LineChart className="w-6 h-6 text-indigo-600" />,
        iconBg: "bg-indigo-100"
      },
      {
        name: "HRA Calculator",
        href: "/calculators/hra",
        desc: "Calculate tax-exempt HRA.",
        icon: <HomeIcon className="w-6 h-6 text-amber-600" />,
        iconBg: "bg-amber-100"
      },
      {
        name: "GST Calculator",
        href: "/calculators/gst",
        desc: "Inclusive & Exclusive GST.",
        icon: <Receipt className="w-6 h-6 text-cyan-600" />,
        iconBg: "bg-cyan-100"
      }
    ]
  },
  {
    title: "Government Schemes",
    icon: <Landmark className="w-6 h-6 text-emerald-600" />,
    calculators: [
      {
        name: "PPF",
        href: "/calculators/ppf",
        desc: "Public Provident Fund (Tax Free).",
        icon: <PiggyBank className="w-6 h-6 text-blue-600" />,
        iconBg: "bg-blue-100"
      },
      {
        name: "EPF",
        href: "/calculators/pf",
        desc: "Employee Provident Fund corpus.",
        icon: <Building className="w-6 h-6 text-emerald-600" />,
        iconBg: "bg-emerald-100"
      },
      {
        name: "NPS",
        href: "/calculators/nps",
        desc: "National Pension System.",
        icon: <Umbrella className="w-6 h-6 text-teal-600" />,
        iconBg: "bg-teal-100"
      },
      {
        name: "SSY",
        href: "/calculators/ssy",
        desc: "Sukanya Samriddhi for girl child.",
        icon: <Baby className="w-6 h-6 text-rose-600" />,
        iconBg: "bg-rose-100"
      },
      {
        name: "Gratuity",
        href: "/calculators/gratuity",
        desc: "Resignation benefit calculator.",
        icon: <Handshake className="w-6 h-6 text-cyan-600" />,
        iconBg: "bg-cyan-100"
      },
      {
        name: "Mahila Samman",
        href: "/calculators/mssc",
        desc: "Mahila Samman Savings.",
        icon: <User className="w-6 h-6 text-fuchsia-600" />,
        iconBg: "bg-fuchsia-100"
      },
      {
        name: "APY",
        href: "/calculators/apy",
        desc: "Atal Pension Yojana premiums.",
        icon: <Umbrella className="w-6 h-6 text-orange-600" />,
        iconBg: "bg-orange-100"
      }
    ]
  },
  {
    title: "Investments & Planning",
    icon: <TrendingUp className="w-6 h-6 text-indigo-600" />,
    calculators: [
      {
        name: "SIP",
        href: "/calculators/sip",
        desc: "Mutual Fund returns with Step-Up.",
        icon: <Coins className="w-6 h-6 text-blue-600" />,
        iconBg: "bg-blue-100"
      },
      {
        name: "Goal Planner",
        href: "/calculators/goal",
        desc: "Reverse SIP with inflation.",
        icon: <Target className="w-6 h-6 text-indigo-600" />,
        iconBg: "bg-indigo-100"
      },
      {
        name: "SWP",
        href: "/calculators/swp",
        desc: "Monthly withdrawal planning.",
        icon: <Wallet className="w-6 h-6 text-green-600" />,
        iconBg: "bg-green-100"
      },
      {
        name: "MF Analyzer",
        href: "/calculators/mutual-fund-analyzer",
        desc: "Historical returns of 3000+ funds.",
        icon: <LineChart className="w-6 h-6 text-indigo-600" />,
        iconBg: "bg-indigo-100"
      },
      {
        name: "Explore Funds",
        href: "/explore-mutual-funds",
        desc: "Browse & Filter 1500+ Funds.",
        icon: <Microscope className="w-6 h-6 text-teal-600" />,
        iconBg: "bg-teal-100"
      },
      {
        name: "Explore ULIPs",
        href: "/explore-ulip-funds",
        desc: "Compare ULIP Returns.",
        icon: <Shield className="w-6 h-6 text-rose-600" />,
        iconBg: "bg-rose-100"
      },
      {
        name: "Investment Advisor",
        href: "/calculators/investment-advisor",
        desc: "Asset allocation logic.",
        icon: <PieChart className="w-6 h-6 text-cyan-600" />,
        iconBg: "bg-cyan-100"
      },

      {
        name: "Lumpsum",
        href: "/calculators/lumpsum",
        desc: "One-time investment returns.",
        icon: <Coins className="w-6 h-6 text-blue-600" />,
        iconBg: "bg-blue-100"
      },
      {
        name: "FD Calculator",
        href: "/calculators/fd",
        desc: "Fixed Deposit returns.",
        icon: <Landmark className="w-6 h-6 text-blue-600" />,
        iconBg: "bg-blue-100"
      },
      {
        name: "FIRE Calculator",
        href: "/calculators/fire",
        desc: "Lean, Fat & Coast FIRE.",
        icon: <Flame className="w-6 h-6 text-orange-600" />,
        iconBg: "bg-orange-100"
      },
      {
        name: "SIP Analyzer",
        href: "/calculators/sip-analyzer",
        desc: "Check if your SIPs meet your goals.",
        icon: <Microscope className="w-6 h-6 text-purple-600" />,
        iconBg: "bg-purple-100"
      },

    ]
  },
  {
    title: "Loans & Property",
    icon: <HomeIcon className="w-6 h-6 text-purple-600" />,

    calculators: [
      {
        name: "Home Loan",
        href: "/calculators/loan",
        desc: "EMI with pre-payment analysis.",
        icon: <HomeIcon className="w-6 h-6 text-purple-600" />,
        iconBg: "bg-purple-100"
      },
      {
        name: "Rent vs Buy",
        href: "/calculators/rent-vs-buy",
        desc: "Buy a house or rent & invest?",
        icon: <Scale className="w-6 h-6 text-orange-600" />,
        iconBg: "bg-orange-100"
      },
      {
        name: "Balance Transfer",
        href: "/calculators/balance-transfer",
        desc: "Switch loan to save interest.",
        icon: <ArrowRightLeft className="w-6 h-6 text-green-600" />,
        iconBg: "bg-green-100"
      }
    ]
  },
  {
    title: "Trading Tools",
    icon: <Target className="w-6 h-6 text-amber-600" />,
    calculators: [
      {
        name: "Pivot Points",
        href: "/calculators/pivot-point",
        desc: "Find intraday support & resistance levels (Standard, Fibonacci, Camarilla).",
        icon: <Crosshair className="w-6 h-6 text-amber-500" />,
        iconBg: "bg-amber-100"
      },
      {
        name: "Position Size",
        href: "/calculators/position-size",
        desc: "Stock trading risk management.",
        icon: <Scale className="w-6 h-6 text-amber-600" />,
        iconBg: "bg-amber-100"
      },
      {
        name: "Stock Average",
        href: "/calculators/stock-average",
        desc: "Average Down & Target Price.",
        icon: <Target className="w-6 h-6 text-amber-600" />,
        iconBg: "bg-amber-100"
      }
    ]
  }
];

// Helper components for icons that might not be directly available or need custom mapping
// Using lucide-react icons directly where possible.
// Note: Some icons like 'Umbrella' might need to be imported if used.
// Let's ensure all used icons are imported.
import { Umbrella, Handshake, User } from "lucide-react";


export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 py-12 md:py-20 relative">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Master Your <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Money.</span>
          </h1>

          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Free, accurate financial tools for Indians. Plan your <span className="font-semibold text-slate-800">Tax</span>, <span className="font-semibold text-slate-800">SIPs</span>, <span className="font-semibold text-slate-800">Loans</span>, and <span className="font-semibold text-slate-800">Retirement</span> in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/calculators/income-tax"
              className="px-8 py-3.5 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5"
            >
              Calculate Tax
            </Link>
            <Link
              href="/calculators/sip"
              className="px-8 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-full font-semibold hover:bg-slate-50 hover:text-blue-600 transition-all hover:border-blue-200"
            >
              Plan SIP
            </Link>
          </div>
        </div>

        <div className="space-y-16">
          {categories.map((category, index) => (
            <section key={index}>
              <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-2">
                <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {category.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.calculators.map((calc, calcIndex) => (
                  <Link
                    key={calcIndex}
                    href={calc.href}
                    className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-slate-200 hover:-translate-y-1"
                  >
                    <div className={`h-12 w-12 ${calc.iconBg} rounded-xl flex items-center justify-center mb-4 transition-colors`}>
                      {calc.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                      {calc.name}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {calc.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}