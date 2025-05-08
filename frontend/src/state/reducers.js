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
  CREATE_CART: "CREATE_CART",
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_PRODUCTS:
      return { ...state, products: payload }
    case ACTIONS.ADD_TO_CART:
    {
      const {
        updatedCart, product: addedProduct,
      } = payload;
      const product = state.products.find((p) => p.id === payload.id);
      if (product && product.stock === 0) return state;

      // decrease products stock
      const updatedProducts = state.products.map((p) => 
        p.id === addedProduct.id ? { ...p, stock: p.stock - 1 } : p
      );

      // enrich the cart with product info
      const newCart = updatedCart.map(c => {
        const prod = state.products.find((p) => p.id === c.product_id);
        return { ...c, id: c.product_id, ...prod }
      })

      // apply coupon if it exists
      const coupon = state.coupons.find(c => c.code === state.cartInfo.coupon);
      const totalAmount = calculateTotal(newCart, coupon);
      return {
        ...state,
        cart: newCart,
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
      case ACTIONS.CREATE_CART:
        return {
          ...state,
          cartInfo: {
            ...state.cartInfo,
            id: payload,
          }
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