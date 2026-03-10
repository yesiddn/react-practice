export function ListOfMovies({ movies }) {
  return (
    <ul className="movies">
      {movies.map((movie) => (
        // es mala practica usar las propiedades que vienen de la API como Title, Year, etc. ya que si en el futuro la API cambia el nombre de estas propiedades, nos costara mucho trabajo cambiar el código, por eso es mejor usar un mapeo de las propiedades
        <li key={movie.id} className="movie">
          <h3>{movie.title}</h3>
          {/* antes */}
          {/* <p>{movie.Year}</p> */}
          {/* despues */}
          <p>{movie.year}</p>
          <img src={movie.poster} alt={`${movie.title} poster`} />
        </li>
      ))}
    </ul>
  );
}

export function NoMoviesResults() {
  return <p>No se encontraron películas para esta búsqueda.</p>;
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;

  return hasMovies
    ? <ListOfMovies movies={movies} />
    : <NoMoviesResults />;
}
