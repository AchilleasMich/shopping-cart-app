import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import { useShoppingCartContext } from '../../state/ShoppingCartContext.jsx';
import { ACTIONS } from "../../state/reducers.js";

function Products(props) {
  const { isLoading, error } = props
  const { state, dispatch } = useShoppingCartContext();

  const { products } = state;
  const addToCart = (product) => { dispatch({ type: ACTIONS.ADD_TO_CART, payload: product })};
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
  isLoading: PropTypes.bool,
  error: PropTypes.string,
}

Products.defaultProps = {
  isLoading: false,
  error: null,
}

export default Products