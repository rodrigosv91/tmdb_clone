// src/tmdb.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

instance.defaults.params = {};
instance.defaults.params["api_key"] = process.env.REACT_APP_TMDB_API_KEY;
instance.defaults.params["language"] = "pt-BR";

export default instance;
