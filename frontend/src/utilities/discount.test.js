import { describe, it, expect } from "vitest";
import { calculateTotal } from "./discounts";

describe("calculateTotal", () => {
  it("should return 0 if the cart is empty", () => {
    expect(calculateTotal([])).toBe(0);
  });

  it("should calculate the total without a coupon", () => {
    const cart = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 1 },
    ];
    expect(calculateTotal(cart)).toBe(25);
  });

  it("should apply a FLAT coupon correctly", () => {
    const cart = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 1 },
    ];
    const coupon = { type: "FLAT", amount: 5 };
    expect(calculateTotal(cart, coupon)).toBe(20);
  });

  it("should not return a negative total with a FLAT coupon", () => {
    const cart = [{ price: 5, quantity: 1 }];
    const coupon = { type: "FLAT", amount: 10 };
    expect(calculateTotal(cart, coupon)).toBe(0);
  });

  it("should apply a PERCENTAGE coupon correctly", () => {
    const cart = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 1 },
    ];
    const coupon = { type: "PERCENTAGE", amount: 20 }; // 20% off
    expect(calculateTotal(cart, coupon)).toBe(20);
  });

  it("should apply a BOGO coupon correctly", () => {
    const cart = [
      { price: 10, quantity: 3 }, // 2 for 1, 1 extra
      { price: 5, quantity: 2 },  // 2 for 1
    ];
    const coupon = { type: "BOGO" };
    expect(calculateTotal(cart, coupon)).toBe(25);
  });

  it("should return the total if an unknown coupon type is provided", () => {
    const cart = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 1 },
    ];
    const coupon = { type: "UNKNOWN", amount: 10 };
    expect(calculateTotal(cart, coupon)).toBe(25);
  });
});