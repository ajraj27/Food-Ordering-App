import { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const [checkout, setCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const addItemHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const removeItemHandler = (id) => {
    ctx.removeItem(id);
  };

  const checkoutHandler = () => {
    setCheckout(true);
  };

  const submitCartHandler = async (userInfo) => {
    setIsSubmiting(true);
    await fetch(
      "https://reacr-test-app-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          userInfo,
          cartItems: ctx.items,
        }),
      }
    );

    setIsSubmiting(false);
    setDidSubmit(true);
    ctx.clearCart();
  };

  const totalAmount = `Rs.${ctx.amount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addItemHandler.bind(null, item)}
          onRemove={removeItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseModal}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={checkoutHandler}>
          Order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {checkout && (
        <Checkout onClose={props.onCloseModal} onConfirm={submitCartHandler} />
      )}
      {!checkout && modalActions}
    </>
  );

  const isSubmitingContent = <p>Submitting...</p>;
  const didSubmitContent = (
    <>
      <p>Successfully placed the order !!</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseModal}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClick={props.onCloseModal}>
      {!isSubmiting && !didSubmit && modalContent}
      {isSubmiting && isSubmitingContent}
      {!isSubmiting && didSubmit && didSubmitContent}
    </Modal>
  );
};

export default Cart;
