import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export const MainLayout = () => {
    return (
        <>
            <Navbar />
            <main className="container mx-auto pt-20 px-4">
                <Outlet />
            </main>
        </>
    );
};