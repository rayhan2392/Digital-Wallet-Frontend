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
  data?: unknown;
}

export interface ApiError {
  status?: number;
  message: string;
  data?: unknown;
}

export interface ApiResponse<T = unknown> {
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
  isBlocked?: boolean;
  status?: "approved" | "pending" | "suspended";
  createdAt?: string;
  updatedAt?: string;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Transaction types (safe addition - won't affect existing code)
export type TTransactionType = "cash_in" | "cash_out" | "send_money" | "payment" | "recharge";
export type TTransactionStatus = "pending" | "completed" | "failed" | "cancelled";

export interface ITransaction {
  _id: string;
  sender: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  receiver: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  amount: number;
  type: TTransactionType;
  status: TTransactionStatus;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ITransactionResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
  };
  data: ITransaction[];
}