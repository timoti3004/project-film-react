const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page = 1) => {
    try {
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

export const getMovieDetails = async (movieId) => {
  try {
    // Endpoint untuk detail film biasanya /movie/{movie_id}
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    const data = await response.json();
    return data; // Kembalikan seluruh objek detail
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const getMovieVideos = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    throw error;
  }
};

// FUNGSI BARU UNTUK MENDAPATKAN PEMERAN (CAST)
export const getMovieCredits = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
    const data = await response.json();
    return data; // Kita hanya butuh bagian 'cast'
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
};

// FUNGSI BARU UNTUK MENDAPATKAN FILM SERUPA
export const getSimilarMovies = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    throw error;
  }
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    // Endpoint untuk discover film berdasarkan genre
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`);
    if (!response.ok) {
      throw new Error("Failed to fetch movies by genre");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    throw error;
  }
};

export const getActorDetails = async (personId) => {
  try {
    // Kita akan mengambil 2 data sekaligus: detail personal dan kredit film
    const personalDetailsPromise = fetch(`${BASE_URL}/person/${personId}?api_key=${API_KEY}`);
    const movieCreditsPromise = fetch(`${BASE_URL}/person/${personId}/movie_credits?api_key=${API_KEY}`);

    // Jalankan kedua permintaan API secara bersamaan untuk efisiensi
    const [personalDetailsResponse, movieCreditsResponse] = await Promise.all([
      personalDetailsPromise,
      movieCreditsPromise,
    ]);

    if (!personalDetailsResponse.ok || !movieCreditsResponse.ok) {
      throw new Error('Failed to fetch actor details.');
    }

    const personalDetails = await personalDetailsResponse.json();
    const movieCredits = await movieCreditsResponse.json();

    // Gabungkan hasilnya menjadi satu objek yang rapi
    return {
      ...personalDetails,
      movie_credits: movieCredits,
    };
  } catch (error) {
    console.error("Error fetching actor details:", error);
    throw error;
  }
};