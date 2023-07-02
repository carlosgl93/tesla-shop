import React, { FC, useReducer } from "react";
import { CartContext } from "./CartContext";
import { cartReducer } from "./cartReducer";
import { ICartProduct } from "../../interfaces";

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

type Props = {
  children: React.ReactNode;
};

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  return (
    <CartContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
