import { api } from "../api/baseApi"

const subscriberSlice = api.injectEndpoints({
    endpoints: (builder) => ({    
        getAllSubscribers: builder.query({
            query: () => ({
                url: "/subscriber"
            })
        }),  

        postReply: builder.mutation({
            query: (value) => ({
                url: `/subscriber/replied/${value?.id}`,
                method: "POST",
                body: value
            })
        }),
    }) 
}) 

export const {useGetAllSubscribersQuery , usePostReplyMutation} = subscriberSlice