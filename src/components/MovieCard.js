// src/components/MovieCard.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tmdb from "../tmdb";
import "./MovieCard.css";

const MovieCard = ({ fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await tmdb.get(fetchUrl);
      setMovies(response.data.results);
    };

    fetchData();
  }, [fetchUrl]);

  return (
    <div className="movieCard">
      {movies.map((movie) => (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movieCard__image"
          />
        </Link>
      ))}
    </div>
  );
};

export default MovieCard;
