export interface Enrollment {
    id: string;
    studentId: string;
    courseId: string;
    enrolledAt: string;
    completed: boolean;
    lastAccessedAt: string;
}

export interface EnrollmentState {
    enrollments: Enrollment[];
    enrollInCourse: (studentId: string, courseId: string) => boolean;
    unenrollFromCourse: (studentId: string, courseId: string) => void;
    markAsComplete: (studentId: string, courseId: string) => void;
    getStudentEnrollment: (studentId: string) => Enrollment[];
    getCourseEnrollments: (courseId: string) => Enrollment[];
    isEnrolled: (studentId: string, courseId: string) => boolean;
}