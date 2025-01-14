import { api } from "../api/baseApi"

const subscriptionSlice = api.injectEndpoints({
    endpoints: (builder) => ({        
        getSubscription: builder.query({
            query: () => ({
                url: `/subscription/subscription` 
            })
        }),

    }) 
}) 

export const {useGetSubscriptionQuery } = subscriptionSlice