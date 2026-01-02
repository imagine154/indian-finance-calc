
import Link from 'next/link';

interface RelatedCalculatorsProps {
    category: 'investments' | 'loans';
}

export function RelatedCalculators({ category }: RelatedCalculatorsProps) {
    const links = {
        investments: [
            { name: 'SIP Calculator', href: '/calculators/sip', desc: 'Plan your SIP wealth' },
            { name: 'Lumpsum Calculator', href: '/calculators/lumpsum', desc: 'One-time investment returns' },
            { name: 'SWP Calculator', href: '/calculators/swp', desc: 'Regular withdrawal plan' },
            { name: 'Step-Up SIP', href: '/calculators/step-up-sip', desc: 'Increasing SIP amount' },
            { name: 'Tax Harvester', href: '/tax-harvester', desc: 'Tax Loss Harvesting' },
        ],
        loans: [
            { name: 'Home Loan EMI', href: '/calculators/home-loan', desc: 'Plan your dream home' },
            { name: 'Car Loan EMI', href: '/calculators/car-loan', desc: 'Plan your car purchase' },
            { name: 'Rent vs Buy', href: '/calculators/rent-vs-buy', desc: 'Renting vs Buying House' },
        ]
    };

    const items = links[category];

    return (
        <div className="mt-12">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Related Calculators</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="block p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
                    >
                        <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 mb-1">{item.name}</h4>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
