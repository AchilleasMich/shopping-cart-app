import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { useFetch } from '../../hooks/useFetch';

export const Order = () => {
  const { state } = useLocation();
  const navigate  = useNavigate();

  console.log("Where is the state", state)
  useEffect(() => {
    if (!state) navigate("/")
  }, [state, navigate])

  if (!state) return null
  const { orderId } = state;
  if (!orderId) return <div>Faield ot creatre order</div>
  return (
    <div><Trick orderId={orderId} /></div>
  )
}

const Trick = (props) => {
  const { data } = useFetch("/api/orders/" + props.orderId, props.orderId ? false : true);
  console.log(data);
  return (
    <div
      className="transaction-success animate-fade-in flex flex-col items-center justify-center mt-10"
      style={{
        backgroundColor: "#f9f9f9", // Very light gray background
        animation: "fadeIn 1s ease-in-out",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      {data ? (
        <>
          <h2 className="text-green-500 text-xl font-bold mb-4 animate-bounce">Transaction Successful!</h2>
          <div className="products-list space-y-4 w-full max-w-md">
            {data.items.map((item, index) => (
              <div key={index} className="product-item border-b border-gray-300 pb-2 text-center">
                <p className="font-medium text-gray-600">{item.product.name}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-600">Price: ${item.product.price}</p>
              </div>
            ))}
          </div>
          <div className="total-amount font-bold text-lg mb-6">
            <h3>Total Amount: ${data.total}</h3>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default Order;
