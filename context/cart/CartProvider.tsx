import React, { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { ICartProduct, OrderSummary } from "../../interfaces";
import { CartContext, cartReducer } from "./";
import Cookie from "js-cookie";

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

const CART_INITIAL_STATE: CartState = {
  cart: Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
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

  // EFFECT TO CALCULATE ORDER SUMMARY
  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );

    const subTotal = state.cart.reduce(
      (prev, current) => current.quantity * current.price + prev,
      0
    );

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0.15);

    const orderSummary: OrderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    };

    dispatch({
      type: "Cart - Update order summary",
      payload: orderSummary,
    });
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

  const removeProductFromCart = (product: ICartProduct) => {
    dispatch({ type: "Cart - Remove product in cart", payload: product });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        // methods
        addProductToCart,
        loadCartFromCookies,
        removeProductFromCart,
        updateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
