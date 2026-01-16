import type { ApiError } from "@/types"

export const getErrorMessage = (error: unknown): string => {
    // Handle RTK Query errors
    if (error && typeof error === 'object' && 'data' in error && error.data && typeof error.data === 'object' && 'message' in error.data) {
        return String(error.data.message)
    }

    // Handle Axios errors
    if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
        return String(error.response.data.message)
    }

    // Handle standard Error objects
    if (error && typeof error === 'object' && 'message' in error) {
        return String(error.message)
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

export const isNetworkError = (error: unknown): boolean => {
    if (error && typeof error === 'object') {
        if ('code' in error && (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK')) {
            return true;
        }
        if ('message' in error && typeof error.message === 'string' && error.message.includes('Network Error')) {
            return true;
        }
    }
    return !navigator.onLine;
}

export const createApiError = (
    message: string,
    status?: number,
    data?: unknown
): ApiError => ({
    message,
    status,
    data
})
