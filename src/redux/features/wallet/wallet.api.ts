import { baseApi } from "@/redux/baseApi";

export const walletApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getMyWallet: builder.query({
            query: (walletInfo) => ({
                url: "/wallet/me",
                method: "GET",
                data: walletInfo,
            }),
            transformResponse: (response) => response.data,
            providesTags: ['Wallet'],
        }),
        sendMoney: builder.mutation({
            query: (sendMOneyData) => ({
                url: "/wallet/send",
                method: "POST",
                data: sendMOneyData,
            }),
            invalidatesTags: ['Wallet'],
        }),
        withdraw: builder.mutation({
            query: (withdrawMoneyData) => ({
                url: "/wallet/cash-out",
                method: "POST",
                data: withdrawMoneyData,
            }),
            invalidatesTags: ['Wallet'],
        }),
        addMoney: builder.mutation({
            query: (addMoneyData) => ({
                url: "/wallet/cash-in",
                method: "POST",
                data: addMoneyData,
            }),
            invalidatesTags: ['Wallet'],
        }),
        
    })
})


export const {
   useGetMyWalletQuery,
   useSendMoneyMutation,
   useWithdrawMutation,
   useAddMoneyMutation
    
} = walletApi