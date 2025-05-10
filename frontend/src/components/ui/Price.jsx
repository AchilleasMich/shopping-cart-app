import React from 'react'
import PropTypes from 'prop-types'

const Price = (props) => {
  const { text = "Price", price, variant = "simple" } = props;
  if (variant === 'simple') {
    return (
      <div className="font-medium">
        {text && `${text}:`} ${(price / 100).toFixed(2)}
      </div>
    );
  }

  if (variant === "procuct") {
    return (
      <div className="text-lg font-semibold mb-1">
        <span className="text-green-600">${(price / 100).toFixed(2)}</span>
      </div>
    );
  }

  return (
    <div className="text-lg font-semibold mb-4 text-gray-800">
      {text && `${text}:`} <span className="text-blue-600">${(price / 100).toFixed(2)}</span>
    </div>
  );
}

Price.propTypes = {
  text: PropTypes.string,
  price: PropTypes.number,
  variant: PropTypes.oneOf(['simple', 'bold', 'procuct']),
}

export default Price;
