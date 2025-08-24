import type { ApiError } from "@/types"

export const getErrorMessage = (error: any): string => {
    // Handle RTK Query errors
    if (error?.data?.message) {
        return error.data.message
    }

    // Handle Axios errors
    if (error?.response?.data?.message) {
        return error.response.data.message
    }

    // Handle standard Error objects
    if (error?.message) {
        return error.message
    }

    // Handle string errors
    if (typeof error === 'string') {
        return error
    }

    // Default fallback
    return "An unexpected error occurred"
}

export const getStatusCodeMessage = (statusCode: number): string => {
    switch (statusCode) {
        case 400:
            return "Bad request. Please check your input."
        case 401:
            return "Session expired. Please login again."
        case 403:
            return "You don't have permission to perform this action."
        case 404:
            return "Resource not found."
        case 422:
            return "Validation failed. Please check your input."
        case 429:
            return "Too many requests. Please try again later."
        case 500:
            return "Server error. Please try again later."
        case 502:
            return "Bad gateway. Please try again later."
        case 503:
            return "Service unavailable. Please try again later."
        default:
            return "Something went wrong. Please try again."
    }
}

export const isNetworkError = (error: any): boolean => {
    return (
        error?.code === 'NETWORK_ERROR' ||
        error?.code === 'ERR_NETWORK' ||
        error?.message?.includes('Network Error') ||
        !navigator.onLine
    )
}

export const createApiError = (
    message: string,
    status?: number,
    data?: any
): ApiError => ({
    message,
    status,
    data
})
