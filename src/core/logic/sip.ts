/**
 * SIP (Systematic Investment Plan) Calculator
 * Pure TypeScript financial logic - NO React code
 */

export interface SipResult {
  totalInvestment: number;
  estimatedReturns: number;
  totalValue: number;
  yearlyBreakdown: YearlyData[];
}

export interface YearlyData {
  year: number;
  invested: number;
  value: number;
  returns: number;
}

/**
 * Calculate SIP returns
 * @param monthlyInvestment - Monthly investment amount in INR
 * @param annualRate - Expected annual rate of return (in percentage, e.g., 12 for 12%)
 * @param years - Investment duration in years
 * @returns SIP calculation result with breakdown
 */
export function calculateSIP(
  monthlyInvestment: number,
  annualRate: number,
  years: number,
  stepUpPercentage: number = 0,
  lumpsumAmount: number = 0
): SipResult {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;

  let currentBalance = lumpsumAmount;
  let totalInvested = lumpsumAmount;
  let currentMonthlySIP = monthlyInvestment;

  // Generate yearly breakdown
  const yearlyBreakdown: YearlyData[] = [];

  // Track yearly accumulation for breakdown
  let yearlyInvestedAccumulator = 0;

  for (let month = 1; month <= months; month++) {
    // Apply monthly interest to the balance at the start of the month
    // (assuming SIP is deposited at the beginning or interest calculated on previous balance + deposit? 
    // Standard SIP calc usually: Invest at start, interest at end. 
    // Let's follow the standard: Balance grows by rate, then add new SIP? 
    // Or Add SIP, then grow?
    // The original formula `monthlyInvestment * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate))`
    // implies investment at the BEGINNING of the period (due to the extra *(1+r)).
    // So: (Previous Balance + SIP) * (1 + r)

    // However, for Lumpsum, it's just Balance * (1+r).

    // Let's refine the loop for combined approach:
    // Month Start: Add SIP to Balance.
    // Month End: Apply Interest to Balance.

    // Wait, if I have lumpsum, it's there from day 0.
    // SIP is added each month.

    // Iterative approach matching the "Investment at beginning of month" logic:
    // Month 1: (Lumpsum + SIP) * (1 + r)
    // Month 2: (Month1_End_Bal + SIP) * (1 + r)

    currentBalance = (currentBalance + currentMonthlySIP) * (1 + monthlyRate);
    totalInvested += currentMonthlySIP;
    yearlyInvestedAccumulator += currentMonthlySIP;

    // Check for Step-Up at the end of each year (every 12 months), but not the last month of the entire period if we want to affect next year.
    // Actually, step up happens after 1 year is complete. So for month 13, the SIP amount is higher.
    if (month % 12 === 0) {
      // End of a year
      const year = month / 12;

      // Calculate returns for this year so far (Total Value - Total Invested)
      // But we need "Yearly Data" which usually shows the snapshot at end of year.

      yearlyBreakdown.push({
        year,
        invested: Math.round(totalInvested),
        value: Math.round(currentBalance),
        returns: Math.round(currentBalance - totalInvested),
      });

      // Reset yearly accumulator if we wanted to track "invested THIS year", but the interface implies cumulative "invested"
      yearlyInvestedAccumulator = 0;

      // Apply Step-Up for next year
      if (stepUpPercentage > 0) {
        currentMonthlySIP = currentMonthlySIP * (1 + stepUpPercentage / 100);
      }
    }
  }

  const estimatedReturns = currentBalance - totalInvested;

  return {
    totalInvestment: Math.round(totalInvested),
    estimatedReturns: Math.round(estimatedReturns),
    totalValue: Math.round(currentBalance),
    yearlyBreakdown,
  };
}

/**
 * Calculate lump sum investment returns
 * @param principal - Initial lump sum amount in INR
 * @param annualRate - Expected annual rate of return (in percentage)
 * @param years - Investment duration in years
 * @returns Future value and returns
 */
export function calculateLumpSum(
  principal: number,
  annualRate: number,
  years: number
): { principal: number; futureValue: number; returns: number } {
  const futureValue = principal * Math.pow(1 + annualRate / 100, years);
  const returns = futureValue - principal;

  return {
    principal: Math.round(principal),
    futureValue: Math.round(futureValue),
    returns: Math.round(returns),
  };
}
