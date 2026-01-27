import { useAuthStore } from "@/store/authStore";
import type React from "react";
import { Navigate, useLocation } from "react-router";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: ('student' | 'instructor')[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { currentUser, isAuthenticated } = useAuthStore();
    const location = useLocation();

    if (!isAuthenticated || !currentUser) {
        return <Navigate to='/login' state = {{ from: location }} replace />;
    }

    if (!allowedRoles.includes(currentUser.role)) {
        return <Navigate to='/Unauthorized' replace />;
    }

    return <>{children}</>
};