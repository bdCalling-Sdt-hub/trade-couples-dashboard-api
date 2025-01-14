import { api } from "../api/baseApi"

const subscriberSlice = api.injectEndpoints({
    endpoints: (builder) => ({    
        getAllSubscribers: builder.query({
            query: ({search , page}) => { 
                const params= new URLSearchParams() 
                if(page)params.append("page" ,page)
                if(search)params.append("search" ,search) 
                return{
                    url:`/subscriber?${params.toString()}`
                }               
            }
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