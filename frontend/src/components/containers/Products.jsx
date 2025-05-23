import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ProductCard from "../ui/Cards/ProductCard";
import Loading from "../ui/Loading";
import Error from "../ui/Error";
import { useShoppingCartContext } from "../../state/ShoppingCartContext.jsx";
import { ACTIONS } from "../../state/reducers.js";
import {
  createCart,
  updateCart,
  addItemToCart,
  removeItemFromCart,
} from "../../utilities/cart.js";
import { useLocation } from "react-router";
import toast from "react-hot-toast";
function Products(props) {
  const { isLoading, error } = props;
  const { state, dispatch } = useShoppingCartContext();
  const { products, cart } = state;

  const location = useLocation();
  const from = location.state?.from;
  useEffect(() => {
    // we can come from /order 3 different ways
    // 1. hit the continue shopping button
    // 2. Hit the Shopping cart "logo"
    // 3. Hit the back button (/cart is skipped, this is not handled properly)
    if (from === "/order") dispatch({ type: ACTIONS.CLEAR_CART });
  }, [from, dispatch]);

  const addToCart = async (product) => {
    let cartId = state.cartInfo.id;
    if (!cartId) {
      cartId = await createCart(() => toast.error("Failed to Create Cart"));
      dispatch({ type: ACTIONS.CREATE_CART, payload: cartId });
    }

    const newCart = addItemToCart(state.cart, product);
    const { data: updatedCart, error } = await updateCart(cartId, newCart, () =>
      toast.error("Failed to update product to cart")
    );
    if (!error)
      dispatch({
        type: ACTIONS.ADD_TO_CART,
        payload: { updatedCart: updatedCart.items, product },
      });
  };

  const removeFromCart = async (product) => {
    const cartId = state.cartInfo.id;

    const newCart = removeItemFromCart(state.cart, product);
    const { data: updatedCart, error } = await updateCart(cartId, newCart, () =>
      toast.error("Failed to update product to cart")
    );
    if (!error)
      dispatch({
        type: ACTIONS.REMOVE_FROM_CART,
        payload: { updatedCart: updatedCart.items, product },
      });
  };

  const productsWithCart = products.map((p) => {
    if (cart.find((c) => c.id === p.id)) return { ...p, inCart: true };
    return p;
  });

  return (
    <div className="flex justify-center">
      <div className="flex flex-col md:flex-row flex-wrap gap-1 md:gap-2 w-full md:w-fit">
        {isLoading ? <Loading /> : null}
        {!isLoading &&
          !error &&
          productsWithCart?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          ))}
        {error && <Error />}
      </div>
    </div>
  );
}

Products.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

Products.defaultProps = {
  isLoading: false,
  error: null,
};

export default Products;
