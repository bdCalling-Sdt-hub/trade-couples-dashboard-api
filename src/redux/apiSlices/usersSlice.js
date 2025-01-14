import { api } from "../api/baseApi";

const usersSlice = api.injectEndpoints({
    endpoints: (builder) => ({ 

        getAllUsers: builder.query({
            query: ({search , page}) => { 
                const params= new URLSearchParams() 
                if(page)params.append("page" ,page)
                if(search)params.append("search" ,search)
                return{
                    url:`/user/all-user?${params.toString()}` 
                } 
         
            },
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