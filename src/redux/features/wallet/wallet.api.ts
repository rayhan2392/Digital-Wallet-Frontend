import { baseApi } from "@/redux/baseApi";

export const walletApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getMyWallet: builder.query({
            query: (transactionInfo) => ({
                url: "/wallet/me",
                method: "GET",
                data: transactionInfo,
            }),
            transformResponse: (response) => response.data,
            providesTags: ['Transactions'],
        }),
        
    })
})


export const {
   useGetMyWalletQuery
    
} = walletApi