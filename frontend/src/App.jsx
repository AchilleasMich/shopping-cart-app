import React from 'react'
import { useEffect, useReducer } from 'react'
import { reducer, ACTIONS, initialState } from './state/reducers';
import { useFetch } from './hooks/useFetch';
import Products from './components/containers/Products';
import Header from './components/Header';
import { Route, Routes } from 'react-router';
import Cart from './components/containers/Cart';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data, isLoading, error } = useFetch("/api/products")
  const { data: coupons } = useFetch("/api/discounts");

  useEffect(() => {
    if (data) {
      const products = data.map(p => { return { ...p, price: Math.round(100 * p.price) }})
      dispatch({ type: ACTIONS.ADD_PRODUCTS, payload: products });
    }
  }, [data]);

  useEffect(() => {
    if (coupons) {
      const c = coupons.map(c => { return { ...c, amount: c.type === "FLAT" ? 100 * c.amount : c.amount }})
      dispatch({ type: ACTIONS.ADD_COUPONS, payload: c });
    }
  }, [coupons]);

  const addToCart = (product) => { dispatch({ type: ACTIONS.ADD_TO_CART, payload: product })};

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center bg-gray-200 p-4 m-2">
        <div>
          <Header cart={state.cart} total={state.cartInfo.totalAmount} />
        </div>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Products
              products={state.products}
              isLoading={isLoading}
              error={error}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={state.cart}
              coupons={state.coupons}
              onSelection={(e) =>
                dispatch({
                  type: ACTIONS.APPLY_COUPON,
                  payload: e.target.value,
                })
              }
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App
