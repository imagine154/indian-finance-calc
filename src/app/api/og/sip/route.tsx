import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    // Extract params with defaults
    const amount = Number(searchParams.get('amount')) || 5000;
    const rate = Number(searchParams.get('rate')) || 12;
    const years = Number(searchParams.get('years')) || 10;

    // Calculate SIP Future Value
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    const futureValue = amount * ((((1 + monthlyRate) ** months) - 1) / monthlyRate) * (1 + monthlyRate);

    // Format Helpers
    const formatCurrency = (value: number) => {
        return `Rs. ${new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 0,
        }).format(value)}`;
    };

    const formatCompact = (value: number) => {
        if (value >= 10000000) {
            return `Rs. ${(value / 10000000).toFixed(2)} Cr`;
        } else if (value >= 100000) {
            return `Rs. ${(value / 100000).toFixed(2)} Lakhs`;
        } else {
            return formatCurrency(value);
        }
    };

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(to bottom right, #ffffff, #eff6ff)',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Branding Top Left */}
                <div
                    style={{
                        position: 'absolute',
                        top: 40,
                        left: 40,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            background: '#2563EB', // Blue 600
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 10,
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 24,
                        }}
                    >
                        Rs.
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 'bold', color: '#1E293B' }}>
                        RupeeTools
                    </div>
                </div>

                {/* Main Card */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'white',
                        padding: '40px 60px',
                        borderRadius: 30,
                        boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.15)',
                        border: '1px solid #E2E8F0',
                        width: '80%',
                    }}
                >
                    <div style={{ fontSize: 24, color: '#64748B', fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '2px' }}>
                        SIP Growth Calculator
                    </div>

                    <div style={{ fontSize: 64, fontWeight: 'bold', color: '#1E293B', marginBottom: 20 }}>
                        {formatCompact(futureValue)}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 10 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 20px' }}>
                            <span style={{ fontSize: 18, color: '#64748B', marginBottom: 5 }}>Monthly Investment</span>
                            <span style={{ fontSize: 28, fontWeight: 'bold', color: '#2563EB' }}>{formatCurrency(amount)}</span>
                        </div>
                        <div style={{ width: 1, height: 50, background: '#E2E8F0' }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 20px' }}>
                            <span style={{ fontSize: 18, color: '#64748B', marginBottom: 5 }}>Duration</span>
                            <span style={{ fontSize: 28, fontWeight: 'bold', color: '#2563EB' }}>{years} Years</span>
                        </div>
                        <div style={{ width: 1, height: 50, background: '#E2E8F0' }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 20px' }}>
                            <span style={{ fontSize: 18, color: '#64748B', marginBottom: 5 }}>Rate</span>
                            <span style={{ fontSize: 28, fontWeight: 'bold', color: '#2563EB' }}>{rate}%</span>
                        </div>
                    </div>
                </div>

                <div style={{ position: 'absolute', bottom: 40, fontSize: 16, color: '#94A3B8' }}>
                    Calculate accurately at rupeetools.in
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
