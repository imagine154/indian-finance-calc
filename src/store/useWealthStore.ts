import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect, useState } from 'react';

// --- Interfaces ---

export interface Assets {
    bank: number;
    mutualFunds: number;
    stocks: number;
    gold: number;
    realEstate: number;
    crypto: number;
    epf: number;
}

export interface Liabilities {
    homeLoan: number;
    carLoan: number;
    personalLoan: number;
    creditCard: number;
}

export interface SavedGoal {
    id: string;
    title: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
    type: 'SIP' | 'Lumpsum';
}

export interface WealthState {
    assets: Assets;
    liabilities: Liabilities;
    goals: SavedGoal[];

    // Actions
    updateAsset: (category: keyof Assets, value: number) => void;
    updateLiability: (category: keyof Liabilities, value: number) => void;
    addGoal: (goal: SavedGoal) => void;
    removeGoal: (id: string) => void;
    resetData: () => void;
}

// --- Initial Values ---

const initialAssets: Assets = {
    bank: 0,
    mutualFunds: 0,
    stocks: 0,
    gold: 0,
    realEstate: 0,
    crypto: 0,
    epf: 0,
};

const initialLiabilities: Liabilities = {
    homeLoan: 0,
    carLoan: 0,
    personalLoan: 0,
    creditCard: 0,
};

// --- Store Implementation ---

export const useWealthStore = create<WealthState>()(
    persist(
        (set) => ({
            assets: initialAssets,
            liabilities: initialLiabilities,
            goals: [],

            updateAsset: (category, value) =>
                set((state) => ({
                    assets: { ...state.assets, [category]: value },
                })),

            updateLiability: (category, value) =>
                set((state) => ({
                    liabilities: { ...state.liabilities, [category]: value },
                })),

            addGoal: (goal) =>
                set((state) => ({
                    goals: [...state.goals, goal],
                })),

            removeGoal: (id) =>
                set((state) => ({
                    goals: state.goals.filter((g) => g.id !== id),
                })),

            resetData: () =>
                set({
                    assets: initialAssets,
                    liabilities: initialLiabilities,
                    goals: [],
                }),
        }),
        {
            name: 'rupeetools-wealth-v1',
            skipHydration: true, // Prevent hydration mismatches by skipping auto-hydration
        }
    )
);

// --- Hooks & Selectors ---

/**
 * Hook to handle manual hydration to avoid Next.js server/client mismatches.
 * Returns true when the store has been rehydrated.
 */
export const useWealthStoreHydration = () => {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        // Manually trigger rehydration on mount
        const unsub = useWealthStore.persist.onFinishHydration(() => setHydrated(true));
        useWealthStore.persist.rehydrate();
        return () => unsub();
    }, []);

    return hydrated;
};

// Explicit Selectors for consumption in components or via simple hooks
export const selectTotalAssets = (state: WealthState) =>
    Object.values(state.assets).reduce((acc, curr) => acc + curr, 0);

export const selectTotalLiabilities = (state: WealthState) =>
    Object.values(state.liabilities).reduce((acc, curr) => acc + curr, 0);

export const selectNetWorth = (state: WealthState) => {
    const totalAssets = selectTotalAssets(state);
    const totalLiabilities = selectTotalLiabilities(state);
    return totalAssets - totalLiabilities;
};

// Hook wrappers for convenience (optional, but requested implicitly by "easier to use")
export const useTotalAssets = () => useWealthStore(selectTotalAssets);
export const useTotalLiabilities = () => useWealthStore(selectTotalLiabilities);
export const useNetWorth = () => useWealthStore(selectNetWorth);
