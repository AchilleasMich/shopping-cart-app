import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import Select from './Select';

describe('Select Component', () => {
  it('renders the label text', () => {
    render(
      <Select
        text="Select a coupon"
        options={['Coupon1', 'Coupon2']}
        onChange={() => {}}
        value=""
        defaultOption="Choose an option"
      />
    );

    expect(screen.getByText('Select a coupon')).toBeInTheDocument();
  });

  it('renders the default option', () => {
    render(
      <Select
        text="Select a coupon"
        options={['Coupon1', 'Coupon2']}
        onChange={() => {}}
        value=""
        defaultOption="Choose an option"
      />
    );

    expect(screen.getByText('Choose an option')).toBeInTheDocument();
  });

  it('renders all options passed to it', () => {
    render(
      <Select
        text="Select a coupon"
        options={['Coupon1', 'Coupon2']}
        onChange={() => {}}
        value=""
        defaultOption="Choose an option"
      />
    );

    expect(screen.getByText('Coupon1')).toBeInTheDocument();
    expect(screen.getByText('Coupon2')).toBeInTheDocument();
  });

  it('calls onChange when an option is selected', () => {
    const handleChange = vi.fn();
    render(
      <Select
        text="Select a coupon"
        options={['Coupon1', 'Coupon2']}
        onChange={handleChange}
        value=""
        defaultOption="Choose an option"
      />
    );

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Coupon1' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('sets the correct value when an option is selected', () => {
    const handleChange = vi.fn();
    render(
      <Select
        text="Select a coupon"
        options={['Coupon1', 'Coupon2']}
        onChange={handleChange}
        value="Coupon1"
        defaultOption="Choose an option"
      />
    );

    expect(screen.getByRole('combobox')).toHaveValue('Coupon1');
  });
});