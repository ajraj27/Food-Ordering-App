import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (val) => val.trim() === "";
const isSixChars = (val) => val.trim().length === 6;

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const nameVal = nameRef.current.value;
    const streetVal = streetRef.current.value;
    const postalVal = postalRef.current.value;
    const cityVal = cityRef.current.value;

    const nameValid = !isEmpty(nameVal);
    const streetValid = !isEmpty(streetVal);
    const postalValid = isSixChars(postalVal);
    const cityValid = !isEmpty(cityVal);

    setFormValidity({
      name: nameValid,
      street: streetValid,
      postalCode: postalValid,
      city: cityValid,
    });

    const formValid = nameValid && streetValid && postalValid && cityValid;

    if (!formValid) {
      return;
    }

    props.onConfirm({
      name: nameVal,
      street: streetVal,
      postalCode: postalVal,
      city: cityVal,
    });
  };

  const nameClasses = !formValidity.name
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  const streetClasses = !formValidity.street
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  const postalClasses = !formValidity.postalCode
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  const cityClasses = !formValidity.city
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input id="name" type="text" ref={nameRef} />
        {!formValidity.name && <p>Name must not be empty.</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input id="street" type="text" ref={streetRef} />
        {!formValidity.street && <p>Street must not be empty.</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal-code">Postal code</label>
        <input id="postal-code" type="text" ref={postalRef} />
        {!formValidity.postalCode && <p>Postal code must be 6 chars.</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input id="city" type="text" ref={cityRef} />
        {!formValidity.city && <p>City must not be empty.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
