import React from 'react';
import PropTypes from "prop-types";
import QuantityButton from './ui/Buttons/QuantityButton';

function ProductCard(props) {
  const { product, addToCart, removeFromCart } = props;
  return (
    <div key={product.id} className="border p-4 m-2 min-w-fit md:min-w-48">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>{product.stock ? "In Stock" : "Not in Stock"}</p>
      <p className="text-green-500">${product.price / 100}</p>
      <QuantityButton
        fullWidth
        quantity={product.stock}
        onIncrease={() => addToCart(product)}
        onDecrease={() => removeFromCart(product)}
        increamentEnabled={product.inCart}
      >Add to Cart
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
