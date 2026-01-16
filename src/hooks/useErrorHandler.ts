import { toast } from "sonner"

export function useErrorHandler() {
    const handleError = (error: unknown, customMessage?: string) => {
        console.error('Error:', error)

        // Extract error message from different error formats
        let message = customMessage

        if (!message) {
            if (error && typeof error === 'object' && 'data' in error && error.data && typeof error.data === 'object' && 'message' in error.data) {
                message = String(error.data.message)
            } else if (error && typeof error === 'object' && 'message' in error) {
                message = String(error.message)
            } else if (typeof error === 'string') {
                message = error
            } else if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
                message = String(error.response.data.message)
            } else {
                message = "An unexpected error occurred"
            }
        }

        toast.error(message)
    }

    const handleApiError = (error: unknown) => {
        const status = (error && typeof error === 'object' && 'status' in error ? error.status : null) ||
            (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'status' in error.response ? error.response.status : null)

        switch (status) {
            case 401:
                toast.error("Session expired. Please login again.")
                // Could redirect to login here
                break
            case 403:
                toast.error("You don't have permission to perform this action.")
                break
            case 404:
                toast.error("Resource not found.")
                break
            case 422:
                toast.error("Validation failed. Please check your input.")
                break
            case 500:
                toast.error("Server error. Please try again later.")
                break
            default:
                handleError(error)
        }
    }

    return {
        handleError,
        handleApiError
    }
}
