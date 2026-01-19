import { useMovieStore } from '@/store/store';
import { Star, Heart, Bookmark, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getImageUrl } from '@/services/api';

export const MovieDetails = () => {
    const { 
        selectedMovie, 
        setSelectedMovie,
        isFavorite,
        addToFavorites,
        removeFromFavorites,
        isWatched,
        addToWatchlist,
        removeFromWatchlist,
        genres
    } = useMovieStore();

    if (!selectedMovie) return null;

    const isFav = isFavorite(selectedMovie.id);
    const isWatch = isWatched(selectedMovie.id);

    const handleFavoriteToggle = () => {
        if (isFav) removeFromFavorites(selectedMovie.id);
        else addToFavorites(selectedMovie);
    };

    const handleWatchlistToggle = () => {
        if (isWatch) removeFromWatchlist(selectedMovie.id);
        else addToWatchlist(selectedMovie);
    };

    const movieGenres = genres.filter((g) => selectedMovie.genre_ids?.includes(g.id));

    return (
        <Dialog open={!!selectedMovie} onOpenChange={() => setSelectedMovie(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="relative -mx-6 -mt-6 mb-4">
                    <img 
                        src={getImageUrl(selectedMovie.backdrop_path || selectedMovie.poster_path, 'w1280')} 
                        alt={selectedMovie.title} 
                        className='w-full h-64 object-cover' 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    
                    <DialogHeader className="absolute bottom-4 left-6 right-6 text-white">
                        <DialogTitle className="text-3xl font-bold">{selectedMovie.title}</DialogTitle>
                    </DialogHeader>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="text-lg font-semibold">{selectedMovie.vote_average.toFixed(1)}</span>
                            <span className="text-sm text-muted-foreground">
                                ({selectedMovie.vote_count} votes)
                            </span>
                        </div>
                        
                        {selectedMovie.release_date && (
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">
                                    {new Date(selectedMovie.release_date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        )}
                    </div>

                    {movieGenres.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                            {movieGenres.map((genre) => (
                                <Badge key={genre.id} variant="secondary">
                                    {genre.name}
                                </Badge>
                            ))}
                        </div>
                    )}

                    <div>
                        <h3 className="font-semibold text-lg mb-2">Overview</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {selectedMovie.overview || 'No overview available.'}
                        </p>
                    </div>
                    <div className="flex gap-2 pt-4">
                        <Button
                            className="flex-1"
                            variant={isFav ? 'default' : 'outline'}
                            onClick={handleFavoriteToggle}
                        >
                            <Heart className={`w-4 h-4 mr-2 ${isFav ? 'fill-current' : ''}`} />
                            {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
                        </Button>
                        <Button
                            className="flex-1"
                            variant={isWatch ? 'default' : 'outline'}
                            onClick={handleWatchlistToggle}
                        >
                            <Bookmark className={`w-4 h-4 mr-2 ${isWatch ? 'fill-current' : ''}`} />
                            {isWatch ? 'Remove from Watchlist' : 'Add to Watchlist'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};