import React from "react";
import PropTypes from "prop-types";
import { useReducer, createContext, useContext } from "react";
import { reducer, initialState } from "./reducers";

const ShoppingCartContext = createContext();

const ShoppingCartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <ShoppingCartContext.Provider value={{ state, dispatch }}>
        {children}
      </ShoppingCartContext.Provider>
    );
};

ShoppingCartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useShoppingCartContext = () => {
  return useContext(ShoppingCartContext);
}

export { ShoppingCartContextProvider, useShoppingCartContext };