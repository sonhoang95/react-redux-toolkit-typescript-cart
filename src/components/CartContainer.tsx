import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { useAppDispatch } from "../app/hooks";
import { CartItemType } from "../features/cart/cartSlice";
import CartItem from "./CartItem";

interface CartContainerProps {
  cart: CartItemType[];
  amount: number;
  total: number;
  openModal: ActionCreatorWithoutPayload<string>;
}

const CartContainer = ({
  cart,
  amount,
  total,
  openModal,
}: CartContainerProps) => {
  const dispatch = useAppDispatch();

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cart.map((cartItem) => {
          return <CartItem key={cartItem.id} {...cartItem} />;
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={() => dispatch(openModal())}>
          clear cart
        </button>
      </footer>
    </section>
  );
};
export default CartContainer;
