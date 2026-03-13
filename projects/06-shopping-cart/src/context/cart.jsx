import { useReducer } from 'react';
import { createContext } from 'react';
import { cartReducer, cartInitialState, CART_ACTION_TYPES } from '../reducers/cart';

// 1. crear contexto
export const CartContext = createContext();

function useCartReducer() {
  // el useReducer es util para manejar estados complejos que tienen varias acciones para mutar el estado, ademas, ayuda a separar la logica de lo que se ve en la interfaz y ayuda a hacer testin mas facilmente o a llevarnos la logica a otro lado sin tener que cambiar el componente
  const [{ cart }, dispatch] = useReducer(cartReducer, cartInitialState); // cart seria el estado del carrito y dispatch es la funcion que se usa para enviar las acciones al reducer

  // al dispatch se le pasa el action que esta en el reducer, y en el reducer el action era un objeto con type y payload, entonces aqui se le pasa ese objeto con el type de accion que se quiere ejecutar y el payload con la informacion necesaria para ejecutar esa accion
  const addToCart = (product) =>
    dispatch({ type: CART_ACTION_TYPES.ADD_TO_CART, payload: product });

  const removeFromCart = (product) =>
    dispatch({ type: CART_ACTION_TYPES.REMOVE_FROM_CART, payload: product });

  const clearCart = () => dispatch({ type: CART_ACTION_TYPES.CLEAN_CART });

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };
}

// 2. crear provider -> siempre con children
export function CartProvider({ children }) {
  const { cart, addToCart, removeFromCart, clearCart } = useCartReducer();
  
  // este useState tambien se reemplaza con el useReducer, ya que el carrito es un estado complejo que tiene varias acciones para actualizarlo, como agregar un producto, eliminar un producto, limpiar el carrito, etc, y el useReducer es una mejor opción para manejar estados complejos con varias acciones
  // const [cart, setCart] = useState([]);

  // addToCart, removeFromCart y clearCart se reemplazan con el reducer
  // const addToCart = (product) => {
  //   // check if the product is already in the cart
  //   const productInCartIndex = cart.findIndex((item) => item.id === product.id);

  //   if (productInCartIndex >= 0) {
  //     // structuredClone es una función nativa de JavaScript que permite crear una copia profunda de un objeto
  //     const newCart = structuredClone(cart);
  //     newCart[productInCartIndex].quantity += 1;
  //     return setCart(newCart);
  //   }

  //   setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
  // };

  // const removeFromCart = (product) => {
  //   setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  // };
  
  // const clearCart = () => {
  //   setCart([]);
  // };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
