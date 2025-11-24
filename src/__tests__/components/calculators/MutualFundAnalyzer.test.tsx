import React from 'react';
import { render, screen } from '@testing-library/react';
import MutualFundAnalyzer from '@/components/calculators/MutualFundAnalyzer';

// Mock fetch
global.fetch = jest.fn();

describe('MutualFundAnalyzer', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => [],
        });
    });

    it('renders the main component structure', () => {
        render(<MutualFundAnalyzer />);
        expect(screen.getByText('Investment Type')).toBeInTheDocument();
    });

    it('renders investment type toggle buttons', () => {
        render(<MutualFundAnalyzer />);
        expect(screen.getByText('Mutual Funds')).toBeInTheDocument();
        expect(screen.getByText('ETFs')).toBeInTheDocument();
    });

    it('renders the search input field', () => {
        render(<MutualFundAnalyzer />);
        expect(screen.getByPlaceholderText(/Search from \d+ Funds.../)).toBeInTheDocument();
    });

    it('renders filter sections', () => {
        render(<MutualFundAnalyzer />);
        expect(screen.getByText('Investment Type')).toBeInTheDocument();
        expect(screen.getByText('Search Scheme')).toBeInTheDocument();
        expect(screen.getByText('Filters')).toBeInTheDocument();
    });

    it('renders the calculate button', () => {
        render(<MutualFundAnalyzer />);
        expect(screen.getByText('Calculate Returns')).toBeInTheDocument();
    });

    it('calls fetch on component mount', () => {
        render(<MutualFundAnalyzer />);
        expect(global.fetch).toHaveBeenCalled();
    });

    it('fetches schemes with correct URL', () => {
        render(<MutualFundAnalyzer />);
        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/mutual-fund/schemes'));
    });
});
