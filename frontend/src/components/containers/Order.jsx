import React, { useEffect } from "react";
import { useNavigate, useLocation, useNavigationType } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import Button from "../ui/Buttons/Button";
import Loading from "../ui/Loading";
import Error from "../ui/Error";
import OrderCard from "../ui/Cards/OrderCard";
import { useShoppingCartContext } from "../../state/ShoppingCartContext";
import { ACTIONS } from "../../state/reducers";

export const Order = () => {
  const navigate = useNavigate();
  const { dispatch } = useShoppingCartContext();
  const { state } = useLocation();
  const orderId = state?.orderId;
  const { data, isLoading, error } = useFetch(
    `/api/orders/${orderId}`,
    !!orderId
  );

  const navigationType = useNavigationType();

  const continueShopping = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
    navigate("/");
  };

  useEffect(() => {
    if (!orderId) navigate("/", { replace: true });
  }, [orderId, navigate]);

  // avoid forward button. Only available after initial order
  // from the main page
  useEffect(() => {
    if (navigationType === "POP") {
      navigate("/");
    }
  }, [navigationType]);

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!data) return null;

  const adjustedPriceData = {
    ...data,
    items: data.items.map((p) => ({
      ...p,
      product: {
        ...p.product,
        price: Math.ceil(p.product.price * 100),
      },
    })),
  };

  return (
    <div className="flex justify-center">
      <div className="transaction-success w-xs md:w-md flex flex-col items-center justify-center mt-5">
        <h2 className="text-green-500 text-xl font-bold mb-4 animate-bounce">
          Transaction Successful!
        </h2>
        <div className="products-list space-y-4 w-full max-w-sm">
          {adjustedPriceData?.items.map((item) => (
            <OrderCard
              key={item.product.id}
              quantity={item.quantity}
              product={item.product}
            />
          ))}
        </div>
        {/* this amount seems wrong, no time to investigate */}
        <div className="total-amount font-bold text-lg mb-6">
          <h3>Total Amount: ${data.total}</h3>
        </div>
        <Button fullWidth onClick={continueShopping}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default Order;
