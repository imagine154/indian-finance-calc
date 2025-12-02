export interface RentVsBuyInput {
    // Buy Scenario
    propertyPrice: number;
    downPaymentAmount: number; // usually calculated as % of propertyPrice in UI, but passed as amount here
    loanInterestRate: number; // annual %
    loanTenureYears: number;
    propertyAppreciationRate: number; // annual %

    // Rent Scenario
    currentMonthlyRent: number;
    rentInflationRate: number; // annual %

    // Common
    investmentReturnRate: number; // annual % for opportunity cost/savings investment
    durationYears: number; // Analysis period
}

export interface YearlyResult {
    year: number;
    buyScenario: {
        propertyValue: number;
        outstandingLoan: number;
        netWealth: number; // Property Value - Outstanding Loan
        totalOutflow: number; // Cumulative outflow (Downpayment + EMIs + Maintenance - Tax Saved)
    };
    rentScenario: {
        investmentValue: number; // Accumulated savings + returns
        netWealth: number; // Investment Value
        totalOutflow: number; // Cumulative Rent Paid
    };
}

export interface RentVsBuyResult {
    yearlyBreakdown: YearlyResult[];
    finalVerdict: {
        winner: 'buy' | 'rent';
        differenceAmount: number;
        buyNetWealth: number;
        rentNetWealth: number;
    };
}

