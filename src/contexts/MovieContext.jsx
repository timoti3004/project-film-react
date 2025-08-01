import { createContext, useState, useContext, useEffect } from "react";
import toast from 'react-hot-toast';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

// 1. Buat fungsi untuk mendapatkan nilai awal dari localStorage
const getInitialFavorites = () => {
    const storedFavs = localStorage.getItem("favorites");
    try {
        return storedFavs ? JSON.parse(storedFavs) : [];
    } catch (error) {
        console.error("Failed to parse favorites from localStorage", error);
        return [];
    }
};

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(getInitialFavorites);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const isFavorite = (movieId) => {
        return favorites.some((movie) => movie.id === movieId);
    };

    const addToFavorites = (movie) => {
        setFavorites((prev) => [...prev, movie]);
        toast.success(`${movie.title} berhasil ditambahkan ke favorit!`);
    };

    const removeFromFavorites = (movieId) => {
        const movieToRemove = favorites.find((movie) => movie.id === movieId);
        if (movieToRemove) {
            setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
            toast.success(`${movieToRemove.title} berhasil dihapus dari favorit.`);
        }
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