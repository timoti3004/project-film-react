import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import placeholderImage from "../assets/no-image-placeholder.png"; 
import { Link } from "react-router-dom";

function MovieCard({movie}){

    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if(favorite) removeFromFavorites(movie.id)
            else addToFavorites(movie)
    }

    return (
        <Link to={`/movie/${movie.id}`} className="movie-card-link">
          <div className="movie-card">
            <div className="movie-poster">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : placeholderImage
                }
                alt={movie.title}
              />
              <div className="movie-overlay">
                <button
                  className={`favorite-btn ${favorite ? "active" : ""}`}
                  onClick={onFavoriteClick}
                >
                  ❤
                </button>
              </div>
            </div>
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>{movie.release_date?.split("-")[0]}</p>
            </div>
          </div>
        </Link>
      );
}

export default MovieCard