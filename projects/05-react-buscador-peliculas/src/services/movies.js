const API_KEY = 'e67d5036';

export async function searchMovies(query) { 
  if (query === '') return null

  if (!query) return null

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
    const data = await response.json();

    const movies = data.Search;

    const mappedMovies = movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));

    return mappedMovies;
  } catch (error) {
    throw new Error('Error searching movies');
  }
}