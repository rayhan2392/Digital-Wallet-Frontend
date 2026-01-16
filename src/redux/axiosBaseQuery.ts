import { axiosInstance } from "@/lib/axios"
import type { BaseQueryFn } from "@reduxjs/toolkit/query"
import type { AxiosError, AxiosRequestConfig } from "axios"
import { toast } from "sonner"

const axiosBaseQuery =
    (): BaseQueryFn<
        {
            url: string
            method?: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
            headers?: AxiosRequestConfig['headers']
            showErrorToast?: boolean
        },
        unknown,
        unknown
    > =>
        async ({ url, method, data, params, headers, showErrorToast = false }) => {
            try {
                const result = await axiosInstance({
                    url: url,
                    method,
                    data,
                    params,
                    headers,
                })
                return { data: result.data }
            } catch (axiosError) {
                const err = axiosError as AxiosError

                // Global error handling
                const errorMessage = getErrorMessage(err)

                if (showErrorToast) {
                    toast.error(errorMessage)
                }

                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                        message: errorMessage,
                    },
                }
            }
        }

const getErrorMessage = (error: AxiosError): string => {
    if (error.response?.status === 401) {
        return "Session expired. Please login again."
    }
    if (error.response?.status === 403) {
        return "You don't have permission to perform this action."
    }
    if (error.response?.status === 404) {
        return "Resource not found."
    }
    if (error.response?.status === 422) {
        return "Validation failed. Please check your input."
    }
    if (error.response?.status && error.response.status >= 500) {
        return "Server error. Please try again later."
    }
    if (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK') {
        return "Network error. Please check your connection."
    }

    // Try to get message from response
    const responseData = error.response?.data as Record<string, unknown>
    if (responseData?.message && typeof responseData.message === 'string') {
        return responseData.message
    }

    return "Something went wrong. Please try again."
}

export default axiosBaseQuery