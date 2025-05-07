import { useState, useEffect, use } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const resp = await fetch('/api/products');
      const data = await resp.json();
      console.log(data);
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  console.log(cart);

  return (
    <div className="container mx-auto">
      <div className='flex items-center justify-center bg-gray-200 p-4 m-2'>
        This will be the header
        <div>
          <p>Cart</p>
          <p>Quantity: {cart.reduce((acc, c) => acc += c.quantity, 0)}</p>
          <p>Total: ${cart.reduce((acc, c) => acc += c.price * c.quantity, 0)}</p>
        </div>
      </div>
      <div>
        {products.map((product) => (
          <div key={product.id} className="border p-4 m-2">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>{product.stock ? "In Stock" : "Not in Stock"}</p>
            <p className="text-green-500">${product.price}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-2 hover:bg-blue-700"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product)
              }}
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
