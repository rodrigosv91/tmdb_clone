import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

instance.defaults.params = {};
instance.defaults.params["api_key"] = process.env.REACT_APP_TMDB_API_KEY;
instance.defaults.params["language"] = "pt-BR";

// Funções para requisições específicas
export const fetchTopRatedMovies = () => instance.get("/movie/top_rated");
export const fetchGenres = () => instance.get("/genre/movie/list");
export const fetchMoviesByGenre = (genreId) =>
  instance.get(`/discover/movie?with_genres=${genreId}`);
export const fetchSearchResults = (query) =>
  instance.get("/search/movie", { params: { query } });

export default instance;
