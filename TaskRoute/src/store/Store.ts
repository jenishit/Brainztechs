import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { toast } from "sonner";
import type { Course, CourseState } from '../types/courseTypes';
import { useAuthStore } from './authStore';
import type { Enrollment, EnrollmentState } from '../types/enrollmentTypes';

export const useCourseStore = create<CourseState>()(
    persist(
        (set, get) => ({
            courses: [], 

            addCourse: (courseData) => {
                const newCourse : Course = {
                    ...courseData,
                    id: `course_${Date.now()}`,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    enrolledStudents: 0,
                    rating: 0,
                    reviews: 0,
                };

                set({ courses: [...get().courses, newCourse] });
            },

            updateCourse: (id, updates) => {
                set({
                    courses: get().courses.map(course => 
                        course.id === id ? {...course, ...updates, updatedAt: new Date().toISOString()}
                        : course
                    )
                });
            },

            deleteCourse: (id) => {
                set({
                    courses: get().courses.filter(
                        course => course.id !== id 
                    )
                });
            },

            getCourseById: (id) => {
                return get().courses.find(course => course.id === id);
            },

            getCoursesByName: (title) => {
                return get().courses.filter(course => course.title === title)
            },

            getCoursesByInstructor: (name) => {
                const user = useAuthStore.getState().allUsers.find(u => u.name === name);
                if (user?.role === 'instructor'){
                    const InsId = user.instructorId;
                    return get().courses.filter(course => course.instructorId === InsId);
                }
                toast.error("Couldn't find insturctor of such name");
                return [];
            },

            getCoursesByCategory: (category) => {
                return get().courses.filter(course => course.category === category)
            },

            getPopularCourse: (title) => {
                return get().courses.filter(course => course.title === title).sort((a,b) => a.rating - b.rating);
            },

            searchCourse: (query) => {
                const lowerQuery = query.toLowerCase();
                return get().courses.filter( course => 
                    course.title.toLowerCase().includes(lowerQuery) ||
                    course.description.toLowerCase().includes(lowerQuery)
                );
            },
        }),
        {
            name: 'course-details',
            storage: createJSONStorage(() => localStorage),
        }
    )
)

export const useEnrollmentStore = create<EnrollmentState>()(
    persist(
        (set, get) => ({
            enrollments: [],

            enrollInCourse: (studentId, courseId) => {
                const { enrollments } = get();

                const alreadyEnrolled = enrollments.find(e => e.studentId === studentId && e.courseId === courseId);

                if (alreadyEnrolled){
                    return false;
                }

                const newEnrollment: Enrollment = {
                    id: `enroll_${Date.now()}`,
                    studentId,
                    courseId,
                    enrolledAt: new Date().toISOString(),
                    completed: false,
                    lastAccessedAt: new Date().toISOString(),
                };

                set({ enrollments: [...enrollments, newEnrollment] });

                const course = useCourseStore.getState().getCourseById(newEnrollment.id);

                if (course) {
                    useCourseStore.getState().updateCourse(courseId, {
                        enrolledStudents: course.enrolledStudents + 1
                    });
                }

                return true;
            },

            unenrollFromCourse: (studentId, courseId) => {
                set({
                    enrollments: get().enrollments.filter(
                        e => !(e.studentId === studentId && e.courseId === courseId)
                    )
                });

                const course = useCourseStore.getState().getCourseById(courseId);
                if (course && course.enrolledStudents > 0){
                    useCourseStore.getState().updateCourse(courseId, {enrolledStudents: course.enrolledStudents - 1});
                }
            },

            markAsComplete: (studentId, courseId) => {
                set({
                    enrollments: get().enrollments.map((e) => e.courseId === courseId && e.studentId === studentId? {...e, completed: true} 
                    : e ),
                });
            },

            getStudentEnrollment: (studentId) => {
                return get().enrollments.filter(e => e.studentId === studentId);
            },

            getCourseEnrollments: (courseId) => {
                return get().enrollments.filter(e => e.courseId === courseId);
            },

            isEnrolled: (studentId, courseId) => {
                return get().enrollments.some( e => e.studentId === studentId && e.courseId === courseId);
            },
        }),
        {
            name: 'enrollment-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);