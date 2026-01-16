import { baseApi } from "@/redux/baseApi";
import type { ITransaction, ITransactionResponse } from "@/types";

export const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getMyTransactions: builder.query<ITransaction[], { type?: string; status?: string }>({
            query: (transactionInfo) => ({
                url: "/transaction/me",
                method: "GET",
                data: transactionInfo,
            }),
            transformResponse: (response: ITransactionResponse) => response.data,
            providesTags: ['Transactions'],
        }),
        getAllTransactions: builder.query<ITransaction[], { type?: string; status?: string; search?: string }>({
            query: (params) => ({
                url: "/transaction",
                method: "GET",
                params: params
            }),
            transformResponse: (response: ITransactionResponse) => response.data,
            providesTags: ['Transactions'],
        }),
    })
})


export const {
    useGetMyTransactionsQuery,
    useGetAllTransactionsQuery
} = transactionApi