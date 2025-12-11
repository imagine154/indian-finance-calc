import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
    width: 180,
    height: 180,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    background: '#2563EB', // blue-600
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '32px', // Softer round for larger icon
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100" // Larger icon for 180px
                    height="100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M6 3h12" />
                    <path d="M6 8h12" />
                    <path d="M9 13h12" />
                    <path d="M9 13c6.667 0 6.667-10 0-10" />
                    <path d="M9 13l6.5 8" />
                </svg>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    )
}
