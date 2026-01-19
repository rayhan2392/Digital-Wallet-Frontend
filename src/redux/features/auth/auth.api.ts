
import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userInfo,
            }),
            invalidatesTags: ['Users'], // Invalidate user info cache after registration
        }),
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo,
            }),
            invalidatesTags: ['Users'], // Invalidate user info cache after login
        }),
        logOut: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ['Users'], // Invalidate user info cache after logout
        }),
        userInfo: builder.query({
            query: (userInfo) => ({
                url: "/user/me",
                method: "GET",
                data: userInfo,
            }),
            transformResponse: (response) => response.data,
            providesTags: ['Users'] // Provide UserInfo tag for cache invalidation
        }),
        agentInfo: builder.query({
            query: (agentInfo) => ({
                url: "/user/agents",
                method: "GET",
                data: agentInfo,
            }),
            transformResponse: (response) => response.data
        }),
    })
})


export const {
    useRegisterMutation,
    useLoginMutation,
    useUserInfoQuery,
    useLogOutMutation,
    useAgentInfoQuery
} = authApi