export const calculateRentVsBuy = (input: RentVsBuyInput): RentVsBuyResult => {
    const {
        propertyPrice,
        downPaymentAmount,
        loanInterestRate,
        loanTenureYears,
        propertyAppreciationRate,
        currentMonthlyRent,
        rentInflationRate,
        investmentReturnRate,
        durationYears,
    } = input;

    const loanAmount = propertyPrice - downPaymentAmount;
    const monthlyInterestRate = loanInterestRate / 12 / 100;
    const totalLoanMonths = loanTenureYears * 12;

    // EMI Calculation
    let emi = 0;
    if (loanInterestRate > 0) {
        emi =
            (loanAmount *
                monthlyInterestRate *
                Math.pow(1 + monthlyInterestRate, totalLoanMonths)) /
            (Math.pow(1 + monthlyInterestRate, totalLoanMonths) - 1);
    } else {
        emi = loanAmount / totalLoanMonths;
    }

    let currentPropertyValue = propertyPrice;
    let currentOutstandingLoan = loanAmount;
    let currentInvestmentValue = downPaymentAmount; // Initial corpus for Rent scenario (opportunity cost of downpayment)

    // We assume the downpayment amount is invested in the Rent scenario at the start.
    // Wait, the requirement says:
    // "If Buying is more expensive, the difference is invested"
    // AND "Final Asset Value = Future Value of (Downpayment + Monthly SIP of savings)"
    // So yes, the downpayment is the initial lump sum investment in Rent scenario.

    let currentMonthlyRentVal = currentMonthlyRent;

    const yearlyResults: YearlyResult[] = [];

    // Cumulative tracking
    let totalBuyOutflow = downPaymentAmount;
    let totalRentOutflow = 0;

    for (let year = 1; year <= durationYears; year++) {
        // --- BUY SCENARIO ---
        let yearlyEmiPaid = 0;
        let interestPaidThisYear = 0;
        let principalPaidThisYear = 0;

        // Calculate EMI details for this year
        for (let m = 1; m <= 12; m++) {
            const monthIndex = (year - 1) * 12 + m;
            if (monthIndex <= totalLoanMonths) {
                const interestComponent = currentOutstandingLoan * monthlyInterestRate;
                const principalComponent = emi - interestComponent;

                interestPaidThisYear += interestComponent;
                principalPaidThisYear += principalComponent;
                currentOutstandingLoan -= principalComponent;
                if (currentOutstandingLoan < 0) currentOutstandingLoan = 0;
                yearlyEmiPaid += emi;
            }
        }

        // Maintenance Cost (Assumed 0.5% of property value initially, increasing with inflation? 
        // Requirement says: "Annual Cost = (EMI * 12) + (Maintenance)"
        // It doesn't specify maintenance rate. Let's assume a standard 1% of property value per year or similar?
        // Or maybe just 0 for now if not specified in inputs?
        // The prompt says: "Annual Cost = (EMI * 12) + (Maintenance)."
        // But Maintenance is not in the input list. 
        // I will assume Maintenance is 0 for now or add a default if I want to be fancy. 
        // Let's stick to the prompt inputs strictly for now to avoid complexity, or add a small default if needed.
        // Actually, let's assume 0 maintenance for simplicity unless user asked, 
        // OR better, let's assume a fixed small % like 0.2% of property price annually if not provided?
        // The prompt inputs didn't list maintenance cost. I will omit it for now to match inputs strictly.
        const maintenanceCost = 0;

        // Tax Savings
        // Sec 24b (Interest): Max 2L for self-occupied
        const taxDeductionInterest = Math.min(interestPaidThisYear, 200000);
        // Sec 80C (Principal): Max 1.5L (shared with other things, but let's assume fully available for simplicity or maybe 0?)
        // Usually Rent vs Buy calcs assume you max out 80C elsewhere. 
        // However, the prompt explicitly says: "Tax Saved = Tax benefit on Interest (Sec 24b) + Principal (80C)."
        // So I should calculate it. Let's assume 30% tax bracket for max benefit estimation?
        // The prompt doesn't give tax bracket. I'll assume 30% as a standard for these comparisons.
        const taxBracket = 0.30;
        const taxSavedInterest = taxDeductionInterest * taxBracket;
        const taxSavedPrincipal = Math.min(principalPaidThisYear, 150000) * taxBracket;

        const taxSaved = taxSavedInterest + taxSavedPrincipal;

        const annualBuyCost = yearlyEmiPaid + maintenanceCost;
        const netBuyOutflow = annualBuyCost - taxSaved;

        totalBuyOutflow += netBuyOutflow;

        // Appreciation
        currentPropertyValue = currentPropertyValue * (1 + propertyAppreciationRate / 100);


        // --- RENT SCENARIO ---
        const annualRent = currentMonthlyRentVal * 12;
        totalRentOutflow += annualRent;

        // Savings to invest
        // Savings = (Net Outflow of Buying) - (Annual Rent)
        // If Net Buy Outflow > Annual Rent, we save the difference and invest it.
        // If Rent > Buy Outflow, we withdraw from investment? Or just invest 0?
        // Usually Rent vs Buy assumes Buy is more expensive initially.
        // If Rent is more expensive, it means we are saving money by Buying (negative savings for Rent scenario).
        // Let's handle it as a flow:
        // Surplus = Net Buy Outflow - Annual Rent.
        // If Surplus > 0, add to investment.
        // If Surplus < 0, subtract from investment (conceptually, or just say investment grows less).
        // Actually, the prompt says: "If Buying is more expensive, the difference is invested".
        // It implies we are comparing cashflows.
        // Let's treat "Investment" as the pot where we put all the money we WOULD have spent on buying, but didn't.
        // So we start with Downpayment.
        // Each year, we add (Net Buy Outflow - Annual Rent) to the pot.
        // If Net Buy Outflow < Annual Rent, we effectively take out money (or add negative).

        const yearlySurplus = netBuyOutflow - annualRent;

        // Investment Return
        // We apply return on the opening balance + half of the surplus (assuming monthly SIP-like spread)?
        // Or just simple annual compounding?
        // "Final Asset Value = Future Value of (Downpayment + Monthly SIP of savings)"
        // Let's do monthly simulation for better accuracy or just annual for simplicity?
        // The prompt says "Yearly Simulation" in the logic section title.
        // But "Monthly SIP of savings" implies monthly.
        // Let's stick to annual for the main loop but approximate SIP return on the surplus.
        // SIP return approximation: Surplus * (1 + r/2) ? No, that's rough.
        // Let's just add Surplus at the end of year for simplicity, or start of year?
        // Let's assume monthly SIP for the surplus.
        // FV of SIP = P * [ (1+i)^n - 1 ] / i * (1+i)

        const monthlyReturnRate = investmentReturnRate / 12 / 100;
        let surplusFV = 0;
        if (yearlySurplus !== 0) {
            const monthlySurplus = yearlySurplus / 12;
            // FV of monthly contributions over 1 year
            surplusFV = monthlySurplus * ((Math.pow(1 + monthlyReturnRate, 12) - 1) / monthlyReturnRate) * (1 + monthlyReturnRate);
        }

        // Existing corpus grows
        currentInvestmentValue = currentInvestmentValue * (1 + investmentReturnRate / 100) + surplusFV;

        // Rent increases for next year
        currentMonthlyRentVal = currentMonthlyRentVal * (1 + rentInflationRate / 100);

        yearlyResults.push({
            year,
            buyScenario: {
                propertyValue: currentPropertyValue,
                outstandingLoan: currentOutstandingLoan,
                netWealth: currentPropertyValue - currentOutstandingLoan,
                totalOutflow: totalBuyOutflow
            },
            rentScenario: {
                investmentValue: currentInvestmentValue,
                netWealth: currentInvestmentValue,
                totalOutflow: totalRentOutflow
            }
        });
    }

    const finalBuyWealth = yearlyResults[yearlyResults.length - 1].buyScenario.netWealth;
    const finalRentWealth = yearlyResults[yearlyResults.length - 1].rentScenario.netWealth;

    const winner = finalBuyWealth > finalRentWealth ? 'buy' : 'rent';
    const difference = Math.abs(finalBuyWealth - finalRentWealth);

    return {
        yearlyBreakdown: yearlyResults,
        finalVerdict: {
            winner,
            differenceAmount: difference,
            buyNetWealth: finalBuyWealth,
            rentNetWealth: finalRentWealth
        }
    };
};
