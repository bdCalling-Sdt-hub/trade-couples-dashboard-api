import { api } from "../api/baseApi";

const usersSlice = api.injectEndpoints({
    endpoints: (builder) => ({ 

        getAllUsers: builder.query({
            query: () => ({
                url: "/user/all-user",
                method: "GET",
            }),
        }), 


        blockUser:builder.mutation({
            query: (id) => ({
                url: `/user/${id}`,
                method: "DELETE",
            }),
        }),

    }),
}); 

export const {useGetAllUsersQuery,useBlockUserMutation} = usersSlice