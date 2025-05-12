import React from "react";
import PropTypes from "prop-types";
import { useState, createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router";

const NavigationContext = createContext();

const NavigationContextProvider = ({ children }) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [previousPath, setPreviousPath] = useState(null);

  useEffect(() => {
    setPreviousPath(currentPath);
    setCurrentPath(location.pathname);
  }, [location]);
  return (
    <NavigationContext.Provider value={{ currentPath, previousPath }}>
      {children}
    </NavigationContext.Provider>
  );
};

NavigationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useNavigationContext = () => {
  return useContext(NavigationContext);
};

export { NavigationContextProvider, useNavigationContext };
