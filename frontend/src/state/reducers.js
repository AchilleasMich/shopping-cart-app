const initialState = {
  cart: [],
  products: [],
}

const ACTIONS = {
  ADD_PRODUCTS: "ADD_PRODUCTS",
  ADD_TO_CART: "ADD_TO_CART",
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_PRODUCTS:
      return { ...state, products: payload }
    case ACTIONS.ADD_TO_CART:
    {
      const product = state.products.find((p) => p.id === payload.id);
      console.log(product)
      if (product && product.stock === 0)
        return state;

      const newProducts = state.products.map((p) => {
        if (p.id === payload.id) {
          return { ...p, stock: p.stock - 1 };
        }
        return p;
      })
      
      const productInCart = state.cart.find((item) => item.id === payload.id);
      if (productInCart) {
        const newCart = state.cart.map((c) => {
          if (c.id === payload.id)
            return { ...c, quantity: c.quantity += 1 };
          return c;
        })

        return { ...state, cart: newCart, products: newProducts}
      }
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            id: payload.id,
            name: payload.name,
            price: payload.price,
            quantity: 1
          }
        ],
        products: newProducts };
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