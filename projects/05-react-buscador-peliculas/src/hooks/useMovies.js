
import responseMovies from '../mocks/with-results.json';
import responseNoMovies from '../mocks/no-results.json';

export function useMovies() {
  const movies = responseMovies.Search;

  // de esto se hablo en el componente Movies.jsx, es mejor hacer un mapeo de las propiedades que vienen de la API a unas propiedades mas amigables para nuestro código
  const mappedMovies = movies?.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster,
  }));

  return { movies: mappedMovies };
}