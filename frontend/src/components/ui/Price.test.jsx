import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Price from './Price';

describe('Price component', () => {
  it('renders with default props (simple variant)', () => {
    render(<Price price={1999} />);
    expect(screen.getByText(/Price:/i)).toBeInTheDocument();
    expect(screen.getByText(/19.99/)).toBeInTheDocument();
  });

  it('renders with "simple" variant explicitly', () => {
    render(<Price text="Cost" price={1500} variant="simple" />);
    expect(screen.getByText('Cost: $15.00')).toBeInTheDocument();
  });

  it('renders with "procuct" variant', () => {
    render(<Price price={2500} variant="procuct" />);
    const priceEl = screen.getByText('$25.00');
    expect(priceEl).toBeInTheDocument();
    expect(priceEl).toHaveClass('text-green-600');
  });

  it('renders with fallback (bold) variant', () => {
    render(<Price price={999} variant="bold" />);
    const priceEl = screen.getByText('$9.99');
    expect(priceEl).toBeInTheDocument();
    expect(priceEl).toHaveClass('text-blue-600');
  });

  it('does not render label if `text` is empty', () => {
    render(<Price price={800} text="" />);
    expect(screen.getByText('$8.00')).toBeInTheDocument();
  });

  it('rounds and formats price correctly', () => {
    render(<Price price={1234} />);
    expect(screen.getByText(/12.34/)).toBeInTheDocument();
  });
});