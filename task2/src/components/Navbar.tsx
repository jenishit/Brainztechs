import { useMovieStore } from '@/store/store';
import { Search } from 'lucide-react';
import {useState} from 'react';
import { movieApi } from '@/services/api';
import {toast} from 'react-toastify';
import {Input} from '@/components/ui/input';

export const Navbar = () => {
    const { searchQuery, setSearchQuery, setLoading, setSearchResults } =  useMovieStore();
    const [localQuery, setLocalQuery] = useState(searchQuery);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!localQuery.trim()) return;

        setLoading(true);
        setSearchQuery(localQuery);

        try {
            const data = await movieApi.searchMovies(localQuery);
            setSearchResults(data.results);
        } catch(error) {
            toast.error(`Failed to search movies due to ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <nav className='flex gap-4 justify-between content-center bg-gray-400 p-2'>
                <h2>BrainzMovieTechs</h2>
                <div className='flex gap-5 pr-5 justify-center content-center'>
                    <form onSubmit={handleSearch} className="relative w-50 max-w-xl">
                        <Search className="stroke-black absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input type="text" placeholder="Search for movies..." value={localQuery}
                            onChange={(e) => setLocalQuery(e.target.value)} className="text-black bg-amber-50 pl-10 pr-4" />
                    </form>
                </div>
            </nav>
        </>
    );
}