import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  console.log(movie);
  return (
    <div key={movie.id} className="movieCard">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movieCard__poster"
        />
      </Link>
    </div>
  );
};

export default MovieCard;
