import { useState } from "react";
import { createContext } from "react";

// crea un contexto para los filtros, esto nos permite evitar el prop drilling y compartir el estado de los filtros entre componentes sin tener que pasar props por cada nivel de la jerarquía de componentes
// 1. Crear el contexto -> se usa este contexto para consumir los datos
export const FilterContext = createContext()

// 2. crear Provider, que encierra a los componentes que necesitan acceder al estado de los filtros, en este caso el Header y el Footer -> se usa este provider para proveer los datos a los componentes que lo necesiten
export function FiltersProvider({ children }) { 
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
  });

  return (
    // en el value se ponen los datos que queremos compartir y pueden haber datos estaticos (como traducciones, temas, etc) o dinámicos (con useState, useReducer, etc)
    <FilterContext.Provider
      // value={{
      //   category: 'all',
      //   minPrice: 0,
      // }}
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
