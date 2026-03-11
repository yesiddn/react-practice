
import { useState } from 'react';
import { searchMovies } from '../services/movies';

export function useMovies({ query }) {
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

  const getMovies = async () => { 
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
  }

  return { movies, getMovies, loading, error };
}
