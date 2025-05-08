import { useEffect, useReducer } from 'react'
import { reducer, ACTIONS, initialState } from './state/reducers';
import { useFetch } from './hooks/useFetch';
import { calculateTotal } from './utilities/discounts';

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

  const addToCart = (product) => { dispatch({ type: ACTIONS.ADD_TO_CART, payload: product }) };
  const total = calculateTotal(state?.cart, state?.coupons?.find(c => c.code === state?.cartInfo?.coupon));

  return (
    <div className="container mx-auto">
      <div className='flex items-center justify-center bg-gray-200 p-4 m-2'>
        <div>
          <p>Cart</p>
          <p>Quantity: {state?.cart.reduce((acc, c) => acc += c.quantity, 0)}</p>
          <p>Total: ${(total/100).toFixed(2)}</p>
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
      <div>
        {isLoading ? <div>Is Loading</div> : null}
        {!isLoading && !error && state?.products?.map((product) => (
          <div key={product.id} className="border p-4 m-2">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>{product.stock ? "In Stock" : "Not in Stock"}</p>
            <p className="text-green-500">${product.price/100}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-2 hover:bg-blue-700 disabled:bg-blue-300"
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
            >
              Add to Cart
            </button>
          </div>
        ))}
        {error && <div>Oops</div>}
      </div>
    </div>
  )
}

export default App
