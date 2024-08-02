import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tmdb from "../tmdb";
import "./MovieCard.css";

const MovieCard = ({ movie, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (fetchUrl) {
      const fetchData = async () => {
        try {
          const response = await tmdb.get(fetchUrl);
          setMovies(response.data.results);
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      };

      fetchData();
    } else {
      setMovies([movie]);
    }
  }, [fetchUrl, movie]);

  return (
    <>
      {movies.map((movie) => (
        <div key={movie.id} className="movieCard">
          <Link to={`/movie/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movieCard__poster"
            />
          </Link>
        </div>
      ))}
    </>
  );
};

export default MovieCard;
