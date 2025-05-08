import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

function Header(props) {
  const { cart, total } = props;
  const numberOfItems = cart.reduce((acc, c) => acc += c.quantity, 0);
  return (
    <div className="flex justify-between bg-gray-200 p-2 m-2">
      <Link to="/">
        <h1 className="text-2xl font-bold items-center">Shopping Cart</h1>
      </Link>
      {numberOfItems > 0 ? (
      <Link to="/cart" className="relative flex items-center space-x-2 text-gray-700 hover:text-gray-900">
        <span className="font-semibold">${(total/100).toFixed(2)}</span>
        <span className="text-xl">🛒</span>
          {numberOfItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {numberOfItems}
          </span>
          )}
      </Link>) : (
        <div className="relative flex items-center space-x-2 text-gray-700 hover:text-gray-900">
          <span className="font-semibold">$0.00</span>
          <span className="text-xl">🛒</span>
        </div>
      )}
    </div>
  )
}

Header.propTypes = {
  cart: PropTypes.array,
  total: PropTypes.number,
}

Header.defaultProps = {
  cart: [],
  total: 0,
}
export default Header