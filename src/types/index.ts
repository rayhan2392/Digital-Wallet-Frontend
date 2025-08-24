import type { ComponentType } from "react";

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "super_admin" | "admin" | "agent" | "user";

// Loading and Error Types
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
  data?: any;
}

export interface ApiError {
  status?: number;
  message: string;
  data?: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

// User/Agent types
export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: TRole;
  isApproved: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}