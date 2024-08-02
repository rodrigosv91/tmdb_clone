import React, { useEffect, useState } from "react";
import tmdb from "../tmdb";
import MovieCard from "../components/MovieCard";
import "./Home.css";

const Home = ({ searchTerm }) => {
  const [categories, setCategories] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = [
          tmdb.get("/movie/top_rated"),
          tmdb.get("/genre/movie/list"),
        ];
        const [topRated, genres] = await Promise.all(requests);

        const categoriesData = genres.data.genres.map((genre) => {
          return {
            title: genre.name,
            fetchUrl: `/discover/movie?with_genres=${genre.id}`,
          };
        });

        setCategories([
          { title: "Mais Votados", fetchUrl: "/movie/top_rated" },
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
      const fetchSearchResults = async () => {
        try {
          const response = await tmdb.get("/search/movie", {
            params: { query: searchTerm },
          });
          setFilteredMovies(response.data.results);
        } catch (error) {
          console.error("Erro ao buscar resultados da pesquisa:", error);
        }
      };

      fetchSearchResults();
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
              <MovieCard fetchUrl={category.fetchUrl} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
