# Indian Finance Calculator

A high-performance Financial Calculator website for the Indian market built with Next.js 15, TypeScript, and Tailwind CSS.

## 🏗️ Architecture

This project follows a **strict separation of concerns** architecture:

### 📁 Project Structure

```
src/
├── core/
│   └── logic/              # Pure TypeScript financial calculation logic
│       ├── sip.ts          # SIP calculator
│       ├── tax.ts          # Tax calculators (Old & New Regime)
│       └── [others].ts     # Other financial calculators
│
├── app/
│   ├── calculators/        # Next.js App Router pages
│   │   ├── sip/
│   │   ├── tax/
│   │   └── [others]/
│   ├── sitemap.ts          # SEO sitemap
│   ├── robots.ts           # Robots.txt configuration
│   └── layout.tsx          # Root layout
│
└── components/
    └── calculators/        # React UI components
        ├── SipCalculator/
        ├── TaxCalculator/
        └── [others]/
```

### 🎯 Key Principles

1. **Logic Separation**: All financial calculations are in `src/core/logic/` as pure TypeScript functions
2. **No React in Logic**: Core logic files contain zero React code - fully testable and reusable
3. **Type Safety**: Full TypeScript coverage with proper interfaces and types
4. **SEO Ready**: Configured with sitemap and robots.txt for search engine optimization

## 🚀 Getting Started

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## 📊 Available Calculators (Planned)

- **SIP Calculator** - Systematic Investment Plan calculator
- **Tax Calculator** - Income tax calculator (Old & New Regime)
- **EMI Calculator** - Loan EMI calculator
- **FD Calculator** - Fixed Deposit calculator
- **PPF Calculator** - Public Provident Fund calculator

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (ready for shadcn/ui)
- **Package Manager**: npm

## 📝 Adding New Calculators

1. Create logic in `src/core/logic/[name].ts`
2. Create route in `src/app/calculators/[name]/page.tsx`
3. Create components in `src/components/calculators/[Name]/`
4. Update sitemap in `src/app/sitemap.ts`

## 🎨 Styling

This project is configured with Tailwind CSS and is ready for **shadcn/ui** integration.

To add shadcn/ui:
```bash
npx shadcn@latest init
```

## 📄 License

MIT
