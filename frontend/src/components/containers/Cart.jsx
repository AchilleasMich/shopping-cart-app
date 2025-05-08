import React from 'react'
import PropTypes from 'prop-types'

function Cart(props) {
  const { cart, coupons, onSelection } = props;
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
      <div className="flex items-center justify-center bg-gray-200 p-4 m-2">
        <div>
          <h2 className="text-xl font-bold">Cart Items</h2>
          {cart.map((item) => (
            <div key={item.id} className="border p-4 m-2">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${(item.price * item.quantity / 100).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
            <label htmlFor="coupon">Apply Coupon:</label>
            <select
              id="coupon"
              className="ml-2 p-1 border"
              onChange={onSelection}
            >
        <option value="">Select a coupon</option>
              {coupons?.map((coupon) => (
                <option key={coupon.code} value={coupon.code}>
                  {coupon.code}
                </option>
              ))}
            </select>
          </div>
    </div>
  )
}

Cart.propTypes = {
  cart: PropTypes.array,
  coupons: PropTypes.array,
  onSelection: PropTypes.func.isRequired,
}

Cart.defaultProps = {
  cart: [],
  coupons: [],
}

export default Cart
