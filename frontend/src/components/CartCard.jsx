import React from "react";
import PropTypes from "prop-types";
import Price from "./ui/Price";

const CartCard = (props) => {
  const { quantity, price, name } = props;

  return (
    <div
      className="border p-4 mb-4 flex justify-between items-center rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
    >
      <div className="text-lg font-semibold text-gray-800">{name}</div>
      <div className="text-sm text-gray-600">
      <p>Quantity: <span className="font-medium">{quantity}</span></p>
      <Price text="Total" price={price} variant="simple" />
      </div>
    </div>
  )
};

CartCard.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};

export default CartCard;