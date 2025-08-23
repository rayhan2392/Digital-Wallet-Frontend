
import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userInfo,
            }),
        }),
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo,
            }),
        }),
        logOut: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
        }),
        userInfo: builder.query({
            query: (userInfo) => ({
                url: "/user/me",
                method: "GET",
                data: userInfo,
            }),
            transformResponse: (response) => response.data
        }),
    })
})


export const {
    useRegisterMutation,
    useLoginMutation,
    useUserInfoQuery,
    useLogOutMutation
} = authApi