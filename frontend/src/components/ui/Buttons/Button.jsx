import React from 'react';
import PropTypes from 'prop-types';

function Button({ onClick, children, disabled, className, variant, fullWidth, ...rest }) {
  const baseStyles = 'px-4 py-2 mt-2 rounded rounded-lg shadow-md';
  const variantStyles = variant === 'secondary'
    ? 'bg-secondary hover:bg-secondary-hover disabled:bg-secondary-disabled text-secondary-text'
    : variant === 'tertiary'
    ? 'bg-tertiary hover:bg-tertiary-hover text-tertiary-text border border-tertiary-border'
    : 'bg-primary hover:bg-primary-hover disabled:bg-primary-disabled text-primary-text';
  const fullWidthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${fullWidthStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  fullWidth: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
  className: '',
  variant: 'primary',
  fullWidth: false,
};

export default Button;