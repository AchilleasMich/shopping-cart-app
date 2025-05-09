import { describe, test, expect } from 'vitest';
import { addItemToCart, removeItemFromCart } from './cart';

describe('addItemToCart', () => {
    test('adds a new product to an empty cart', () => {
        const existingCart = [];
        const productToAdd = { id: 1, name: 'Product 1' };

        const updatedCart = addItemToCart(existingCart, productToAdd);

        expect(updatedCart).toEqual([{ product_id: 1, quantity: 1 }]);
    });

    test('increments the quantity of an existing product in the cart', () => {
        const existingCart = [{ id: 1, quantity: 1 }];
        const productToAdd = { id: 1, name: 'Product 1' };

        const updatedCart = addItemToCart(existingCart, productToAdd);

        expect(updatedCart).toEqual([{ id: 1, quantity: 2 }]);
    });

    test('adds a new product to a cart with existing products', () => {
        const existingCart = [{ id: 1, quantity: 1 }];
        const productToAdd = { id: 2, name: 'Product 2' };

        const updatedCart = addItemToCart(existingCart, productToAdd);

        expect(updatedCart).toEqual([
            { id: 1, quantity: 1 },
            { product_id: 2, quantity: 1 },
        ]);
    });
});

describe('removeItemFromCart', () => {
    test('removes a product from the cart when quantity is 1', () => {
        const existingCart = [{ id: 1, quantity: 1 }];
        const product = { id: 1 };

        const updatedCart = removeItemFromCart(existingCart, product);

        expect(updatedCart).toEqual([]);
    });

    test('decrements the quantity of a product in the cart', () => {
        const existingCart = [{ id: 1, quantity: 2 }];
        const product = { id: 1 };

        const updatedCart = removeItemFromCart(existingCart, product);

        expect(updatedCart).toEqual([{ id: 1, quantity: 1 }]);
    });

    test('does not modify the cart if the product is not in the cart', () => {
        const existingCart = [{ id: 1, quantity: 1 }];
        const product = { id: 2 };

        const updatedCart = removeItemFromCart(existingCart, product);

        expect(updatedCart).toEqual([{ id: 1, quantity: 1 }]);
    });
});