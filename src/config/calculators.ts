import {
    Briefcase,
    Percent,
    Laptop,
    LineChart,
    Home,
    Receipt,
    PiggyBank,
    Building,
    Umbrella,
    Baby,
    Handshake,
    User,
    Coins,
    Target,
    Wallet,
    Microscope,
    Shield,
    PieChart,
    Landmark,
    Flame,
    Scale,
    ArrowRightLeft,
    Crosshair,
    ArrowDownUp,
    TrendingUp
} from 'lucide-react';

export const CALCULATOR_CATEGORIES = [
    {
        title: "Income & Tax",
        icon: Wallet,
        color: "text-blue-600",
        calculators: [
            {
                name: "Income Tax",
                href: "/calculators/income-tax",
                desc: "Old vs New Regime comparison.",
                icon: Percent,
                color: "text-orange-600",
                bg: "bg-orange-100"
            },
            {
                name: "Salary",
                href: "/calculators/salary",
                desc: "In-hand salary from CTC.",
                icon: Briefcase,
                color: "text-green-600",
                bg: "bg-green-100"
            },
            {
                name: "Freelance Tax",
                href: "/calculators/freelance",
                desc: "Section 44ADA for professionals.",
                icon: Laptop,
                color: "text-teal-600",
                bg: "bg-teal-100"
            },
            {
                name: "Capital Gains",
                href: "/calculators/capital-gains",
                desc: "LTCG & STCG on Stocks/Property.",
                icon: LineChart,
                color: "text-indigo-600",
                bg: "bg-indigo-100"
            },
            {
                name: "HRA Calculator",
                href: "/calculators/hra",
                desc: "Calculate tax-exempt HRA.",
                icon: Home,
                color: "text-amber-600",
                bg: "bg-amber-100"
            },
            {
                name: "GST Calculator",
                href: "/calculators/gst",
                desc: "Inclusive & Exclusive GST.",
                icon: Receipt,
                color: "text-cyan-600",
                bg: "bg-cyan-100"
            }
        ]
    },
    {
        title: "Government Schemes",
        icon: Landmark,
        color: "text-emerald-600",
        calculators: [
            {
                name: "PPF",
                href: "/calculators/ppf",
                desc: "Public Provident Fund (Tax Free).",
                icon: PiggyBank,
                color: "text-blue-600",
                bg: "bg-blue-100"
            },
            {
                name: "EPF",
                href: "/calculators/pf",
                desc: "Employee Provident Fund corpus.",
                icon: Building,
                color: "text-emerald-600",
                bg: "bg-emerald-100"
            },
            {
                name: "NPS",
                href: "/calculators/nps",
                desc: "National Pension System.",
                icon: Umbrella,
                color: "text-teal-600",
                bg: "bg-teal-100"
            },
            {
                name: "SSY",
                href: "/calculators/ssy",
                desc: "Sukanya Samriddhi for girl child.",
                icon: Baby,
                color: "text-rose-600",
                bg: "bg-rose-100"
            },
            {
                name: "Gratuity",
                href: "/calculators/gratuity",
                desc: "Resignation benefit calculator.",
                icon: Handshake,
                color: "text-cyan-600",
                bg: "bg-cyan-100"
            },
            {
                name: "Mahila Samman",
                href: "/calculators/mssc",
                desc: "Mahila Samman Savings.",
                icon: User,
                color: "text-fuchsia-600",
                bg: "bg-fuchsia-100"
            },
            {
                name: "APY",
                href: "/calculators/apy",
                desc: "Atal Pension Yojana premiums.",
                icon: Umbrella,
                color: "text-orange-600",
                bg: "bg-orange-100"
            }
        ]
    },
    {
        title: "Investments",
        icon: TrendingUp,
        color: "text-indigo-600",
        calculators: [
            {
                name: "SIP",
                href: "/calculators/sip",
                desc: "Mutual Fund returns with Step-Up.",
                icon: Coins,
                color: "text-blue-600",
                bg: "bg-blue-100"
            },
            {
                name: "Goal Planner",
                href: "/calculators/goal",
                desc: "Reverse SIP with inflation.",
                icon: Target,
                color: "text-indigo-600",
                bg: "bg-indigo-100"
            },
            {
                name: "SWP",
                href: "/calculators/swp",
                desc: "Monthly withdrawal planning.",
                icon: Wallet,
                color: "text-green-600",
                bg: "bg-green-100"
            },
            {
                name: "MF Analyzer",
                href: "/calculators/mutual-fund-analyzer",
                desc: "Historical returns of 3000+ funds.",
                icon: LineChart,
                color: "text-indigo-600",
                bg: "bg-indigo-100"
            },
            {
                name: "Explore Funds",
                href: "/explore-mutual-funds",
                desc: "Browse & Filter 1500+ Funds.",
                icon: Microscope,
                color: "text-teal-600",
                bg: "bg-teal-100"
            },
            {
                name: "Explore ULIPs",
                href: "/explore-ulip-funds",
                desc: "Compare ULIP Returns.",
                icon: Shield,
                color: "text-rose-600",
                bg: "bg-rose-100"
            },
            {
                name: "Lumpsum",
                href: "/calculators/lumpsum",
                desc: "One-time investment returns.",
                icon: Coins,
                color: "text-blue-600",
                bg: "bg-blue-100"
            },
            {
                name: "FD Calculator",
                href: "/calculators/fd",
                desc: "Fixed Deposit returns.",
                icon: Landmark,
                color: "text-blue-600",
                bg: "bg-blue-100"
            },
            {
                name: "RD Calculator",
                href: "/calculators/rd",
                desc: "Recurring Deposit returns.",
                icon: PiggyBank,
                color: "text-teal-600",
                bg: "bg-teal-100",
                isNew: true
            },
            {
                name: "FIRE Calculator",
                href: "/calculators/fire",
                desc: "Lean, Fat & Coast FIRE.",
                icon: Flame,
                color: "text-orange-600",
                bg: "bg-orange-100"
            },
            {
                name: "SIP Analyzer",
                href: "/calculators/sip-analyzer",
                desc: "Check if your SIPs meet your goals.",
                icon: Microscope,
                color: "text-purple-600",
                bg: "bg-purple-100"
            }
        ]
    },
    {
        title: "Loans",
        icon: Home,
        color: "text-purple-600",
        calculators: [
            {
                name: "Home Loan",
                href: "/calculators/loan",
                desc: "EMI with pre-payment analysis.",
                icon: Home,
                color: "text-purple-600",
                bg: "bg-purple-100"
            },
            {
                name: "Rent vs Buy",
                href: "/calculators/rent-vs-buy",
                desc: "Buy a house or rent & invest?",
                icon: Scale,
                color: "text-orange-600",
                bg: "bg-orange-100"
            },
            {
                name: "Balance Transfer",
                href: "/calculators/balance-transfer",
                desc: "Switch loan to save interest.",
                icon: ArrowRightLeft,
                color: "text-green-600",
                bg: "bg-green-100"
            }
        ]
    },
    {
        title: "Trading Tools",
        icon: Crosshair,
        color: "text-amber-600",
        calculators: [
            {
                name: "Pivot Points",
                href: "/calculators/pivot-point",
                desc: "Find intraday support & resistance.",
                icon: Crosshair,
                color: "text-amber-500",
                bg: "bg-amber-100",
                isNew: true
            },
            {
                name: "Position Size",
                href: "/calculators/position-size",
                desc: "Stock trading risk management.",
                icon: Scale,
                color: "text-amber-600",
                bg: "bg-amber-100"
            },
            {
                name: "Stock Average",
                href: "/calculators/stock-average",
                desc: "Average Down & Target Price.",
                icon: ArrowDownUp,
                color: "text-amber-600",
                bg: "bg-amber-100",
                isNew: true
            }
        ]
    }
];
