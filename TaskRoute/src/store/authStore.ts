import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { toast } from "sonner";
import type { AuthState, Instructor, SignupData, Student, User } from '../types/userTypes';

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            currentUser: null,
            allUsers: [],
            isAuthenticated: false,

            signup: (data: SignupData) => {
                const { allUsers } = get();

                const userExists = allUsers.find(u => u.email === data.email);

                if (userExists) {
                    toast.error("User with this email already exists");
                    return false;
                }

                let newUser: User;

                if (data.role === 'instructor') {
                    newUser = {
                        ...data, role: 'instructor',
                        instructorId: `inst_${Date.now()}`,
                        expertise: data.expertise || [],
                        dashboard: {
                            totalCourses: 0,
                            totalEarnings: 0,
                            totalStudents: 0,
                            ratings: 0
                        },
                        coursesCreated: []
                    } as Instructor;
                    toast.success("Signed up successfully as an Instructor");
                } else {
                    newUser = {
                        ...data,
                        studentId: `std_${Date.now()}`,
                        enrolledCourses: []
                    } as Student;
                    toast.success("Signed up successfully as a student");
                }

                set ({
                    allUsers: [...allUsers, newUser],
                    currentUser: newUser,
                    isAuthenticated: true
                });
                return true;
            },

            login: (email: string, password: string) => {
                const { allUsers } = get();

                const user = allUsers.find(u => u.email === email && u.password === password);

                if (user) {
                    set({ 
                        currentUser: user,
                        isAuthenticated: true
                    });
                    toast.success("Logged in successfully");
                }
                return false;
            },

            logout: () => {
                set({
                    currentUser: null,
                    isAuthenticated: false
                });
                toast.info("You have been logged out");
            }
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);