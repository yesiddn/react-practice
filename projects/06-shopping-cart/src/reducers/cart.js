// estado inicial para el useReducer -> el initial state puede ser un string, un boolean, un objeto o cualquier tipo de dato, pero en este caso para probar use un objeto con una propiedad cart
export const cartInitialState = {
  cart: [],
}

// se puede mejorar el reducer con tipos
export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAN_CART: 'CLEAN_CART',
}

// luego se usa una funcion que recibe el estado y una accion para actualizar el estado
export const cartReducer = (state, action) => { // state es el estado actual del carrito 
  const { type, payload } = action; // type es el tipo de accion que se va a ejecutar y payload es la informacion que se necesita para ejecutar esa accion, por ejemplo, si la accion es agregar un producto al carrito, el payload seria el producto que se va a agregar
  
  // en lugar del switch se podria usar un objeto con las funciones para cada accion, las cuales reciben el state y el action, algo asi:
  // const UPDATE_STATE_BY_ACTION_TYPE = {
  //   [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {},
  //   [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {},
  //   [CART_ACTION_TYPES.CLEAN_CART]: (state, action) => {},
  // };
  // -> esta logica se deberia extraer fuera del reducer y solo hacer esto:
  // const updateStateFunction = UPDATE_STATE_BY_ACTION_TYPE[type];
  // return updateStateFunction ? updateStateFunction(state, action) : state;

  switch (type) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
      const { id } = payload;

      const productInCartIndex = state.cart.findIndex((item) => item.id === id);

      if (productInCartIndex >= 0) {
        // structuredClone es una función nativa de JavaScript que permite crear una copia profunda de un objeto
        const newCart = structuredClone(state.cart);
        newCart[productInCartIndex].quantity += 1;
        // return setCart(newCart); // en lugar de retornar el setCart, se retorna el nuevo estado del carrito
        return {
          ...state,
          cart: newCart,
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...payload, quantity: 1 }],
      }
    }
      
    case CART_ACTION_TYPES.REMOVE_FROM_CART: {
      const { id } = payload;

      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== id),
      }
    }
      
    case CART_ACTION_TYPES.CLEAN_CART: {
      return cartInitialState;
    }
  }

  return state
}