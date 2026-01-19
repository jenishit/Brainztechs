import { Heart, Bookmark } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { useMovieStore } from './store/store';
import {toast } from 'react-toastify';
import { movieApi } from './services/api';
import { MovieCard } from './components/MovieCard';
import { Tabs, TabsList, TabsTrigger, TabsContent} from '@/components/ui/tabs';
import {useEffect} from 'react';
import { MovieDetails } from './components/MovieDetails';

export default function App() {
  const {
    movies,
    favorites,
    watchlist,
    isLoading,
    searchQuery,
    searchResults,
    setMovies,
    setGenres,
    setLoading,
  } = useMovieStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [moviesData, genresData] = await Promise.all([
          movieApi.getPopularMovies(),
          movieApi.getGenre(),
        ]);
        setMovies(moviesData.results);
        setGenres(genresData.genres);
      } catch (err) {
        toast.error(`Failed to fetch movies ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const displayMovies = searchQuery ? searchResults : movies;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <Navbar />
      </header>
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="discover" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="favorites">
              Favorites ({favorites.length})
            </TabsTrigger>
            <TabsTrigger value="watchlist">
              Watchlist ({watchlist.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discover">

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {displayMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
                {displayMovies.length === 0 && (
                  <div className="text-center py-20 text-muted-foreground">
                    No movies found
                  </div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="favorites">
            {favorites.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Heart className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-lg">No favorites yet</p>
                <p className="text-sm">Start adding movies to your favorites!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favorites.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="watchlist">
            {watchlist.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Bookmark className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-lg">No movies in Watchlist yet</p>
                <p className="text-sm">Start adding movies to your watchlist!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favorites.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <MovieDetails />
    </div>
  );
}