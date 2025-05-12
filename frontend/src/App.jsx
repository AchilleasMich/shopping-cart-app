import React from "react";
import { useEffect } from "react";
import { ACTIONS } from "./state/reducers";
import { useFetch } from "./hooks/useFetch";
import Products from "./components/containers/Products";
import Header from "./components/Header";
import { Route, Routes } from "react-router";
import Cart from "./components/containers/Cart";
import { useShoppingCartContext } from "./state/ShoppingCartContext";
import Order from "./components/containers/Order";
import toast, { Toaster } from "react-hot-toast";
import NotFound from "./components/NotFound";

function App() {
  const { state, dispatch } = useShoppingCartContext();

  const { data, isLoading, error } = useFetch("/api/products");
  const { data: coupons, error: errorCoupons } = useFetch("/api/discounts");

  useEffect(() => {
    if (data) {
      const products = data.map((p) => {
        return { ...p, price: Math.ceil(100 * p.price) };
      });
      dispatch({ type: ACTIONS.ADD_PRODUCTS, payload: products });
    }
  }, [data]);

  useEffect(() => {
    if (errorCoupons) {
      toast.error("Something went wrong fetching discount coupons");
    }
  }, [errorCoupons]);

  useEffect(() => {
    if (coupons) {
      const c = coupons.map((c) => {
        return { ...c, amount: c.type === "FLAT" ? 100 * c.amount : c.amount };
      });
      dispatch({ type: ACTIONS.ADD_COUPONS, payload: c });
    }
  }, [coupons]);

  return (
    <div className="container mx-auto">
      <Header cart={state.cart} total={state.cartInfo.totalAmount} />
      <Routes>
        <Route
          path="/"
          element={<Products isLoading={isLoading} error={error} />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#DC2626",
            color: "white",
            padding: "12px 16px",
            borderRadius: "6px",
          },
          error: {
            style: {
              background: "#DC2626",
              color: "white",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
