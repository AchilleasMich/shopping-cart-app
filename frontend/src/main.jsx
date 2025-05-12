import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { ShoppingCartContextProvider } from "./state/ShoppingCartContext.jsx";
import { NavigationContextProvider } from "./state/NavigationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <NavigationContextProvider>
        <ShoppingCartContextProvider>
          <App />
        </ShoppingCartContextProvider>
      </NavigationContextProvider>
    </BrowserRouter>
  </StrictMode>
);
