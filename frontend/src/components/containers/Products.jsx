import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import { useShoppingCartContext } from '../../state/ShoppingCartContext.jsx';
import { ACTIONS } from "../../state/reducers.js";
import { createCart, addProductToCart } from '../../utilities/cart.js';

function Products(props) {
  const { isLoading, error } = props
  const { state, dispatch } = useShoppingCartContext();
  const { products } = state;

  const addToCart = async (product) => {
    let cartId = state.cartInfo.id;
    if (!cartId) {
      cartId = await createCart();
      dispatch({ type: ACTIONS.CREATE_CART, payload: cartId });
    }

    const itemInCart = state.cart.find(c => c.id === product.id)
    const newCart = itemInCart
      ? state.cart.map((c) =>
          c.id === product.id ? { ...c, quantity: c.quantity + 1 } : c
        )
      : [...state.cart, { product_id: product.id, quantity: 1 }];
    const updatedCart = await addProductToCart(cartId, newCart)
    if (updatedCart)
      dispatch({ type: ACTIONS.ADD_TO_CART, payload: { updatedCart: updatedCart.items, product }})
  };

  return (
    <div className="flex justify-center">
      <div className='flex flex-col md:flex-row flex-wrap gap-1 md:gap-2 w-full md:w-fit'>
        {isLoading ? <Loading /> : null}
        {!isLoading && !error && products?.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
        {error && <Error />}
      </div>
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