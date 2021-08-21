import classes from "./Header.module.css";
import meals from "../../assets/meals.jpeg";
import CartButton from "./CartButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Reactmeals</h1>
        <CartButton onClick={props.onShowModal} />
      </header>
      <div className={classes["main-image"]}>
        <img src={meals} alt="Delicious food"></img>
      </div>
    </>
  );
};

export default Header;
