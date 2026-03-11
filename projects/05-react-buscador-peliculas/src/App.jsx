import './App.css';
// useRef es un hook que nos permite crear una referencia mutable a un elemento del DOM o a un valor mutable que persiste entre renderizados. useState renderiza el componente cada vez que se actualiza el estado, mientras que useRef no provoca un nuevo renderizado cuando su valor cambia
import { useRef, useState, useEffect } from 'react';
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';

function useSearch() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);

  const isFirstInput = useRef(true); // con useRef podemos crear una referencia mutable que persiste entre renderizados, en este caso estamos creando una referencia para saber si es la primera vez que el usuario escribe algo en el input

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = query === ''; // si el valor de query es una cadena vacía, entonces es la primera vez que el usuario escribe algo en el input, por lo tanto, isFirstInput.current se mantiene como true, pero si el valor de query no es una cadena vacía, entonces isFirstInput.current se actualiza a false, indicando que ya no es la primera vez que el usuario escribe algo en el input
      return;
    }
    
    if (query === '') {
      // en el primer render, se va a ver este error
      setError('No se puede buscar una película sin un término de búsqueda');
      return;
    }

    if (query.match(/^\d+$/)) {
      setError(
        'No se puede buscar una película con un término de búsqueda que solo contenga números',
      );
      return;
    }

    if (query.length < 3) {
      setError('El término de búsqueda debe tener al menos 3 caracteres');
      return;
    }

    setError(null);
  }, [query]);

  return { query, setQuery, error };
}

function App() {
  const { movies } = useMovies();
  const { query, setQuery, error } = useSearch();
  // const inputRef = useRef(); // <- no abusar de esto, generalmente hay mejores formas de hacerlo, pero en este caso lo mejor es usar lo nativo
  // si tienes 10 inputs y usas 10 useRef, es un poco molesto
  // ahora, lo malo con esto es que cada vez que el usuario escriba algo, el componente se va a renderizar

  // se mueve al custom hook useSearch
  // const [query, setQuery] = useState('');
  console.log('Rendering App');

  // se mueve al custom hook useSearch
  // const [error, setError] = useState(null);

  // al manejar todos los datos del formulario con el evento onSubmit, se le llama "uncontrolled form" o "formulario no controlado", ya que no estamos controlando el estado de cada input
  const handleSubmit = (e) => {
    e.preventDefault();
    // inputRef.current es el elemento del DOM al que estamos haciendo referencia, en este caso el input, y value es el valor actual del input
    // const value = inputRef.current.value; // con useRef podemos acceder al valor del input sin necesidad de usar un estado, ya que el valor del input no es necesario para renderizar el componente, solo lo necesitamos para hacer la consulta a la API, por eso es mejor usar useRef en este caso

    const fields = new FormData(e.target); // FormData es una interfaz que nos permite construir un conjunto de pares clave/valor representando los campos de un formulario y sus valores, que luego pueden ser fácilmente enviados utilizando el método fetch o XMLHttpRequest
    const query = fields.get('query'); // con FormData podemos acceder al valor del input de una forma mas sencilla, ya que solo necesitamos el nombre del campo para obtener su valor, en este caso 'query'
    console.log(query);

    // si hubiesen muchos campos:
    const data = Object.fromEntries(new FormData(e.target)); // con Object.fromEntries podemos convertir un objeto iterable de pares clave/valor en un objeto normal, en este caso estamos convirtiendo el FormData en un objeto normal para poder acceder a sus propiedades de una forma mas sencilla
    console.log(data);

    // ahora, con el formulario controlado, el valor del input ya lo tenemos en el estado query
    console.log({ query });
  };

  // la forma "controlada" o "controlled form" es cuando cada input tiene un estado asociado y se actualiza cada vez que el usuario escribe algo
  const handleChange = (e) => {
    const newQuery = e.target.value;

    if (newQuery.startsWith(' ')) {
      return;
    } // esto evita que se actualice el valor del estado si el nuevo valor empieza con un espacio
    setQuery(newQuery);

    // aqui tambien podríamos hacer validaciones que estan en el useEffect que esta en el custom hook useSearch, de hecho, el linter genera el error react-hooks/set-state-in-effect, que nos dice que no es buena idea actualizar el estado dentro de un useEffect, ya que puede generar un bucle infinito de renderizados, por eso es mejor hacer las validaciones dentro del handleChange, para evitar ese error
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>

        <form className="form" onSubmit={handleSubmit}>
          <input
            // ref={inputRef}
            value={query}
            onChange={handleChange}
            name="query"
            type="text"
            placeholder="Avengers, Star Wars, Matrix..."
            className="input"
          />
          <button type="submit" className="button">
            Buscar
          </button>
        </form>

        {error && <p className="error">{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
