import React from "react";
import Button from "./Button";
import PropTypes from "prop-types";

const QuantityButton = (props) => {

  const { quantity, onIncrease, onDecrease, increamentEnabled, variant, children, ...rest } = props;
  const baseStyles = "px-4 py-2 mt-2"
  const variantStyles = variant === 'secondary'
    ? 'bg-green-300 text-white'
    : variant === 'tertiary'
    ? 'bg-white hover:bg-blue-100 blue-500 text-blue-700 border border-blue-500'
    : 'bg-blue-300 text-white';
  if (!increamentEnabled)
    return <Button onClick={onIncrease} variant={variant} {...rest}>{children}</Button>

  return (
    <div className={`w-full flex items-center justify-between gap-0`}>
      <Button onClick={onDecrease} variant={variant} className={"rounded-r-none"}>
        −
      </Button>
      <span className={`flex-1 text-center font-medium ${baseStyles} ${variantStyles}`}>{quantity}</span>
      <Button onClick={onIncrease} disabled={quantity === 0} variant={variant} className={"rounded-l-none"}>
        +
      </Button>
    </div>
  );
}

QuantityButton.propTypes = {
  quantity: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  increamentEnabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  children: PropTypes.node.isRequired,
};

export default QuantityButton;