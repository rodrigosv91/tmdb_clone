// src/tmdb.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

instance.defaults.params = {};
instance.defaults.params["api_key"] = "ce98f434297ccfbb879ebff4a364ee98"; // substitua pela sua chave da API
instance.defaults.params["language"] = "pt-BR";

export default instance;
