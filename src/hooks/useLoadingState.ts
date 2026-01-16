import { useState } from "react"
import { toast } from "sonner"

export function useLoadingState(initialState = false) {
    const [isLoading, setIsLoading] = useState(initialState)

    const withLoading = async <T>(
        asyncFn: () => Promise<T>,
        options?: {
            loadingMessage?: string
            successMessage?: string
            errorMessage?: string
            showToast?: boolean
        }
    ): Promise<T> => {
        const {
            loadingMessage,
            successMessage,
            errorMessage,
            showToast = false
        } = options || {}

        setIsLoading(true)
        let toastId: string | number | undefined

        if (showToast && loadingMessage) {
            toastId = toast.loading(loadingMessage)
        }

        try {
            const result = await asyncFn()

            if (showToast && successMessage) {
                if (toastId) {
                    toast.success(successMessage, { id: toastId })
                } else {
                    toast.success(successMessage)
                }
            }

            return result
        } catch (error) {
            if (showToast && errorMessage) {
                if (toastId) {
                    toast.error(errorMessage, { id: toastId })
                } else {
                    toast.error(errorMessage)
                }
            }
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        setIsLoading,
        withLoading
    }
}

// Hook for managing multiple loading states
export function useMultipleLoadingStates<T extends Record<string, boolean>>(
    initialStates: T
) {
    const [loadingStates, setLoadingStates] = useState<T>(initialStates)

    const setLoading = (key: keyof T, loading: boolean) => {
        setLoadingStates(prev => ({
            ...prev,
            [key]: loading
        }))
    }

    const isAnyLoading = Object.values(loadingStates).some(Boolean)

    return {
        loadingStates,
        setLoading,
        isAnyLoading
    }
}
