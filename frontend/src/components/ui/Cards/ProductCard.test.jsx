import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  const baseProduct = {
    id: 1,
    name: 'Test Product',
    stock: 5,
    price: 1999, // cents
    inCart: false,
  };

  const renderCard = (product = baseProduct) => {
    const addToCart = vi.fn();
    const removeFromCart = vi.fn();

    render(
      <ProductCard
        product={product}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    );

    return { addToCart, removeFromCart };
  };

  it("renders product name and price", () => {
    renderCard();

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toBeInTheDocument();
  });

  it('displays stock status when in stock', () => {
    renderCard();

    expect(screen.getByText(/In Stock/i)).toBeInTheDocument();
  });

  it('displays "Out of Stock" when stock is 0', () => {
    renderCard({ ...baseProduct, stock: 0 });

    expect(screen.getByText(/Out of Stock/i)).toBeInTheDocument();
  });

  it('calls addToCart when increase button is clicked', () => {
    const { addToCart } = renderCard({ ...baseProduct, inCart: true });

    const incBtn = screen.getByTestId('increase-button');
    fireEvent.click(incBtn);

    expect(addToCart).toHaveBeenCalledTimes(1);
  });

  it('calls removeFromCart when decrease button is clicked', () => {
    const { removeFromCart } = renderCard({ ...baseProduct, inCart: true });

    const decBtn = screen.getByTestId('decrease-button');
    fireEvent.click(decBtn);

    expect(removeFromCart).toHaveBeenCalledTimes(1);
  });

  it('disables buttons when out of stock', () => {
    renderCard({ ...baseProduct, stock: 0 });

    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
  });
});