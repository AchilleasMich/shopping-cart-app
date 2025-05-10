import React from 'react';
import PropTypes from "prop-types";
import QuantityButton from '../Buttons/QuantityButton';
import Price from '../Price';

const ProductCard = (props) => {
  const { product, addToCart, removeFromCart } = props;
  return (
    <div
      key={product.id}
      className="border p-4 m-2 min-w-fit md:min-w-52 lg:min-w-72 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <h2 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h2>
      <p className={`mb-2 ${product.stock ? "text-green-600" : "text-red-600"} font-medium`}>
        {product.stock ? `In Stock (${product.stock})` : "Out of Stock"}
      </p>
      <Price text="Price" price={product.price} variant="product" />
      <QuantityButton
        fullWidth
        quantity={product.stock}
        onIncrease={() => addToCart(product)}
        onDecrease={() => removeFromCart(product)}
        increamentEnabled={product.inCart}
        disabled={product.stock === 0}
      >
        {product.stock ? "Add to Cart" : "Not in Stock"}
      </QuantityButton>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    inCart: PropTypes.bool,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
}

export default ProductCard
