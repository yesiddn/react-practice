import { useContext } from "react";
import { FilterContext } from "../context/filters";

export function useFilters() {
  // se reemplaza con el contexto
  // const [filters, setFilters] = useState({
  //   category: 'all',
  //   minPrice: 0,
  // });
  // 3. consumir el contexto -> se usa el useContext para consumir los datos del contexto
  const { filters, setFilters } = useContext(FilterContext)

  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        product.price >= filters.minPrice &&
        (filters.category === 'all' || product.category === filters.category)
      );
    });
  };

  return {
    filters,
    setFilters,
    filterProducts,
  }
}