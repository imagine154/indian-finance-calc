import { ImageResponse } from 'next/og'



export function generateImageMetadata() {
    return [
        {
            contentType: 'image/png',
            size: { width: 32, height: 32 },
            id: '32',
        },
        {
            contentType: 'image/png',
            size: { width: 48, height: 48 },
            id: '48',
        },
        {
            contentType: 'image/png',
            size: { width: 192, height: 192 },
            id: '192',
        },
        {
            contentType: 'image/png',
            size: { width: 512, height: 512 },
            id: '512',
        },
    ]
}

export default function Icon({ id }: { id: string }) {
    const size = id === '32' ? 32 : id === '48' ? 48 : id === '192' ? 192 : 512
    const isSmall = size <= 48

    // Match Navbar: rounded-lg (8px) on 32px box is 25% radius.
    // Icon size: w-5 (20px) on 32px box is 62.5%.
    // Stroke: Default Lucide is 2.

    const iconScale = 0.625 // 20/32
    const iconSize = size * iconScale
    const strokeWidth = 2
    const borderRadius = size * 0.25 // Match rounded-lg proportions

    return new ImageResponse(
        (
            <div
                style={{
                    background: '#2563EB', // blue-600
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: borderRadius,
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={iconSize}
                    height={iconSize}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M6 3h12" />
                    <path d="M6 8h12" />
                    <path d="m6 13 8.5 8" />
                    <path d="M6 13h3" />
                    <path d="M9 13c6.667 0 6.667-10 0-10" />
                </svg>
            </div>
        ),
        {
            width: size,
            height: size,
        }
    )
}
