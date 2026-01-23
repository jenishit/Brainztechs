export interface Course {
    id: string;
    title: string;
    description: string;
    instructorId: string;
    category: string;
    duration: string;
    price: number;
    level: 'beginner' | 'intermediate' | 'advance';
    createdAt: string;
    updatedAt: string;
    enrolledStudents: number;
    rating: number;
    reviews: number;
}

export interface CourseState {
    courses: Course[];
    addCourse: (course: Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'enrolledStudents' | 'rating' | 'reviews'>) => void;
    updateCourse: (id: string, updates: Partial<Course>) => void;
    deleteCourse: (id: string) => void;
    getCourseById: (id: string) => Course | void;
    getCoursesByName: (title: string ) => Course[];
    getCoursesByInstructor: (instructorName: string) => Course[];
    getCoursesByCategory: (category: string) => Course[];
    getPopularCourse: (title: string) => Course[];
    searchCourse: (query: string) => Course[];
}