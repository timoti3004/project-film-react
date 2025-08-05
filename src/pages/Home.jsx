import MovieCard from "../components/MovieCard";
import SkeletonMovieCard from "../components/SkeletonMovieCard";
import { useState, useEffect, useCallback } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const loadPopularMovies = useCallback(async (currentPage) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const popularMovies = await getPopularMovies(currentPage);
      if (popularMovies.length > 0) {
        setMovies(prev => [...prev, ...popularMovies]);
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError("Failed to load movies...");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    if (!isSearching) {
      loadPopularMovies(1);
    }
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '' && isSearching) {
      setMovies([]);
      setPage(1);
      setHasMore(true);
      setIsSearching(false);
      setError(null);
      loadPopularMovies(1);
    }
  }, [searchQuery, isSearching, loadPopularMovies]);

  useEffect(() => {
    const handleScroll = () => {
      if (!isSearching && window.innerHeight + document.documentElement.scrollTop + 200 >= document.documentElement.offsetHeight && hasMore && !loading) {
        loadPopularMovies(page);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, page, isSearching, loadPopularMovies]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    setIsSearching(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setHasMore(false);
      setError(null);
    } catch (err) {
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading && isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      <div className="movies-grid">
        {loading && movies.length === 0 ? (
          Array.from({ length: 10 }).map((_, index) => <SkeletonMovieCard key={index} />)
        ) : (
          movies.map((movie) => <MovieCard movie={movie} key={`${movie.id}-${Math.random()}`} />)
        )}
      </div>
      {loading && movies.length > 0 && !isSearching && <div className="loading">Loading more...</div>}
      {!hasMore && !isSearching && movies.length > 0 && <div className="loading">You've reached the end!</div>}
    </div>
  );
}

export default Home;