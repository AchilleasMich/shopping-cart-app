import React from 'react'
import Button from '../ui/Button';
import { useShoppingCartContext } from '../../state/ShoppingCartContext.jsx';
import { ACTIONS } from "../../state/reducers.js";

function Cart() {
  const { state, dispatch } = useShoppingCartContext();
  const { cart, coupons, cartInfo } = state;
  return (
    <div className="container mx-auto max-w-3xl m-2 p-2">
      <h2 className="text-xl font-bold">Checkout</h2>
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between bg-gray-200 p-4">
        <div className="w-full">
        {cart.map((item) => (
          <div
            key={item.id}
            className="border p-4 m-2 flex justify-between"
          >
            <div className="text-xl justify-center font-bold">{item.name}</div>
            <div>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${((item.price * item.quantity) / 100).toFixed(2)}</p>
            </div>
          </div>
        ))}
        </div>
        <div className="flex flex-col items-end p-4">
          <div>
            <label htmlFor="coupon">Apply Coupon:</label>
            <select id="coupon" className="ml-2 p-1 border" onChange={(e) =>
                dispatch({
                  type: ACTIONS.APPLY_COUPON,
                  payload: e.target.value,
                })}>
              <option value="">Select a coupon</option>
              {coupons?.map((coupon) => (
                <option key={coupon.code} value={coupon.code}>
                  {coupon.code}
                </option>
              ))}
            </select>
          </div>
          <div>Total: ${(cartInfo.totalAmount/100).toFixed(2)}</div>
          <Button className="w-full">Proceed</Button>
        </div>
      </div>
    </div>
  );
}

export default Cart
