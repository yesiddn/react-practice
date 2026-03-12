
import { useState } from 'react';
import { searchMovies } from '../services/movies';
import { useRef } from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';

export function useMovies({ query, sort }) {
  // una vez se mueve la logica a un servicio que obtiene y mapea los datos, el custom hook se vuelve mucho mas simple
  // const [responseMovies, setResponseMovies] = useState([]);

  // const movies = responseMovies.Search;

  // de esto se hablo en el componente Movies.jsx, es mejor hacer un mapeo de las propiedades que vienen de la API a unas propiedades mas amigables para nuestro código
  // const mappedMovies = movies?.map((movie) => ({
  //   id: movie.imdbID,
  //   title: movie.Title,
  //   year: movie.Year,
  //   poster: movie.Poster,
  // }));

  // const getMovies = () => { 
  //   if (query) {
  //     // setResponseMovies(withResults);
  //     fetch(`https://www.omdbapi.com/?apikey=e67d5036&s=${query}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setResponseMovies(data);
  //       });
  //   } else {
  //     setResponseMovies(withoutResult);
  //   }
  // }
  
  // resultado:
  const [movies, setMovies] = useState([]);
  // incluso se puede mejorar
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // evitar hacer la consulta a la API si la query es la misma
  const previousQuery = useRef(query);

  // esta funcion tambien se vuelve a crear o cambia su referencia cada vez que se renderiza el componente
  // usar el useMemo con una funcion es un poquito engorroso, es raro usar una funcion y dentro retornar otra funcion, por ello existe el hook useCallback, que es exactamente igual al useMemo pero pensado para funciones
  // const getMovies = useMemo(() => { 
  //   return async ({ query }) => {
  //     if (query === previousQuery.current) return; // si la query es la misma que la anterior, no hacemos nada
  //     previousQuery.current = query; // actualizamos la query anterior a la actual
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       const newMovies = await searchMovies(query);
  //       setMovies(newMovies);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // }, []); // de esta forma, la función getMovies se crea una sola vez y no cambia su referencia en cada renderizado
  // useCallback:
  const getMovies = useCallback(async ({ query }) => {
    if (query === previousQuery.current) return; // si la query es la misma que la anterior, no hacemos nada
    previousQuery.current = query; // actualizamos la query anterior a la actual
    setLoading(true);
    setError(null);

    try {
      const newMovies = await searchMovies(query);
      setMovies(newMovies);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); 

  // const sortedMovies = sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies; // esta funcion se ejecuta cada vez que se renderiza el componente, pasa lo mismo con todas las funciones que tenemos, a excepcion de los hooks como useState, useRef, etc, que tienen una "referencia" que se mantiene entre renderizados por ende no es que se ejecute como tal

  // el usememo se debe pensar muy bien donde usarlo ya que en calculos super pequeños no va a hacer una gran diferencia, pero es casos de calculos pesados, como ordenar una lista de 1000 elementos, entonces si es recomendable usarlo
  const sortedMovies = useMemo(() => {
    console.log('Sorting movies');
    return sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies;
  }, [sort, movies]); // useMemo es un hook que nos permite memoizar el resultado de una función, es decir, si los valores de las dependencias no cambian, entonces no se vuelve a ejecutar la función -> tiene dependencias al igual que useEffect y cuando estas cambian, entonces se vuelve a ejecutar la función y se actualiza el resultado memoizado

  return { movies: sortedMovies, getMovies, loading, error };
}
