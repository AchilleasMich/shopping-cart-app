import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router";
import Price from "./ui/Price";

function Header({ cart, total }) {
  // need location to track where I come from
  // so I can clear the cart from the order page
  const location = useLocation();
  const numberOfItems = cart.reduce((acc, c) => acc + c.quantity, 0);

  return (
    <header className="flex justify-between items-center bg-gray-100 p-4 shadow-md m-2">
      <Link to="/" className="flex items-center space-x-2" state={{ from: location.pathname }}>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Shopping Cart</h1>
      </Link>

      <div className="relative flex items-center space-x-4">
        {numberOfItems > 0 ? (
          <Link
            to="/cart"
            className="relative flex items-center space-x-2 text-gray-700 hover:text-gray-900"
          >
            <Price text="Total" price={total} variant="simple" />
            <span className="text-2xl">🛒</span>
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {numberOfItems}
            </span>
          </Link>
        ) : (
          <div className="flex items-center space-x-2 text-gray-500">
            <Price text="Total" price={total} variant="simple" />
            <span className="text-2xl">🛒</span>
          </div>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.number.isRequired,
    })
  ),
  total: PropTypes.number,
};

Header.defaultProps = {
  cart: [],
  total: 0,
};

export default Header;