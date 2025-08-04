import '../css/MovieDetail.css'
import MovieDetailSkeleton from '../components/MovieDetailSkeleton';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieVideos, getMovieCredits, getSimilarMovies } from '../services/api';

function MovieDetail() {
  const { movieId } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([])
  const [cast, setCast] = useState([])
  const [similarMovies, setSimilarMovies] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setCast(creditsData);
        setSimilarMovies(similarData)
      } catch (err) {
        setError("Gagal memuat detail film.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]); // Jalankan efek ini setiap kali movieId berubah

  const trailer = videos.find(video => video.site === "YouTube" && video.type === "Trailer");

  if (loading) {
    return <MovieDetailSkeleton />;
  }

  if (error) return <div className="error-message">{error}</div>;
  if (!movie) return <div>Movie not found.</div>;

  return (
    <div className="movie-detail-page">
        <div className="movie-detail-container">
            <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title} 
                className="detail-poster"
            />
            <div className="detail-info">
                <h1>{movie.title}</h1>
                    {movie.tagline && <p className="detail-tagline"><em>"{movie.tagline}"</em></p>}
                    
                <div className="detail-meta">
                    <span>⭐ {movie.vote_average.toFixed(1)} / 10</span>
                    <span> | </span>
                    <span>{movie.runtime} menit</span>
                    <span> | </span>
                    <span>{movie.release_date}</span>
                </div>

                <div className="detail-genres">
                    {movie.genres.map(genre => (
                        <Link 
                        to={`/genre/${genre.id}/${genre.name}`} 
                        key={genre.id} 
                        className="genre-tag"
                      >
                        {genre.name}
                      </Link>
                    ))}
                </div>

                <h2>Overview</h2>
                <p>{movie.overview}</p>

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
                {cast.slice(0, 10).map(actor => ( // Ambil 10 pemeran utama
                    <div key={actor.cast_id} className="cast-card">
                        <img src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'path/to/placeholder.png'} alt={actor.name}/>
                        <strong>{actor.name}</strong>
                        <span>{actor.character}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* === BAGIAN BARU 3: FILM SERUPA (SIMILAR MOVIES) === */}
        <div className="detail-section">
            <h2>Similar Movies</h2>
            {/* Kita bisa gunakan ulang komponen MovieCard di sini! */}
            <div className="movies-grid">
                {similarMovies.slice(0, 5).map(similarMovie => ( // Ambil 5 film serupa
                    <MovieCard movie={similarMovie} key={similarMovie.id} />
                ))}
            </div>
        </div>
    </div>
);
}

export default MovieDetail;