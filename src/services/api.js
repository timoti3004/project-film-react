const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page = 1) => { // Terima argumen 'page'
    try {
      // Tambahkan parameter &page=${page} di URL API Anda
      const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.results; 
    } catch (error) {
      console.error("Error fetching popular movies:", error);
      throw error;
    }
  };

export const searchMovies = async (query) => {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json()
    return data.results
};