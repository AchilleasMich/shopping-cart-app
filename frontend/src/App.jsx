import React from 'react'
import { useEffect, useReducer } from 'react'
import { reducer, ACTIONS, initialState } from './state/reducers';
import { useFetch } from './hooks/useFetch';
import Products from './components/Products';
import Header from './components/Header';

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
      <div className='flex items-center justify-center bg-gray-200 p-4 m-2'>
        <div>
          <Header cart={state.cart} total={state.cartInfo.totalAmount} />
          <div>
            <label htmlFor="coupon">Apply Coupon:</label>
            <select
              id="coupon"
              className="ml-2 p-1 border"
              onChange={(e) => dispatch({ type: ACTIONS.APPLY_COUPON, payload: e.target.value })}
            >
              <option value="">Select a coupon</option>
              {state?.coupons?.map((coupon) => (
                <option key={coupon.code} value={coupon.code}>
                  {coupon.code}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Products products={state.products} isLoading={isLoading} error={error} addToCart={addToCart} />
    </div>
  )
}

export default App
