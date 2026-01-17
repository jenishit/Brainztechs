import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Movie, Genre, MovieState } from '../types/types';

export const useMovieStore = create<MovieState>()(
    persist(
        (set, get) => ({
            movies: [],
            favorites: [],
            watchlist: [],
            searchResults: [],
            genres: [],
            isLoading: false,
            searchQuery: '',
            
            addToFavorites: (movie: Movie) => {
                set((state) => ({
                    favorites:  [...state.favorites, movie],
                }));
            },
            removeFromFavorites: (movieId: number) => {
                set((State) => ({
                    favorites:  State.favorites.filter((m) => m.id !== movieId),
                }));
            },
            isFavorite: (movieId: number) => {
                return get().favorites.some((m) => m.id === movieId);
            },
            isWatched: (movieId : number) => {
                return get().watchlist.some((m) => m.id === movieId);
            },
            addToWatchlist: (movie: Movie) => {
                set((State) => ({
                    watchlist:  [...State.watchlist, movie],
                }));
            },
            removeFromWatchlist: (movieId: number) => {
                set((State) => ({
                    favorites:  State.watchlist.filter((m) => m.id !== movieId),
                }));
            },
            setMovies: (movies: Movie[]) => set({ movies }),
            setSearchResults: (movies: Movie[]) => set({ searchResults: movies}),
            setGenres: (genres: Genre[]) => set({ genres }),
            setLoading: (isLoading: boolean) => set({ isLoading }),
            setSearchQuery: ( query: string) => set({ searchQuery: query }),
        }),
        {
            name: 'movie-storage',
            partialize: (state) => ({ favorites: state.favorites }),
        }
    )
);