import { useState, useEffect } from "react";
import axios from "axios";
import { apiKey, popular } from "../data/api";

interface MovieList {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
}

export function Home() {
  const [movieList, setMovieList] = useState<MovieList[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`${popular}?api_key=${apiKey}`).then((response) => {
      const result = response.data.results;
      setMovieList(result);
      console.log(result);
    });
  };

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Popularne Filmy</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movieList.map((film) => (
          <div
            key={film.id}
            className="group relative overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            {film.poster_path && (
              <img
                className="w-full h-auto object-cover"
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} // Zwiększona rozdzielczość
                alt={film.title}
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-lg font-semibold">{film.title}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
