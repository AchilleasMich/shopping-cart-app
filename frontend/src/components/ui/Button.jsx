import React from 'react';
import PropTypes from 'prop-types'

function Button({ onClick, children, disabled, className, variant, ...rest }) {
  const baseStyles = 'px-4 py-2 mt-2 text-white';
  const variantStyles = variant === 'secondary'
    ? 'bg-green-500 hover:bg-green-700 disabled:bg-green-300'
    : 'bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300';

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
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
  variant: PropTypes.oneOf(['primary', 'secondary']),
};

Button.defaultProps = {
  disabled: false,
  className: '',
  variant: 'primary',
};

export default Button;
