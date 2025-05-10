import React from 'react'
import PropTypes from 'prop-types'
import Price from '../Price'

const OrderCard = (props) => {
  const { quantity, product } = props
  return (
   <div
      className="border-b border-gray-300 pb-2 text-center w-full"
    >
      <p className="font-medium text-gray-600">{product.name}</p>
      <p className="text-sm text-gray-600">
        Quantity: {quantity}
      </p>
      <div className="text-sm text-gray-600">
        <Price price={product.price} />
      </div>
    </div>
  )
}

OrderCard.propTypes = {
  quantity: PropTypes.number.isRequired,
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
}

export default OrderCard