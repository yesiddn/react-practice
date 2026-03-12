import './Filters.css';
import { useId } from 'react';
import { useFilters } from '../hooks/useFilters';

export function Filters() {
  const { filters, setFilters: changeFilters } = useFilters();
  
  // tener este useState y a la vez un contexto, es un error, ya que estamos generando dos fuentes de informacion, por ende si cambiamos el valor del contexto, el valor del useState no se va a actualizar y eso puede generar bugs, por eso es importante tener una sola fuente de verdad, en este caso el contexto, asi que eliminamos este useState y usamos el estado del contexto
  // const [minPrice, setMinPrice] = useState(0);
  const minPriceFilterId = useId(); // useId es un hook que genera un id unico para cada componente, es util para asociar labels con inputs
  const categoryFilterId = useId();

  const handleChangeMinPrice = (event) => {
    // se elimina para usar el contexto
    // setMinPrice(event.target.value);
    // usar el callback de setState para cambiar el estado de los filtros en el componente padre es una mala idea y pasar una propiedad de padre a hijo varias veces se llama prop drilling y también es una mala idea
    // otra forma de evitar el prop drilling cuando no hay muchos hijos (como en este caso) es poner este componente en el app usando children, asi:
    // <Header />
    //  <Filters changeFilters={setFilters} />
    // </Header>
    changeFilters(prevFilters => ({
      ...prevFilters,
      minPrice: event.target.value
    }));
  }

  const handleChangeCategory = (event) => {
    changeFilters(prevFilters => ({
      ...prevFilters,
      category: event.target.value
    }));
  }

  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
        <input
          type="range"
          value={filters.minPrice}
          id={minPriceFilterId} // si ponemos un id como "price", puede existir otro input con el mismo id y eso es un error, useId nos ayuda a evitar eso generando un id unico para cada componente
          min="0"
          max="1000"
          onChange={handleChangeMinPrice}
        />
        <span>{filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Categoría:</label>
        <select name="" id={categoryFilterId} onChange={handleChangeCategory}>
          <option value="all">Todas</option>
          <option value="laptops">Laptops</option>
          <option value="smartphones">Smartphones</option>
          <option value="tablets">Tablets</option>
        </select>
      </div>
    </section>
  );
}
