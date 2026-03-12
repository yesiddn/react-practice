import { useContext } from "react";
import { CartContext } from "../context/cart";

export function useCart() { 
  const cart = useContext(CartContext)

  // es buena práctica lanzar un error si el hook se usa fuera del provider, esto ayuda a detectar errores de implementación y a asegurar que el hook se use correctamente dentro del contexto adecuado
  if (!cart) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return cart;
}