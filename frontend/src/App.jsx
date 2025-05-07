import { useEffect, useReducer } from 'react'
import { reducer, ACTIONS, initialState } from './state/reducers';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchProducts() {
      const resp = await fetch('/api/products');
      const data = await resp.json();
      const products = data.map((p) => { return {...p, price: p.price * 100 } });
      dispatch({ type: ACTIONS.ADD_PRODUCTS, payload: products });
    }
    fetchProducts();
  }, []);


  const addToCart = (product) => { dispatch({ type: ACTIONS.ADD_TO_CART, payload: product }) };

  const total = state?.cart.reduce((acc, c) => acc += c.price * c.quantity, 0);

  console.log(state)

  return (
    <div className="container mx-auto">
      <div className='flex items-center justify-center bg-gray-200 p-4 m-2'>
        <div>
          <p>Cart</p>
          <p>Quantity: {state?.cart.reduce((acc, c) => acc += c.quantity, 0)}</p>
          <p>Total: ${(total/100).toFixed(2)}</p>
        </div>
      </div>
      <div>
        {state?.products?.map((product) => (
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
      </div>
    </div>
  )
}

export default App
