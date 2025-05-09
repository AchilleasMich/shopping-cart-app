import { describe, it, expect } from "vitest";
import { initialState, reducer, ACTIONS } from "./reducers";

describe("reducer", () => {
  it("should return the initial state when an unknown action is provided", () => {
    const result = reducer(initialState, { type: "UNKNOWN_ACTION" });
    expect(result).toEqual(initialState);
  });

  it("should handle ADD_PRODUCTS action", () => {
    const products = [{ id: 1, name: "Product 1", stock: 10, price: 123 }];
    const result = reducer(initialState, { type: ACTIONS.ADD_PRODUCTS, payload: products });
    expect(result.products).toEqual(products);
  });

  it("should handle ADD_TO_CART action when product is not in the cart", () => {
    const state = {
      ...initialState,
      products: [{ id: 1, name: "Product 1", stock: 10, price: 50 }],
    };
    const payload = {
      updatedCart: [{ product_id: 1, quantity: 1 }],
      product: { id: 1, name: "Product 1", stock: 10, price: 50 },
    };
    const result = reducer(state, { type: ACTIONS.ADD_TO_CART, payload });

    expect(result.cart).toEqual([{ id: 1, name: "Product 1", product_id: 1, stock: 10, price: 50, quantity: 1 }]);
    expect(result.products[0].stock).toBe(9);
  });

  it("should not add to cart if product stock is 0", () => {
    const state = {
      ...initialState,
      products: [{ id: 1, name: "Product 1", stock: 0, price: 50 }],
    };
    const payload = {
      updatedCart: [{ product_id: 1, quantity: 1 }],
      product: { id: 1, name: "Product 1", stock: 0, price: 50 },
    };
    const result = reducer(state, { type: ACTIONS.ADD_TO_CART, payload });

    expect(result.cart).toStrictEqual([]);
    expect(result.products[0].stock).toBe(0);
  });

  it("should handle APPLY_COUPON action with a valid coupon", () => {
    const state = {
      ...initialState,
      cart: [{ id: 1, name: "Product 1", price: 100, quantity: 2 }],
      coupons: [{ code: "DISCOUNT10", type: "PERCENTAGE", amount: 10 }],
    };
    const result = reducer(state, { type: ACTIONS.APPLY_COUPON, payload: "DISCOUNT10" });

    expect(result.cartInfo.coupon).toBe("DISCOUNT10");
    expect(result.cartInfo.totalAmount).toBe(180); // 10% discount on 200
  });

  it("should handle APPLY_COUPON action with an invalid coupon", () => {
    const state = {
      ...initialState,
      cart: [{ id: 1, name: "Product 1", price: 100, quantity: 2 }],
      coupons: [{ code: "DISCOUNT10", type: "PERCENTAGE", amount: 10 }],
    };
    const result = reducer(state, { type: ACTIONS.APPLY_COUPON, payload: "INVALID_COUPON" });

    expect(result.cartInfo.coupon).toBe("INVALID_COUPON");
    expect(result.cartInfo.totalAmount).toBe(200); // No discount applied
  });

  it("should handle ADD_COUPONS action", () => {
    const coupons = [{ code: "DISCOUNT10", type: "PERCENTAGE", amount: 10 }];
    const result = reducer(initialState, { type: ACTIONS.ADD_COUPONS, payload: coupons });
    expect(result.coupons).toEqual(coupons);
  });

  it("should handle CREATE_CART action", () => {
    const cartId = "12345";
    const result = reducer(initialState, { type: ACTIONS.CREATE_CART, payload: cartId });
    expect(result.cartInfo.id).toBe(cartId);
  });

  it("should handle CLEAR_CART action", () => {
    const state = {
      ...initialState,
      cart: [{ id: 1, name: "Product 1", price: 100, quantity: 2 }],
      cartInfo: { id: "12345", coupon: "DISCOUNT10", totalAmount: 180 },
    };
    const result = reducer(state, { type: ACTIONS.CLEAR_CART });

    expect(result.cart).toEqual([]);
    expect(result.cartInfo).toEqual(initialState.cartInfo);
  });
});