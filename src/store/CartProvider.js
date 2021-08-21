import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const exisingCartItem = state.items[existingCartItemIndex];
    let updatedCartItems;

    if (exisingCartItem) {
      const updatedItem = {
        ...exisingCartItem,
        amount: exisingCartItem.amount + action.item.amount,
      };
      updatedCartItems = [...state.items];
      updatedCartItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedCartItems = state.items.concat(action.item);
    }

    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;

    return {
      items: updatedCartItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const exisingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - exisingCartItem.price;
    let updatedCartItems;
    if (exisingCartItem.amount === 1) {
      updatedCartItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...exisingCartItem,
        amount: exisingCartItem.amount - 1,
      };
      updatedCartItems = [...state.items];
      updatedCartItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedCartItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id });
  };

  const createContext = {
    items: cartState.items,
    amount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={createContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
