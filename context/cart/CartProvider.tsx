import React, { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from "./";
import Cookie from "js-cookie";

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [],
};

const CartProvider: FC<PropsWithChildren<CartState>> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  // EFFECT TO RETRIEVE CART FROM COOKIES
  useEffect(() => {
    try {
      const cartFromCookies = Cookie.get("cart")
        ? JSON.parse(Cookie.get("cart")!)
        : [];
      dispatch({
        type: "Cart - Load cart from cookies | storage",
        payload: cartFromCookies,
      });
    } catch (error) {
      dispatch({
        type: "Cart - Load cart from cookies | storage",
        payload: [],
      });
    }
  }, []);

  // EFFECT TO STORE CART IN COOKIES

  useEffect(() => {
    Cookie.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const loadCartFromCookies = (cookie: ICartProduct[]) => {
    // if (cookie.length == 0) return;

    dispatch({
      type: "Cart - Load cart from cookies | storage",
      payload: cookie,
    });
  };

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id);
    if (!productInCart) {
      return dispatch({
        type: "Cart - Update products in cart",
        payload: [...state.cart, product],
      });
    }
    const productInCartButDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );

    if (!productInCartButDifferentSize) {
      return dispatch({
        type: "Cart - Update products in cart",
        payload: [...state.cart, product],
      });
    }

    // acumular
    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      // update quantity
      p.quantity += product.quantity;
      return p;
    });

    dispatch({
      type: "Cart - Update products in cart",
      payload: [...updatedProducts],
    });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({
      type: "Cart - Update cart quantity",
      payload: product,
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        // methods
        addProductToCart,
        loadCartFromCookies,
        updateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
