import React, { useEffect, useState } from "react";
import {
  fetchTopRatedMovies,
  fetchGenres,
  fetchMoviesByGenre,
  fetchSearchResults,
} from "../tmdb";
import MovieCard from "../components/MovieCard";
import "./Home.css";

const Home = ({ searchTerm }) => {
  const [categories, setCategories] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topRated, genres] = await Promise.all([
          fetchTopRatedMovies(),
          fetchGenres(),
        ]);

        const categoriesData = await Promise.all(
          genres.data.genres.map(async (genre) => {
            const moviesByGenre = await fetchMoviesByGenre(genre.id);
            return {
              title: genre.name,
              movies: moviesByGenre.data.results,
            };
          })
        );

        setCategories([
          { title: "Mais Votados", movies: topRated.data.results },
          ...categoriesData,
        ]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredMovies([]);
    } else {
      const fetchSearchResultsAsync = async () => {
        try {
          const response = await fetchSearchResults(searchTerm);
          setFilteredMovies(response.data.results);
        } catch (error) {
          console.error("Erro ao buscar resultados da pesquisa:", error);
        }
      };

      fetchSearchResultsAsync();
    }
  }, [searchTerm]);

  return (
    <div className="home">
      {filteredMovies.length > 0 ? (
        <div className="home__category">
          <h2>Resultados da Pesquisa</h2>
          <div className="home__movies">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      ) : (
        categories.map((category) => (
          <div className="home__category" key={category.title}>
            <h2>{category.title}</h2>
            <div className="home__movies">
              {category.movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
