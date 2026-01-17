import {useMovieStore} from './movieStore';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default function Favorites() {
    const {favoriteMovies, setSelectedMovie} = useMovieStore();
    const favorites = favoriteMovies || [];
    return (
        <>
            <div className='grid gap-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-4'>
                {favorites.map((movie) => (
                    <Card key={movie.id} className='flex hover:shadow-lg h-auto w-auto cursor-pointer' onClick={() => setSelectedMovie(movie)}>
                    <CardHeader className='text-center'>
                        <CardTitle>{movie.title}</CardTitle>
                    </CardHeader>
                    <CardContent className='flex flex-col items-center gap-2'>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='w-50 h-50' />
                        <div>Rating: {movie.vote_average.toFixed(2)}</div>
                    </CardContent>
                </Card>
                ))}
            </div>
        </>
    );
}