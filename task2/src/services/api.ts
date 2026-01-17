import axios from "axios";

const API_KEY = 'e5f827b00209f77caa54caff894cb6ef';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const movieApi = {
  getPopularMovies: async (page = 1) => {
    const response = await api.get('/movie/popular', { params: {page }, });
    return response.data;
  },

  searchMovies: async (query: string, page = 1) => {
    const response = await api.get('/search/movie', { params: {query, page},});
    return response.data;
  },

  getMovieDetails: async (movieId: number ) => {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  },

  getGenre: async () => {
    const response = await api.get('/genre/movie/list');
    return response.data;
  },

  getMoviesByGenre: async ( genreId: number, page=1 ) => {
    const response = await api.get('/discover/movie', { params: { genreId, page }, });
    return response.data;
  },
};

export const getImageUrl = (path: string | null, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `${IMAGE_URL}/${size}${path}`;
};