/**
 * Interface for the projection data point
 */
export interface WealthProjectionPoint {
    year: number;
    amount: number;
    invested: number;
}

/**
 * Calculates the future wealth projection based on current wealth and monthly SIP.
 * 
 * @param currentWealth - The starting net worth (cannot be negative for projection purposes, strictly speaking, 
 *                        but we will use net worth. if negative, it starts from that).
 * @param monthlySip - Amount added every month.
 * @param returnRate - Annual expected return rate in percent (e.g., 12 for 12%).
 * @param years - Number of years to project (default 15).
 * @returns Array of WealthProjectionPoint objects.
 */
export function calculateWealthProjection(
    currentWealth: number,
    monthlySip: number,
    returnRate: number = 12,
    years: number = 15
): WealthProjectionPoint[] {
    const projection: WealthProjectionPoint[] = [];
    const currentYear = new Date().getFullYear();
    const monthlyRate = returnRate / 100 / 12;

    let currentAmount = currentWealth;
    let totalInvested = currentWealth; // Tracks principal + SIPs

    // Start with year 0 (Current State)
    projection.push({
        year: currentYear,
        amount: Math.round(currentAmount),
        invested: Math.round(totalInvested),
    });

    for (let i = 1; i <= years; i++) {
        // Compound for 12 months
        for (let m = 0; m < 12; m++) {
            currentAmount = (currentAmount + monthlySip) * (1 + monthlyRate);
            totalInvested += monthlySip;
        }

        projection.push({
            year: currentYear + i,
            amount: Math.round(currentAmount),
            invested: Math.round(totalInvested),
        });
    }

    return projection;
}
