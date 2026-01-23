import axios from "axios";
import type { AuthResponse, LoginData, SignupData, User } from "../../types/userTypes";
import type { Course } from "../../types/courseTypes";
import type { Enrollment } from "../../types/enrollmentTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use((response) => response, (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('currentUser');
            window.location.href = '/login'
        }
        return Promise.reject(error);
    }
);

export const apiServices = {
    getInstructors: async () => {
        const res = await api.get("instructors");
        return res.data;
    },

    getCourses: async () => {
        const res = await api.get("courses");
        return res.data;
    },

    getCourseDetails: async (courseId: number) => {
        const res = await api.get(`courses/${courseId}`);
        return res.data;
    },

    getStudentDetails: async (studentId: string) => {
        const res = await api.get(`students/${studentId}`);
        return res.data;
    },

    getStudent: async () => {
        const res = await api.get("students");
        return res.data;
    },

    signup: async (data: SignupData): Promise<AuthResponse> => {
        const res = await api.post("auth/signup", data);
        return res.data;
    },

    login: async (data: LoginData): Promise<AuthResponse> => {
        const res = await api.post("auth/login" , data);
        return res.data;
    },

    verifyToken: async (): Promise<User> => {
        const res = await api.get("auth/verify");
        return res.data;
    },

    logout: async () => {
        await api.post("auth/logout");
    },

    addCourse: async (courseData: Omit<Course, 'id'>) : Promise<Course> => {
        try {
            const res  = await api.post('instructor/addCourse', courseData);
            return res.data;
        } catch (error) {
            console.error('Course addition failed: ', error);
            throw error;
        }
    },

    updateCourse: async (courseId: number, updates: Partial<Course>): Promise<Course> => {
        try {
            const res = await api.put(`courses/${courseId}`, updates);
            return res.data;
        } catch(error) {
            console.error('Failed to update course', error);
            throw error;
        }
    },

    deleteCourse: async (courseId: string): Promise<void> => {
        try {
            await api.delete(`courses/${courseId}`);
        } catch (error) {
            console.error(`Failed to delete course ${courseId}:`, error);
            throw error;
        }
    },

    getCourseById: async (courseId: string): Promise<Course> => {
        try {
            const res = await api.get(`courses/${courseId}`);
            return res.data;
        } catch (error) {
            console.error(`Failed to fetch course ${courseId}:`, error);
            throw error;
        }
    },

    // Get courses by instructor ID
    getCoursesByInstructor: async (instructorId: string): Promise<Course[]> => {
        try {
            const res = await api.get(`courses/instructor/${instructorId}`);
            return res.data;
        } catch (error) {
            console.error(`Failed to fetch courses for instructor ${instructorId}:`, error);
            throw error;
        }
    },

    // Get courses by category
    getCoursesByCategory: async (category: string): Promise<Course[]> => {
        try {
            const res = await api.get(`courses/category/${category}`);
            return res.data;
        } catch (error) {
            console.error(`Failed to fetch courses in category ${category}:`, error);
            throw error;
        }
    },

    // Search courses
    searchCourses: async (query: string): Promise<Course[]> => {
        try {
            const res = await api.get(`courses/search`, { params: { q: query } });
            return res.data;
        } catch (error) {
            console.error('Failed to search courses:', error);
            throw error;
        }
    },

    // Get popular courses
    getPopularCourses: async (limit: number = 10): Promise<Course[]> => {
        try {
            const res = await api.get(`courses/popular`, { params: { limit } });
            return res.data;
        } catch (error) {
            console.error('Failed to fetch popular courses:', error);
            throw error;
        }
    },

    // Enroll in course
    enrollInCourse: async (studentId: string, courseId: string): Promise<Enrollment> => {
        try {
            const res = await api.post("enrollments", { studentId, courseId });
            return res.data;
        } catch (error) {
            console.error('Failed to enroll in course:', error);
            throw error;
        }
    },

    // Unenroll from course
    unenrollFromCourse: async (studentId: string, courseId: string): Promise<void> => {
        try {
            await api.delete(`enrollments/${studentId}/${courseId}`);
        } catch (error) {
            console.error('Failed to unenroll from course:', error);
            throw error;
        }
    },

    // Mark course as completed
    markAsComplete: async (studentId: string, courseId: string): Promise<Enrollment> => {
        try {
            const res = await api.patch(`enrollments/${studentId}/${courseId}/complete`);
            return res.data;
        } catch (error) {
            console.error('Failed to mark course as complete:', error);
            throw error;
        }
    },

    // Check if student is enrolled
    checkEnrollment: async (studentId: string, courseId: string): Promise<boolean> => {
        try {
            const res = await api.get(`enrollments/check/${studentId}/${courseId}`);
            return res.data.isEnrolled;
        } catch (error) {
            console.error('Failed to check enrollment:', error);
            throw error;
        }
    },
};