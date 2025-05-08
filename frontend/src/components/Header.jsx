import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

function Header(props) {
  const { cart, total } = props;
  console.log("props", props);
  const numberOfItems = cart.reduce((acc, c) => acc += c.quantity, 0);

  return (
    <div>
      <Link to="/cart">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
      </Link>
      <p>Quantity: {numberOfItems}</p>
      <p>Total: ${(total/100).toFixed(2)}</p>
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