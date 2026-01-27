import  {
  createBrowserRouter
} from 'react-router';
import {MainLayout} from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import Courses from './pages/Courses/Courses';
import MyCourses from './pages/MyCourses';
import InstructorDashboard from './pages/InstructorDashboard';
import LoginPage from './pages/LoginPage';
import About from './pages/About';
import CourseDetails from './pages/Courses/CourseDetails';
import Signup from './pages/Signup';
import { ProtectedRoute } from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';

export const router = createBrowserRouter([
    {
        element: <MainLayout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "courses",
                element: <Courses />,
                children: [
                    {
                        path: ":courseId",
                        element: <CourseDetails />,
                    },
                ],
            },
            {
                path: "my-courses",
                element: (
                    <ProtectedRoute allowedRoles={['student']}>
                        <MyCourses />
                    </ProtectedRoute>
                ),
            },
            {
                path: "instructor",
                element: (
                    <ProtectedRoute allowedRoles={['instructor']} >
                        <InstructorDashboard />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />,
    },
]);