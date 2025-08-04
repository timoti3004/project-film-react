import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesByGenre } from '../services/api';
import MovieCard from '../components/MovieCard';
import SkeletonMovieCard from '../components/SkeletonMovieCard';
import '../css/Home.css'; // Kita bisa gunakan ulang CSS dari Home

function GenrePage() {
  // Ambil ID dan nama genre dari URL
  const { genreId, genreName } = useParams();
  
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMovies = useCallback(async (currentPage) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const newMovies = await getMoviesByGenre(genreId, currentPage);
      if (newMovies.length > 0) {
        setMovies(prev => [...prev, ...newMovies]);
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [genreId, loading, hasMore]);

  // Efek untuk memuat data awal saat genreId berubah
  useEffect(() => {
    setMovies([]); // Kosongkan daftar film saat berpindah genre
    setPage(1);
    setHasMore(true);
    loadMovies(1);
  }, [genreId]); // Bergantung pada genreId

  // Efek untuk infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 200 >= document.documentElement.offsetHeight && hasMore && !loading) {
        loadMovies();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, loadMovies]);

  return (
    <div className="home"> {/* Gunakan class dari Home untuk konsistensi */}
      <h1 className="page-title">Genre: {genreName}</h1>
      <div className="movies-grid">
        {loading && movies.length === 0 ? (
          Array.from({ length: 10 }).map((_, index) => <SkeletonMovieCard key={index} />)
        ) : (
          movies.map(movie => <MovieCard movie={movie} key={`${movie.id}-${Math.random()}`} />)
        )}
      </div>
      {loading && movies.length > 0 && <div className="loading">Loading more...</div>}
      {!hasMore && <div className="loading">You've reached the end for this genre!</div>}
    </div>
  );
}

export default GenrePage;