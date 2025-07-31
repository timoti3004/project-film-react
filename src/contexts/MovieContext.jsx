import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

// 1. Buat fungsi untuk mendapatkan nilai awal dari localStorage
const getInitialFavorites = () => {
    const storedFavs = localStorage.getItem("favorites");
    // Gunakan try-catch untuk mencegah error jika data di localStorage tidak valid
    try {
        // Jika ada data, parse dan kembalikan. Jika tidak, kembalikan array kosong.
        return storedFavs ? JSON.parse(storedFavs) : [];
    } catch (error) {
        console.error("Failed to parse favorites from localStorage", error);
        return [];
    }
};

export const MovieProvider = ({ children }) => {
    // 2. Gunakan fungsi tersebut untuk menginisialisasi state
    const [favorites, setFavorites] = useState(getInitialFavorites);

    // 3. useEffect untuk memuat data bisa DIHAPUS karena sudah ditangani di atas
    /*
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");
        if (storedFavs) setFavorites(JSON.parse(storedFavs));
    }, []);
    */

    // useEffect untuk menyimpan data tetap ada dan tidak perlu diubah
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (movie) => {
        setFavorites((prev) => [...prev, movie]);
    };

    const removeFromFavorites = (movieId) => {
        setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
    };

    const isFavorite = (movieId) => {
        return favorites.some((movie) => movie.id === movieId);
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};