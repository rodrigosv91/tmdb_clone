// src/pages/Home.js
import React, { useEffect, useState } from "react";
import tmdb from "../tmdb";
import MovieCard from "../components/MovieCard";
import "./Home.css";

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      {categories.map((category) => (
        <div className="home__category" key={category.title}>
          <h2>{category.title}</h2>
          <div className="home__movies">
            <MovieCard fetchUrl={category.fetchUrl} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
