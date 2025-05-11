import React, { useEffect } from 'react'
import Button from '../ui/Buttons/Button.jsx';
import CartCard from '../ui/Cards/CartCard.jsx';
import { useShoppingCartContext } from '../../state/ShoppingCartContext.jsx';
import { ACTIONS } from "../../state/reducers.js";
import { useNavigate } from 'react-router';
import { submitOrder } from '../../utilities/orders.js';
import Price from '../ui/Price.jsx';
import Select from '../ui/Select/Select.jsx';

function Cart() {
  const { state, dispatch } = useShoppingCartContext();
  const { cart, coupons, cartInfo } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const createOrder = async () => {
    const orderId = await submitOrder(state.cartInfo.id, state.cartInfo.coupon);
    // The else is required to avoid instanity
    if (orderId) {
      navigate("/order", { state: { orderId } });
    } else {
      navigate("/order");
    }
  }

  const handleCouponChange = (e) => 
    dispatch({
      type: ACTIONS.APPLY_COUPON,
      payload: e.target.value,
    })

  const couponCodes = coupons?.map((coupon) => coupon.code);

  return (
    <div className="container mx-auto max-w-2xl m-2 p-2">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="w-full">
          {cart.map((item) => (
            <CartCard
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
            />
          ))}
        </div>
        <Select
          text="Apply Coupon"
          onChange={handleCouponChange}
          value={state.cartInfo.coupon ?? ""}
          options={couponCodes}
          defaultOption={"Select a coupon"}
        />
        <div className="flex flex-col items-end mt-2">
          <Price text="Total" price={cartInfo.totalAmount} variant="bold" />
          <Button
            fullWidth
            className="mb-2 bg-blue-500 text-white hover:bg-blue-600"
            onClick={createOrder}
          >
            Proceed
          </Button>
          <Button
            fullWidth
            variant="tertiary"
            className="text-blue-500 hover:underline"
            onClick={() => navigate("/")}
          >
            Continue shopping
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart
