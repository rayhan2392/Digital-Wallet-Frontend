
import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userInfo,
            }),
        }),
        
        getAllUsers: builder.query({
            query: (params) => ({
                url: "/user/all-users",
                method: "GET",
                params:params
            }),
            // transformResponse: (response) => response.data
        }),
    })
})


export const {
   useGetAllUsersQuery
} = adminApi