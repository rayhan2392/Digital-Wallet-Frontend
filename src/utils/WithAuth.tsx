import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";
import { LoadingState } from "@/components/common/LoadingStates";
import NotApproved from "@/pages/NotApproved";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading, error } = useUserInfoQuery(undefined);

    if (isLoading) {
      return <LoadingState type="page" message="Checking authentication..." />;
    }

    if (error || (!isLoading && !data?.email)) {
      return <Navigate to="/login" />;
    }

    if (requiredRole && !isLoading && requiredRole !== data?.role) {
      return <Navigate to="/unauthorized" />;
    }

    // Check if user is approved for dashboard access
    if (!data?.isApproved) {
      return <NotApproved />;
    }

    return <Component />;
  };
};