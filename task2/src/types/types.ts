interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  genres?: Genre[];
}

interface Genre {
  id: number;
  name: string;
}

interface MovieState {
  movies: Movie[];
  favorites: Movie[];
  watchlist: Movie[];
  searchResults: Movie[];
  genres: Genre[];
  isLoading: boolean;
  searchQuery: string;
  selectedMovie: Movie | null;
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
  isWatched: (movieId: number) => boolean;
  setMovies: (movies: Movie[]) => void;
  setSearchResults: (movies: Movie[]) => void;
  setGenres: (genres: Genre[]) => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedMovie: (movie: Movie | null) => void;
}

export type {Movie, Genre, MovieState};