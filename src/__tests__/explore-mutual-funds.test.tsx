import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MutualFundExplorer from '../components/explorers/MutualFundExplorer';

// Mock the data
jest.mock('@/data/mutual-funds.json', () => [
    {
        name: "Test Fund A",
        slug: "test-fund-a",
        amc: "Test AMC",
        category: "Equity",
        subCategory: "Large Cap",
        rating: 5,
        risk: "Very High",
        returns: { "1Y": 10, "3Y": 15, "5Y": 20 },
        expenseRatio: 1.0,
        aum: 1000,
        nav: 50,
        minSip: 500,
        managers: ["Manager A"]
    },
    {
        name: "Test Fund B",
        slug: "test-fund-b",
        amc: "Test AMC",
        category: "Debt",
        subCategory: "Liquid",
        rating: 3,
        risk: "Low",
        returns: { "1Y": 5, "3Y": 6, "5Y": 7 },
        expenseRatio: 0.5,
        aum: 2000,
        nav: 20,
        minSip: 100,
        managers: ["Manager B"]
    }
]);

// Mock child components to avoid deep rendering issues
jest.mock('../components/explorers/FundCard', () => {
    return function DummyFundCard({ fund }: { fund: any }) {
        return <div data-testid="fund-card">{fund.name}</div>;
    };
});

jest.mock('../components/explorers/ManagerCard', () => {
    return function DummyManagerCard({ manager }: { manager: any }) {
        return <div data-testid="manager-card">{manager.name}</div>;
    };
});

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
    Search: () => <div data-testid="search-icon" />,
    Filter: () => <div data-testid="filter-icon" />,
    ArrowDownUp: () => <div data-testid="sort-icon" />,
    Loader2: () => <div data-testid="loader-icon" />,
    Info: () => <div data-testid="info-icon" />,
}));

describe('MutualFundExplorer', () => {
    it('renders the explorer with initial state', () => {
        render(<MutualFundExplorer />);

        expect(screen.getByPlaceholderText('Search funds or AMCs...')).toBeInTheDocument();
        expect(screen.getByText('All Funds')).toBeInTheDocument();
        expect(screen.getByText('Top Performers')).toBeInTheDocument();
    });

    it('filters funds by search query', async () => {
        render(<MutualFundExplorer />);

        const searchInput = screen.getByPlaceholderText('Search funds or AMCs...');
        fireEvent.change(searchInput, { target: { value: 'Test Fund A' } });

        await waitFor(() => {
            expect(screen.getByText('Test Fund A')).toBeInTheDocument();
            expect(screen.queryByText('Test Fund B')).not.toBeInTheDocument();
        });
    });

    it('switches to Best Managers tab', async () => {
        render(<MutualFundExplorer />);

        const managersTab = screen.getByText('Best Managers');
        fireEvent.click(managersTab);

        await waitFor(() => {
            expect(screen.getByPlaceholderText('Search managers...')).toBeInTheDocument();
            expect(screen.getByText('Manager A')).toBeInTheDocument();
        });
    });
});
