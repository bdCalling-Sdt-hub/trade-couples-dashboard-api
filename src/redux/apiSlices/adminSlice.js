import { api } from "../api/baseApi";

const adminSlice = api.injectEndpoints({
    endpoints: (builder) => ({  

        getAdmin: builder.query({
            query: () => {
                return {
                    url: `/user/all-admin`
                }
            }
        }),

        createAdmin: builder.mutation({
            query: (value) => ({
                url: "/user/create-admin",
                method: "POST",
                body: value
            })
        }), 

        deleteAdmin: builder.mutation({
            query: (id) => ({
                url: `/user/${id}`,
                method: "DELETE"
            })
        }),
    }) 
}) 

export const {useCreateAdminMutation , useDeleteAdminMutation , useGetAdminQuery} = adminSlice