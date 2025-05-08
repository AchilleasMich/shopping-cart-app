import { describe, it, expect } from "vitest";
import { calculateTotal } from "./discounts";

describe("calculateTotal", () => {
    it("should return the total price of the cart without any discounts", () => {
        const cart = [
            { price: 1000, quantity: 2 },
            { price: 500, quantity: 1 },
        ];
        const total = calculateTotal(cart);
        expect(total).toBe(2500);
    });

    it("should apply a flat discount correctly", () => {
        const cart = [
            { price: 1000, quantity: 2 },
            { price: 500, quantity: 1 },
        ];
        const coupon = { type: "FLAT", amount: 500 };
        const total = calculateTotal(cart, coupon);
        expect(total).toBe(2000);
    });

    it("should not allow the total to go below zero with a flat discount", () => {
        const cart = [
            { price: 1000, quantity: 1 },
        ];
        const coupon = { type: "FLAT", amount: 2000 };
        const total = calculateTotal(cart, coupon);
        expect(total).toBe(0);
    });

    it("should apply a percentage discount correctly", () => {
        const cart = [
            { price: 1000, quantity: 2 },
            { price: 500, quantity: 1 },
        ];
        const coupon = { type: "PERCENTAGE", amount: 20 };
        const total = calculateTotal(cart, coupon);
        expect(total).toBe(2000);
    });

    it("should apply a BOGO discount correctly", () => {
        const cart = [
            { price: 1000, quantity: 2 },
            { price: 500, quantity: 3 },
        ];
        const coupon = { type: "BOGO" };
        const total = calculateTotal(cart, coupon);
        expect(total).toBe(2000);
    });

    it("should handle an empty cart", () => {
        const cart = [];
        const total = calculateTotal(cart);
        expect(total).toBe(0);
    });

    it("should return the total price when an invalid coupon type is provided", () => {
        const cart = [
            { price: 1000, quantity: 2 },
            { price: 500, quantity: 1 },
        ];
        const coupon = { type: "INVALID", amount: 100 };
        const total = calculateTotal(cart, coupon);
        expect(total).toBe(2500);
    });
});