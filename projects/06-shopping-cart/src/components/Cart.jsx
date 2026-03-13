import './Cart.css';
import { useId } from 'react';
import { CartIcon, ClearCartIcon } from './Icons';
import { useCart } from '../hooks/useCart';

function CartItem({ title, price, thumbnail, quantity, addToCart }) {
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong> - ${price.toFixed(2)}
      </div>

      <footer>
        <small>Qty: {quantity}</small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  );
}

export function Cart() {
  const cartCheckboxId = useId();
  const { cart, clearCart, addToCart } = useCart();

  return (
    <>
      <label className="cart-button" htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input type="checkbox" id={cartCheckboxId} hidden />

      <aside className="cart">
        <ul>
          {
            cart.map((item) => (
              <CartItem key={item.id} {...item} addToCart={() => addToCart(item)} />
            ))
          }
        </ul>

        <button className="clear-cart" onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}
