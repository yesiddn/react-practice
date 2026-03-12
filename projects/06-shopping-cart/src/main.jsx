import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { FiltersProvider } from './context/filters.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* envolver el App con el Provider de los filtros permite que cualquier componente dentro del App pueda acceder al estado de los filtros */}
    <FiltersProvider>
      {/* No se usa aqui el provider porque hay que mantener los providers lo mas centralizados posible, es decir, que el scope sea lo minimo */}
      {/* <CartProvider> */}
        <App />
      {/* </CartProvider> */}
    </FiltersProvider>
  </StrictMode>,
);
