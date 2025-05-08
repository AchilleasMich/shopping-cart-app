import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard';
import Loading from '../ui/Loading';
import Error from '../ui/Error';

function Products(props) {
  const { products, isLoading, error, addToCart } = props
  return (
    <div>
    {isLoading ? <Loading /> : null}
    {!isLoading && !error && products?.map((product) => (
      <ProductCard key={product.id} product={product} addToCart={addToCart} />
    ))}
    {error && <Error />}
  </div>
  )
}

Products.propTypes = {
  products: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  addToCart: PropTypes.func.isRequired,
}

Products.defaultProps = {
  products: [],
  isLoading: false,
  error: null,
  addToCart: () => {},
}

export default Products