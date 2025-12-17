


export function DashboardSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Hero Card Skeleton */}
            <div className="h-64 w-full bg-slate-200 rounded-3xl" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Chart Skeleton */}
                <div className="h-80 bg-slate-100 rounded-2xl" />

                {/* Goals Grid Skeleton */}
                <div className="space-y-4">
                    <div className="h-8 w-48 bg-slate-200 rounded" />
                    <div className="grid grid-cols-1 gap-4">
                        <div className="h-40 bg-slate-100 rounded-xl" />
                        <div className="h-40 bg-slate-100 rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    )
}

// Simple Skeleton UI component if not already present in the project
// If "@/components/ui/skeleton" doesn't exist, we can use a simple div fallback or create it.
// Assuming for now we might need to rely on standard HTML/Tailwind if shadcn skeleton isn't there.
// I'll stick to standard tailwind classes just in case validation fails.
