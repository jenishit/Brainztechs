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
                element: <MyCourses />,
            },
            {
                path: "instructor",
                element: <InstructorDashboard />,
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
]);