export type PivotMethod = 'Standard' | 'Fibonacci' | 'Camarilla' | 'Woodie';

export interface PivotInput {
    high: number;
    low: number;
    close: number;
    method: PivotMethod;
}

export interface PivotPointsResult {
    pivot: number; // The main pivot point (P)
    r1: number;
    r2: number;
    r3: number;
    r4?: number; // Camarilla often uses R4/S4 as breakout targets
    s1: number;
    s2: number;
    s3: number;
    s4?: number; // Camarilla often uses R4/S4 as breakout targets
}

export const calculatePivotPoints = (input: PivotInput): PivotPointsResult => {
    const { high, low, close, method } = input;
    const range = high - low;

    let pivot = 0;
    let r1 = 0, r2 = 0, r3 = 0, r4 = 0;
    let s1 = 0, s2 = 0, s3 = 0, s4 = 0;

    switch (method) {
        case 'Standard':
            pivot = (high + low + close) / 3;
            r1 = (2 * pivot) - low;
            s1 = (2 * pivot) - high;
            r2 = pivot + (high - low);
            s2 = pivot - (high - low);
            r3 = high + 2 * (pivot - low);
            s3 = low - 2 * (high - pivot);
            break;

        case 'Fibonacci':
            pivot = (high + low + close) / 3;
            r1 = pivot + (range * 0.382);
            s1 = pivot - (range * 0.382);
            r2 = pivot + (range * 0.618);
            s2 = pivot - (range * 0.618);
            r3 = pivot + (range * 1.000);
            s3 = pivot - (range * 1.000);
            break;

        case 'Camarilla':
            pivot = (high + low + close) / 3;
            r3 = close + (range * 1.1) / 4;
            s3 = close - (range * 1.1) / 4;
            r4 = close + (range * 1.1) / 2;
            s4 = close - (range * 1.1) / 2;
            r2 = close + (range * 1.1) / 6;
            s2 = close - (range * 1.1) / 6;
            r1 = close + (range * 1.1) / 12;
            s1 = close - (range * 1.1) / 12;
            break;

        case 'Woodie':
            pivot = (high + low + (2 * close)) / 4;
            r1 = (2 * pivot) - low;
            s1 = (2 * pivot) - high;
            r2 = pivot + range;
            s2 = pivot - range;
            // Woodie typically doesn't define R3/S3 as standard, but we can extrapolate or leave as 0
            r3 = high + 2 * (pivot - low); // Using standard extrapolation for UI consistency
            s3 = low - 2 * (high - pivot);
            break;
    }

    return {
        pivot,
        r1, r2, r3, r4: method === 'Camarilla' ? r4 : undefined,
        s1, s2, s3, s4: method === 'Camarilla' ? s4 : undefined,
    };
};
