import { calculateTotal } from "../utilities/discounts"
const initialState = {
  cart: [],
  products: [],
  cartInfo: {
    id: null,
    coupon: null,
    totalAmount: 0,
  },
  coupons: []
}

const ACTIONS = {
  ADD_PRODUCTS: "ADD_PRODUCTS",
  ADD_TO_CART: "ADD_TO_CART",
  APPLY_COUPON: "APPLY_COUPON",
  ADD_COUPONS: "ADD_COUPONS",
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_PRODUCTS:
      return { ...state, products: payload }
    case ACTIONS.ADD_TO_CART:
    {
      const product = state.products.find((p) => p.id === payload.id);
      if (product && product.stock === 0) return state;

      const updatedProducts = state.products.map((p) => 
        p.id === payload.id ? { ...p, stock: p.stock - 1 } : p
      );

      let updatedCart;
      const productInCart = state.cart.find((item) => item.id === payload.id);
      if (productInCart) {
        updatedCart = state.cart.map((c) =>
          c.id === payload.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      } else {
        updatedCart = [
          ...state.cart,
          {
            id: payload.id,
            name: payload.name,
            price: payload.price,
            quantity: 1
          }
        ];
      }

      const coupon = state.coupons.find(c => c.code === state.cartInfo.coupon);
      const totalAmount = calculateTotal(updatedCart, coupon);
      return {
        ...state,
        cart: updatedCart,
        products: updatedProducts,
        cartInfo: {
          ...state.cartInfo,
          totalAmount: totalAmount
        }
      };
    }
    case ACTIONS.APPLY_COUPON: {
      const coupon = state.coupons.find(c => c.code === payload);
      const totalAmount = calculateTotal(state.cart, coupon);
      return {
        ...state,
        cartInfo: {
          ...state.cartInfo,
          coupon: payload,
          totalAmount: totalAmount
        }
      }
    }
    case ACTIONS.ADD_COUPONS:
      return {
        ...state,
        coupons: payload
      }
    default:
      return state;
  }
}



export {
  initialState,
  reducer,
  ACTIONS
}