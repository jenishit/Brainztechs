import { Link } from 'react-router-dom';
import {User } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Header() {
    return (
        <header className="bg-blue-700 p-4 text-white text-left font-bold flex items-center justify-between">
            <div>BrainzMovieTechs</div>
            <div className="flex justify-between items-center">
                <nav className="space-x-4 text-10px font-medium flex justify-between">
                    <Input type="text" placeholder="Search movies..." className="mr-4 px-2 py-1 border-radius bg-white focus:ring-2 focus:ring-blue-500" value={searchQuery} onChange={(e) => setSearchQuery(else.target.value)} />
                    <Link to="/favorites" className="hover:text-gray-300 hover:underline">My Favorites</Link>
                    <Link to="/watchlist" className="hover:text-gray-300 hover:underline">My Watchlist</Link>
                    <Link to="/profile" className="hover:text-gray-300 hover:underline"><User className='hover:outline-2 outline-white rounded-full'/></Link>
                </nav>
            </div>
        </header>
    );
}