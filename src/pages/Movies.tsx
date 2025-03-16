import { useEffect, useState } from "react";
import axios from "axios";
import { apiKey, popular } from "../data/api";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

interface Movies {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

export function Movies() {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [searchMovie, setSearchMovie] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${popular}?api_key=${apiKey}`);
      setMovies(response.data.results);
    } catch (err) {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMovie(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchMovie.toLowerCase())
  );

  const handleMovieCart = (id: number) => {
    navigate(`/movies/${id}`);
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      {/* Search */}
      <div className="w-full max-w-3xl mb-10 flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full px-4 shadow-md">
        <InputBase
          placeholder="Search movies..."
          value={searchMovie}
          onChange={handleSearchChange}
          className="flex-1 py-2 text-white placeholder-gray-400"
          inputProps={{ style: { color: "white" } }}
        />
        <IconButton>
          <SearchIcon className="text-white" />
        </IconButton>
      </div>

      {/* Loading & Error */}
      {loading && <p className="text-center text-gray-400">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Movies */}
      <div
        className="
          flex
          flex-wrap
          justify-center
          gap-8
          w-full
          max-w-[1600px]
        "
      >
        {filteredMovies.map((film) => (
          <div
            key={film.id}
            className="
              bg-gray-800
              rounded-2xl
              overflow-hidden
              shadow-lg
              flex flex-col
              items-center
              transition-transform
              hover:scale-105
              duration-300
              w-[230px]
              sm:w-[250px]
              md:w-[260px]
              lg:w-[280px]
            "
          >
            {film.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
                alt={film.title}
                className="w-full h-[370px] object-cover"
              />
            )}
            <div className="p-4 flex flex-col items-center gap-3 flex-grow justify-between">
              <h3 className="text-lg font-bold text-center">{film.title}</h3>
              <p className="text-gray-400 text-sm">Release: {film.release_date}</p>
              <Button
                onClick={() => handleMovieCart(film.id)}
                variant="contained"
                color="secondary"
                className="w-full"
                sx={{
                  backgroundColor: '#7c3aed',
                  '&:hover': {
                    backgroundColor: '#6d28d9',
                  },
                }}
              >
                See more...
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
