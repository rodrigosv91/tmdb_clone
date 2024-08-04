import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import tmdb from "../tmdb";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieResponse, castResponse] = await Promise.all([
          tmdb.get(`/movie/${id}`),
          tmdb.get(`/movie/${id}/credits`),
        ]);
        setMovie(movieResponse.data);
        setCast(castResponse.data.cast);
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div
      className="movieDetail"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="movieDetail__container">
        <button className="back-button" onClick={handleBackClick}>
          Voltar
        </button>
        <div className="movieDetail__overlay">
          <div className="movieDetail__content">
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>Rating: {movie.vote_average}</p>
            <p>Release Date: {movie.release_date}</p>
            <h2>Cast</h2>
            <div className="movieDetail__cast">
              {cast.slice(0, 10).map((actor) => (
                <div key={actor.id} className="movieDetail__castMember">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="movieDetail__castImage"
                  />
                  <p>{actor.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
