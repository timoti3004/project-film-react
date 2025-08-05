import '../css/MovieDetail.css'
import MovieDetailSkeleton from '../components/MovieDetailSkeleton';
import MovieCard from '../components/MovieCard';
import placeholderImage from "../assets/no-image-placeholder.png"; 
import { useMovieContext } from '../contexts/MovieContext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieVideos, getMovieCredits, getSimilarMovies } from '../services/api';

function MovieDetail() {
  const { movieId } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [credits, setCredits] = useState({ cast: [], crew: [] });
  const [similarMovies, setSimilarMovies] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);

        const [details, videosData, creditsData, similarData] = await Promise.all([
            getMovieDetails(movieId),
            getMovieVideos(movieId),
            getMovieCredits(movieId),
            getSimilarMovies(movieId)
        ]);

        setMovie(details);
        setVideos(videosData);
        setCredits(creditsData);
        setSimilarMovies(similarData)
        console.log("Data Credits yang Diterima:", creditsData);
      } catch (err) {
        setError("Gagal memuat detail film.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  const { cast, crew } = credits;
  const trailer = videos.find(video => video.site === "YouTube" && video.type === "Trailer");
  const directors = crew.filter(member => member.job === "Director");
  const writers = crew.filter(member => member.job === "Screenplay" || member.job === "Writer");
  const favorite = isFavorite(movie?.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (favorite && movie) {
      removeFromFavorites(movie.id);
    } else if (movie) {
      addToFavorites(movie);
    }
  };

  if (loading) {
    return <MovieDetailSkeleton />;
  }

  if (error) return <div className="error-message">{error}</div>;
  if (!movie) return <div>Movie not found.</div>;

  return (
    <div className="movie-detail-page">
      <div className="movie-detail-container">
        <div className='detail-poster-wrapper'>
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : placeholderImage}
            alt={movie.title}
            className="detail-poster"
          />
          <button
            className={`favorite-btn detail-favorite-btn ${favorite ? "active" : ""}`}
            onClick={handleFavoriteClick}
            title={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            ❤
          </button>
        </div>
        
        <div className="detail-info">
          <h1>{movie.title} ({movie.release_date?.split('-')[0]})</h1>
          
          {/* <div className="meta-and-actions">
            {movie.status && (
              <span className={`movie-status ${movie.status.toLowerCase().replace(' ', '-')}`}>
                {movie.status}
              </span>
            )}
          </div> */}

          {movie.tagline && <p className="detail-tagline"><em>"{movie.tagline}"</em></p>}
          <div className="detail-meta">
            <span>⭐ {movie.vote_average?.toFixed(1)} / 10</span>
            <span>|</span>
            <span>{movie.runtime} menit</span>
          </div>
          
          <div className="detail-genres">
            {movie.genres.map(genre => (
              <Link to={`/genre/${genre.id}/${genre.name}`} key={genre.id} className="genre-tag">
                {genre.name}
              </Link>
            ))}
          </div>

          <h2>Overview</h2>
          <p>{movie.overview}</p>
          
          <div className="crew-info">
            {directors.length > 0 && (
              <p><strong>Director:</strong> {directors.map(d => d.name).join(', ')}</p>
            )}
            {writers.length > 0 && (
              <p><strong>Writers:</strong> {writers.map(w => w.name).join(', ')}</p>
            )}
          </div>
          {movie.production_companies && movie.production_companies.length > 0 && (
            <div className="production-companies">
              <strong>Production: </strong>
              <span>{movie.production_companies.map(c => c.name).join(', ')}</span>
            </div>
          )}

          {trailer && (
            <a
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="trailer-button"
            >
              🎬 Watch Trailer
            </a>
          )}
        </div>
      </div>
      
      <div className="detail-section">
        <h2>Top Billed Cast</h2>
        <div className="cast-container">
          {cast.slice(0, 10).map(actor => (
            <div key={actor.cast_id} className="cast-card">
              <img src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : placeholderImage} alt={actor.name} />
              <strong>{actor.name}</strong>
              <span>{actor.character}</span>
            </div>
          ))}
        </div>
      </div>

      {similarMovies.length > 0 && (
        <div className="detail-section">
          <h2>Similar Movies</h2>
          <div className="movies-grid">
            {similarMovies.slice(0, 5).map(similarMovie => (
              <MovieCard movie={similarMovie} key={similarMovie.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;