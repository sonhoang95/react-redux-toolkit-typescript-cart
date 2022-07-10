import { useEffect } from "react";
import CartContainer from "./components/CartContainer";
import { getCartItems, calculateTotal } from "./features/cart/cartSlice";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import Navbar from "./components/Navbar";
import { openModal } from "./features/modal/modalSlice";
import Modal from "./components/Modal";

function App() {
  const { cart, amount, total } = useAppSelector((store) => store.cart);
  const { isModalOpen } = useAppSelector((store) => store.modal);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cart, dispatch]);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      {isModalOpen && <Modal />}
      <CartContainer
        cart={cart}
        amount={amount}
        total={total}
        openModal={openModal}
      />
    </div>
  );
}

export default App;
