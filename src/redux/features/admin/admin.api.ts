import { baseApi } from "@/redux/baseApi";
import type { IUser, IApiResponse } from "@/types";

export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<IApiResponse<IUser[]>, { role?: string }>({
            query: (params) => ({
                url: "/user/all-users",
                method: "GET",
                params: params
            }),
            providesTags: ['Users'],
        }),

        approveAgent: builder.mutation<IApiResponse<IUser>, { id: string }>({
            query: ({ id }) => ({
                url: `/user/approve/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ['Users'],
        }),

        suspendAgent: builder.mutation<IApiResponse<IUser>, { id: string }>({
            query: ({ id }) => ({
                url: `/user/suspend/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ['Users'],
        }),
    })
})


export const {
    useGetAllUsersQuery,
    useApproveAgentMutation,
    useSuspendAgentMutation
} = adminApi