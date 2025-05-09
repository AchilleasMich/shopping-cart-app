import React from "react";
import Button from "./Button";
import PropTypes from "prop-types";

const QuantityButton = (props) => {

  const { quantity, onIncrease, onDecrease, increamentEnabled, ...rest } = props;
  if (!increamentEnabled)
    return <Button onClick={onIncrease} {...rest}>Add to Cart</Button>

  return (
    <div className={`w-full flex items-center justify-between gap-2`}>
      <Button onClick={onDecrease} >
        −
      </Button>
      <span className="flex-1 text-center font-medium">{quantity}</span>
      <Button onClick={onIncrease} disabled={quantity === 0}>
        +
      </Button>
    </div>
  );
}

QuantityButton.propTypes = {
  quantity: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
};

export default QuantityButton;