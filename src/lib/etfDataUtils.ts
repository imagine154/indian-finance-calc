export type StockHolding = {
    name: string;
    weight: number;
};

export type EtfInfo = {
    name: string;
};

export type SegmentData = {
    etfs: EtfInfo[];
    stocks: StockHolding[];
};

import etfDataRaw from '../data/etf_data.json';

export const etfData = etfDataRaw as Record<string, SegmentData>;

export const getSegmentList = () => {
    return Object.keys(etfData).sort();
};

export const getSegmentData = (segment: string): SegmentData | undefined => {
    return etfData[segment];
};

export const calculateOverlap = (segmentA: string, segmentB: string) => {
    const dataA = etfData[segmentA];
    const dataB = etfData[segmentB];

    if (!dataA || !dataB) return null;

    const mapA = new Map<string, number>();
    dataA.stocks.forEach(s => mapA.set(s.name.toLowerCase(), s.weight));

    let overlapScore = 0;
    const commonStocks: { name: string; weightA: number; weightB: number }[] = [];

    dataB.stocks.forEach(sB => {
        const nameLower = sB.name.toLowerCase();
        const weightA = mapA.get(nameLower);

        if (weightA !== undefined) {
            overlapScore += Math.min(weightA, sB.weight);
            commonStocks.push({
                name: sB.name, // Use the proper case name
                weightA,
                weightB: sB.weight
            });
        }
    });

    // Sort common stocks by highest combined weight (heuristic) or overlap contribution
    commonStocks.sort((a, b) => (Math.min(b.weightA, b.weightB) - Math.min(a.weightA, a.weightB)));

    return {
        overlapScore,
        commonStocks,
        countA: dataA.stocks.length,
        countB: dataB.stocks.length
    };
};
