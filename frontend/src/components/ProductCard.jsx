import React from 'react';
import PropTypes from 'prop-types'
import Button from './ui/Button';

function ProductCard(props) {
  const { product, addToCart } = props;
  return (
    <div key={product.id} className="border p-4 m-2">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>{product.stock ? "In Stock" : "Not in Stock"}</p>
      <p className="text-green-500">${product.price / 100}</p>
      <Button disabled={product.stock === 0} onClick={() => addToCart(product)}>
        Add to Cart
      </Button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
}

export default ProductCard
