import { useState } from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [isShowModal, setIsShowModal] = useState(false);

  const showModalHandler = () => {
    setIsShowModal(true);
  };

  const hideModalHandler = () => {
    setIsShowModal(false);
  };
  return (
    <CartProvider>
      {isShowModal && <Cart onCloseModal={hideModalHandler} />}
      <Header onShowModal={showModalHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
