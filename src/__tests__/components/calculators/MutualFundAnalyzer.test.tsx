import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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

    it('renders the main component structure', async () => {
        render(<MutualFundAnalyzer />);
        await waitFor(() => expect(screen.getByText('Investment Type')).toBeInTheDocument());
    });

    it('renders investment type toggle buttons', async () => {
        render(<MutualFundAnalyzer />);
        await waitFor(() => expect(screen.getByText('Mutual Funds')).toBeInTheDocument());
        expect(screen.getByText('ETFs')).toBeInTheDocument();
    });

    it('renders the search input field', async () => {
        render(<MutualFundAnalyzer />);
        await waitFor(() => expect(screen.getByPlaceholderText(/Search from \d+ Funds.../)).toBeInTheDocument());
    });

    it('renders filter sections', async () => {
        render(<MutualFundAnalyzer />);
        await waitFor(() => expect(screen.getByText('Investment Type')).toBeInTheDocument());
        expect(screen.getByText('Search Scheme')).toBeInTheDocument();
        expect(screen.getByText('Filters')).toBeInTheDocument();
    });

    it('renders the calculate button', async () => {
        render(<MutualFundAnalyzer />);
        await waitFor(() => expect(screen.getByText('Calculate Returns')).toBeInTheDocument());
    });

    it('calls fetch on component mount', async () => {
        render(<MutualFundAnalyzer />);
        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    });

    it('fetches schemes with correct URL', async () => {
        render(<MutualFundAnalyzer />);
        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/mutual-fund/schemes')));
    });
});
