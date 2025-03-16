import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { apiKey } from "../data/api";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export function MovieCart() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
        .then((response) => {
          setMovie(response.data);
        });
    }
  }, [id]);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-900 text-white p-6">
      {/* Back Button */}
      <div className="w-full max-w-5xl mb-8">
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/movies")}
          sx={{
            backgroundColor: "#7c3aed",
            "&:hover": { backgroundColor: "#6d28d9" },
            borderRadius: "9999px",
            paddingX: "20px",
            paddingY: "10px",
            fontWeight: "bold",
          }}
        >
          Back
        </Button>
      </div>

      {/* Movie Details */}
      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-5xl bg-gray-800 rounded-2xl p-6 shadow-lg">
        <img
          className="w-full max-w-[350px] h-[500px] object-cover rounded-xl mx-auto lg:mx-0"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="flex flex-col justify-between gap-6 flex-1">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{movie.title}</h2>
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
          </div>
          <h4 className="text-lg text-gray-400">🎬 Release Date: {movie.release_date}</h4>
        </div>
      </div>
    </div>
  );
}
