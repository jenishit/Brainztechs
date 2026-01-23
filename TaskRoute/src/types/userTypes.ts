interface BaseUser {
    name: string;
    email: string;
    password: string;
}

export interface Student extends BaseUser {
    role: 'student';
    studentId: string;
    enrolledCourses: string[];
}

export interface Instructor extends BaseUser {
    role: 'instructor';
    instructorId: string;
    expertise: string[];
    dashboard: {
        totalCourses: number;
        totalStudents: number;
        totalEarnings: number;
        ratings: number;
    };
    coursesCreated: string[];
}

export type User = Student | Instructor;

export interface SignupData {
    name: string;
    email:string;
    password:string;
    role: 'student' | 'instructor';
    expertise?: string[];
}

export interface LoginData {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface AuthState {
    currentUser: User | null;
    allUsers: User[];
    signup: (data: SignupData) => boolean;
    login: (email: string, password: string) => boolean;
    logout: () => void;
    isAuthenticated: boolean;
}