import { IS_DEVELOPMENT } from '../config';
import { useCart } from '../hooks/useCart';
import { useFilters } from '../hooks/useFilters';
import './Footer.css';

export function Footer() {
  const { filters } = useFilters();
  const { cart } = useCart();

  return (
    <footer className="footer">
      <h4>
        Shopping Cart ⚛️ - <span>@yesiddn</span>
      </h4>
      <h5>Shopping Cart on useContext and useReducer</h5>
      {IS_DEVELOPMENT && <p>{JSON.stringify(filters, null, 2)}</p>}
      {!IS_DEVELOPMENT && <p>Items in cart: {cart.length}</p>}
      {/* {!IS_DEVELOPMENT && <p>{JSON.stringify(cart, null, 2)}</p>} */}
    </footer>
  );
}
