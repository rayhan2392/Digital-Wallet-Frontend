import { toast } from "sonner"

export function useErrorHandler() {
    const handleError = (error: any, customMessage?: string) => {
        console.error('Error:', error)

        // Extract error message from different error formats
        let message = customMessage

        if (!message) {
            if (error?.data?.message) {
                message = error.data.message
            } else if (error?.message) {
                message = error.message
            } else if (typeof error === 'string') {
                message = error
            } else if (error?.response?.data?.message) {
                message = error.response.data.message
            } else {
                message = "An unexpected error occurred"
            }
        }

        toast.error(message)
    }

    const handleApiError = (error: any) => {
        const status = error?.status || error?.response?.status

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
