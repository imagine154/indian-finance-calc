import { WealthState } from "@/store/useWealthStore";

const STORAGE_KEY = 'rupeetools-wealth-v1';

export const generateBackup = () => {
    try {
        const rawData = localStorage.getItem(STORAGE_KEY);
        if (!rawData) {
            throw new Error("No data found to backup");
        }

        const parsedData = JSON.parse(rawData);
        // We only want to backup the actual state, not the zustand metadata if possible, 
        // but restoring standard persist middleware structure is safer.
        // The persist middleware stores data like { state: ..., version: ... }

        const blob = new Blob([JSON.stringify(parsedData, null, 2)], { type: "application/json" });
        const date = new Date().toISOString().split('T')[0];
        const filename = `rupeetools-backup-${date}.json`;

        return { blob, filename };
    } catch (error) {
        console.error("Backup generation failed:", error);
        throw error;
    }
};

export const validateAndRestore = (file: File): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const result = event.target?.result as string;
                const parsed = JSON.parse(result);

                // Basic validation for Zustand persist structure
                // Expecting { state: { assets: ..., liabilities: ..., goals: ... }, version: ... }
                if (!parsed || typeof parsed !== 'object' || !parsed.state) {
                    throw new Error("Invalid backup file format: Missing state object");
                }

                const state = parsed.state as Partial<WealthState>;

                // Validate critical keys in the state object
                if (!state.assets || !state.liabilities || !state.goals) {
                    throw new Error("Invalid backup file: Missing critical data (assets, liabilities, or goals)");
                }

                // If valid, write to localStorage
                localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));

                // Force reload to apply changes (simplest way to sync zustand persist)
                // Or we could try to reload the store, but window.location.reload() is requested/safer for full state reset.
                resolve({ success: true, message: "Data restored successfully! Reloading..." });

            } catch (error) {
                console.error("Restore failed:", error);
                reject(error instanceof Error ? error : new Error("Unknown error during file parsing"));
            }
        };

        reader.onerror = () => {
            reject(new Error("Failed to read file"));
        };

        reader.readAsText(file);
    });
};

export const wipeData = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
    } catch (error) {
        console.error("Wipe data failed:", error);
        throw error;
    }
};
