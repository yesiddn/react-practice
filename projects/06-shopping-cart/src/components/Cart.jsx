import './Cart.css'
import { useId } from "react"
import { CartIcon, ClearCartIcon } from "./Icons"

export function Cart() {
  const cartCheckboxId = useId();
  
  return (
    <>
      <label className="cart-button" htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input type="checkbox" id={cartCheckboxId} hidden />

      <aside className="cart">
        <ul>
          <li>
            <img
              src="https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"
              alt="Iphone"
            />
            <div>
              <strong>iPhone</strong> - $999.99
            </div>

            <footer>
              <small>Qty: 1</small>
              <button>+</button>
            </footer>
          </li>
        </ul>

        <button>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}