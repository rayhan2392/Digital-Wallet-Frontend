
import { baseApi } from "@/redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      
        getMyTransactions: builder.query({
            query: (transactionInfo) => ({
                url: "/transaction/me",
                method: "GET",
                data: transactionInfo,
            }),
            transformResponse: (response) => response.data
        }),
        getAllTransactions: builder.query({
            query: (params) => ({
                url: "/transaction",
                method: "GET",
                params:params
            }),
            transformResponse: (response) => response.data
        }),
    })
})


export const {
    useGetMyTransactionsQuery,
    useGetAllTransactionsQuery
} = transactionApi