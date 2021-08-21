import { useContext, useState, useEffect } from "react";
import classes from "./CartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const CartButton = (props) => {
  const [isbuttonBump, setIsButtonBump] = useState(false);
  const ctx = useContext(CartContext);
  const numOfCartItems = ctx.items.reduce((curr, item) => {
    return curr + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${isbuttonBump ? classes.bump : ""}`;

  useEffect(() => {
    if (ctx.items.length === 0) {
      return;
    }

    setIsButtonBump(true);

    const timer = setTimeout(() => {
      setIsButtonBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [ctx.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numOfCartItems}</span>
    </button>
  );
};

export default CartButton;
