import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import Button from "../ui/Buttons/Button";
import { useShoppingCartContext } from "../../state/ShoppingCartContext";
import { ACTIONS } from "../../state/reducers";

export const Order = () => {
  const { dispatch } = useShoppingCartContext();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) navigate("/");
    else dispatch({ type: ACTIONS.CLEAR_CART });
  }, [state, navigate]);

  if (!state) return null;
  const { orderId } = state;
  if (!orderId) return <div>failed to create order</div>;
  return (
    <div className="flex justify-center">
      <Trick orderId={orderId} />
    </div>
  );
};

const Trick = (props) => {
  const { data } = useFetch("/api/orders/" + props.orderId);
  console.log(data)
  const navigate = useNavigate();
  return (
    <div className="transaction-success w-xs md:w-md flex flex-col items-center justify-center mt-5">
      {data ? (
        <>
          <h2 className="text-green-500 text-xl font-bold mb-4 animate-bounce">
            Transaction Successful!
          </h2>
          <div className="products-list space-y-4 w-full max-w-sm">
            {data.items.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-300 pb-2 text-center w-full"
              >
                <p className="font-medium text-gray-600">{item.product.name}</p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  Price: ${item.product.price}
                </p>
              </div>
            ))}
          </div>
          {/* this amount seems wrong, no time to investigate */}
          <div className="total-amount font-bold text-lg mb-6">
            <h3>Total Amount: ${data.total}</h3>
          </div>
          <Button fullWidth onClick={() => navigate("/")}>Continue Shopping</Button>
        </>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default Order;
