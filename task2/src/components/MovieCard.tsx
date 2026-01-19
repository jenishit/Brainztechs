import { useMovieStore } from '@/store/store';
import { Star, Heart, Bookmark } from 'lucide-react';
import type { Movie } from '@/types/types';
import {
    Card, CardContent, 
} from '@/components/ui/card';
import { getImageUrl } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'react-toastify';

export const MovieCard = ({ movie }: { movie: Movie }) => {
    const { 
        isFavorite, 
        addToFavorites, 
        removeFromFavorites, 
        isWatched, 
        addToWatchlist, 
        removeFromWatchlist, 
        genres, 
        setSelectedMovie 
    } = useMovieStore();
    
    const isFav = isFavorite(movie.id);
    const isWatch = isWatched(movie.id);

    const handleFavoriteToggle = () => {
        if (isFav) {
            toast.error("Removed from favorites");
            removeFromFavorites(movie.id);
        }
        else {
            toast.success("Added to favorites");
            addToFavorites(movie);
        }
    };

    const handleWatchlistToggle = () => {
        if (isWatch) {
            toast.error("Removed from watchlist");
            removeFromWatchlist(movie.id);
        }
        else {
            toast.success("Added to watchlist");
            addToWatchlist(movie);
        }
    };

    const movieGenres = genres.filter((g) => movie.genre_ids?.includes(g.id)).slice(0, 2);

    return (
        <Card 
            className='overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer' 
            onClick={() => setSelectedMovie(movie)}
        >
            <div className="relative">
                <img 
                    src={getImageUrl(movie.poster_path)} 
                    alt={movie.title} 
                    className='w-full h-96 object-cover' 
                />
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`${isFav ? 'text-red-500' : 'text-white'} bg-black/50 hover:bg-black/70`} 
                        onClick={handleFavoriteToggle}
                    >
                        <Heart className={isFav ? 'fill-current' : ''} />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`${isWatch ? 'text-blue-500' : 'text-white'} bg-black/50 hover:bg-black/70`} 
                        onClick={handleWatchlistToggle}
                    >
                        <Bookmark className={isWatch ? 'fill-current' : ''} />
                    </Button>
                </div>
            </div>
            <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-1">{movie.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{movie.vote_average.toFixed(1)}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                        {movie.release_date?.split('-')[0] || 'N/A'}
                    </span>
                </div>
                <div className="flex gap-1 flex-wrap mb-2">
                    {movieGenres.map((genre) => (
                        <Badge key={genre.id} variant="secondary" className="text-xs">
                            {genre.name}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};