import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StockAverageCalculator } from '../../../components/calculators/StockAverageCalculator';

// Mock Lucide icons to avoid rendering issues in tests
jest.mock('lucide-react', () => ({
    Plus: () => <div data-testid="icon-plus" />,
    Trash2: () => <div data-testid="icon-trash" />,
    RefreshCw: () => <div data-testid="icon-refresh" />,
    Calculator: () => <div data-testid="icon-calculator" />,
    TrendingDown: () => <div data-testid="icon-trending" />,
    ArrowRight: () => <div data-testid="icon-arrow" />,
    Target: () => <div data-testid="icon-target" />,
}));

describe('StockAverageCalculator', () => {
    beforeEach(() => {
        render(<StockAverageCalculator />);
    });

    it('renders correctly with default mode (Average Calculator)', () => {
        expect(screen.getByText(/Find Average/i)).toBeInTheDocument();
        expect(screen.getByText(/Find Qty Needed/i)).toBeInTheDocument();
        expect(screen.getByText(/Purchase Tranches/i)).toBeInTheDocument();
        expect(screen.getByText(/Effective Average Price/i)).toBeInTheDocument();
    });

    it('calculates average correctly in Mode 1', () => {
        const inputs = screen.getAllByPlaceholderText('0');

        // Row 1
        // Index 0: Row 1 Price, Index 1: Row 1 Quantity
        fireEvent.change(inputs[0], { target: { value: '100' } });
        fireEvent.change(inputs[1], { target: { value: '10' } });

        // Row 2: 200 @ 10
        // Index 2: Row 2 Price, Index 3: Row 2 Quantity
        fireEvent.change(inputs[2], { target: { value: '200' } });
        fireEvent.change(inputs[3], { target: { value: '10' } });

        // Total Cost: (100*10) + (200*10) = 1000 + 2000 = 3000
        // Total Qty: 20
        // Avg: 150

        // Use regex to be safer with currency symbols and exact formatting
        expect(screen.getByText(/150\.00/)).toBeInTheDocument();
        expect(screen.getByText(/3,000\.00/)).toBeInTheDocument();

        // Total quantity 20. 
        // We can look for the value specifically in the result section if we add test-ids, 
        // but for now let's just assert 20 exists and is visible.
        // There are inputs with '10' and '10', so '20' should be unique to the result or at least present.
        expect(screen.getByText(/^20$/)).toBeInTheDocument();
    });

    it('switches to Target Averager mode', () => {
        const targetTab = screen.getByText(/Find Qty Needed/i);
        fireEvent.click(targetTab);

        expect(screen.getByText(/Target Averaging/i)).toBeInTheDocument();
        expect(screen.getByText(/Quantity To Buy/i)).toBeInTheDocument();
    });

    it('calculates quantity needed correctly in Mode 2', () => {
        // Switch to Mode 2
        fireEvent.click(screen.getByText(/Find Qty Needed/i));

        // Scenario:
        // Avg: 1000, Qty: 100
        // CMP: 500
        // Target: 900

        // Formula: NewQty = (CurQty * (Target - CurAvg)) / (CMP - Target)
        // = (100 * (900 - 1000)) / (500 - 900)
        // = (100 * -100) / -400
        // = -10000 / -400 = 25

        const curAvgInput = screen.getByPlaceholderText('Ex: 500');
        const curQtyInput = screen.getByPlaceholderText('Ex: 100');
        const marketPriceInput = screen.getByPlaceholderText('Current Market Price');
        const targetPriceInput = screen.getByPlaceholderText('Desired Goal');

        fireEvent.change(curAvgInput, { target: { value: '1000' } });
        fireEvent.change(curQtyInput, { target: { value: '100' } });
        fireEvent.change(marketPriceInput, { target: { value: '500' } });
        fireEvent.change(targetPriceInput, { target: { value: '900' } });

        expect(screen.getByText('25')).toBeInTheDocument(); // Expecting precise 25
    });

    it('shows error when target is impossible (Averaging Down but CMP > Target)', () => {
        fireEvent.click(screen.getByText(/Find Qty Needed/i));

        // Avg: 100
        // Target: 90 (Want to average down)
        // CMP: 95 (Below Avg, but ABOVE Target. Impossible to reach 90 by buying at 95)

        const curAvgInput = screen.getByPlaceholderText('Ex: 500');
        const curQtyInput = screen.getByPlaceholderText('Ex: 100');
        const marketPriceInput = screen.getByPlaceholderText('Current Market Price');
        const targetPriceInput = screen.getByPlaceholderText('Desired Goal');

        fireEvent.change(curAvgInput, { target: { value: '100' } });
        fireEvent.change(curQtyInput, { target: { value: '10' } });
        fireEvent.change(marketPriceInput, { target: { value: '95' } });
        fireEvent.change(targetPriceInput, { target: { value: '90' } });

        expect(screen.getByText(/New buy price is higher than target/i)).toBeInTheDocument();
    });
});
