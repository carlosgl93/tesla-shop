import { ICartProduct } from "../../interfaces";
import { CartState } from "./";

type CartActionType =
  | {
      type: "Cart - Load cart from cookies | storage";
      payload: ICartProduct[];
    }
  | {
      type: "Cart - Update products in cart";
      payload: ICartProduct[];
    }
  | {
      type: "Cart - Update cart quantity";
      payload: ICartProduct;
    }
  | {
      type: "Cart - Remove product in cart";
      payload: ICartProduct;
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "Cart - Load cart from cookies | storage":
      return { ...state, cart: [...action.payload] };
    case "Cart - Update products in cart":
      return {
        ...state,
        cart: [...action.payload],
      };

    case "Cart - Update cart quantity":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;

          return action.payload;
        }),
      };
    case "Cart - Remove product in cart":
      return {
        ...state,
        cart: state.cart.filter(
          (_product) =>
            _product._id !== action.payload._id &&
            _product.size !== action.payload.size
        ),
      };
    default:
      return state;
  }
};
