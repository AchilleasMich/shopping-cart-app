import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button Component', () => {
  test('renders the button with default props', () => {
      render(<Button onClick={() => {}}>Click Me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-primary hover:bg-primary-hover disabled:bg-primary-disabled text-primary-text');
      expect(button).not.toBeDisabled();
  });

  test('renders the button with secondary variant', () => {
      render(<Button onClick={() => {}} variant="secondary">Click Me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toHaveClass('bg-secondary hover:bg-secondary-hover disabled:bg-secondary-disabled text-secondary-text');
  });

  test('renders the button with tertiary variant', () => {
      render(<Button onClick={() => {}} variant="tertiary">Click Me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toHaveClass('bg-tertiary hover:bg-tertiary-hover text-tertiary-text border border-tertiary-border');
  });

  test('renders the button as disabled', () => {
      render(<Button onClick={() => {}} disabled>Click Me</Button>);
      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toBeDisabled();
  });

  test('renders the button with fullWidth prop', () => {
      render(<Button onClick={() => {}} fullWidth>Click Me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toHaveClass('w-full');
  });

  test('applies additional className', () => {
      render(<Button onClick={() => {}} className="custom-class">Click Me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toHaveClass('custom-class');
  });
      
  test('calls onClick handler when clicked', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
  });
});