import React from "react";
import Button from "./Button";
import PropTypes from "prop-types";

const QuantityButton = (props) => {

  const { quantity, onIncrease, onDecrease, increamentEnabled, variant, children, ...rest } = props;
  const baseStyles = "px-4 py-2 mt-2"
  const variantStyles = variant === 'secondary'
    ? 'bg-secondary text-white'
    : variant === 'tertiary'
    ? 'bg-tertiary hover:bg-tertiary-hover text-tertiary border border-tertiary'
    : 'bg-primary text-white';
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