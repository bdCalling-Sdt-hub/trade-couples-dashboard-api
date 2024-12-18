import { api } from "../api/baseApi";


const settingSlices = api.injectEndpoints({
    endpoints: (builder) => ({


        // *** privacy *** 
        updatePricyPolicy: builder.mutation({
            query: (value) => {
                return {
                    url: `/resources/policy`,
                    method: "PATCH",
                    body: value,

                }
            }
        }),

        privacyPolicy: builder.query({
            query: () => {
                return {
                    url: "/resources/policy",
                    method: "GET",
                }
            },

        }),

        createPrivacy: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/resources/policy",
                    body: data,
                }
            }
        }),

        // *** about *** 
        updateAbout: builder.mutation({
            query: (value) => {
                return {
                    url: `/resources/about`,
                    method: "PATCH",
                    body: value,

                }
            }
        }),

        about: builder.query({
            query: () => {
                return {
                    url: "/resources/about",
                    method: "GET",
                }
            },

        }),

        createAbout: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/resources/about",
                    body: data,
                }
            }
        }),


        // *** terms *** 
        updateTerms: builder.mutation({
            query: (value) => {
                return {
                    url: `/resources/terms`,
                    method: "PATCH",
                    body: value,

                }
            }
        }),

        terms: builder.query({
            query: () => {
                return {
                    url: "/resources/terms",
                    method: "GET",
                }
            },

        }),

        createTerms: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/resources/terms",
                    body: data,
                }
            }
        }),

        // *** press *** 
        updatePress: builder.mutation({
            query: (value) => {
                return {
                    url: `/resources/press`,
                    method: "PATCH",
                    body: value,

                }
            }
        }),

        press: builder.query({
            query: () => {
                return {
                    url: "/resources/press",
                    method: "GET",
                }
            },

        }),

        createPress: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/resources/press",
                    body: data,
                }
            }
        }),

        // *** affiliate *** 
        updateAffiliate: builder.mutation({
            query: (value) => {
                return {
                    url: `/resources/affiliate`,
                    method: "PATCH",
                    body: value,

                }
            }
        }),

        affiliate: builder.query({
            query: () => {
                return {
                    url: "/resources/affiliate",
                    method: "GET",
                }
            },

        }),

        createAffiliate: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/resources/affiliate",
                    body: data,
                }
            }
        }),

        // *** support *** 
        updateSupport: builder.mutation({
            query: (value) => {
                return {
                    url: `/resources/support`,
                    method: "PATCH",
                    body: value,

                }
            }
        }),

        support: builder.query({
            query: () => {
                return {
                    url: "/resources/support",
                    method: "GET",
                }
            },

        }),

        createSupport: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/resources/support",
                    body: data,
                }
            }
        }),

        // *** safety *** 
        updateSafety: builder.mutation({
            query: (value) => {
                return {
                    url: `/resources/safety`,
                    method: "PATCH",
                    body: value,

                }
            }
        }),

        safety: builder.query({
            query: () => {
                return {
                    url: "/resources/safety",
                    method: "GET",
                }
            },

        }),

        createSafety: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/resources/safety",
                    body: data,
                }
            }
        }),

        // *** cookie *** 
        updateCookie: builder.mutation({
            query: (value) => {
                return {
                    url: `/resources/cookie`,
                    method: "PATCH",
                    body: value,

                }
            }
        }),

        cookie: builder.query({
            query: () => {
                return {
                    url: "/resources/cookie",
                    method: "GET",
                }
            },

        }),

        createCookie: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/resources/cookie",
                    body: data,
                }
            }
        }),



    })
})

export const {
    useUpdatePricyPolicyMutation,
    usePrivacyPolicyQuery,
    useCreatePrivacyMutation,
    useAboutQuery,
    useUpdateAboutMutation,
    useCreateAboutMutation,
    useTermsQuery,
    useUpdateTermsMutation,
    useCreateTermsMutation , 
    usePressQuery , 
    useUpdatePressMutation , 
    useCreatePressMutation ,
    useAffiliateQuery , 
    useUpdateAffiliateMutation , 
    useCreateAffiliateMutation , 
    useSupportQuery , 
    useUpdateSupportMutation , 
    useCreateSupportMutation , 
    useSafetyQuery , 
    useUpdateSafetyMutation , 
    useCreateSafetyMutation , 
    useCookieQuery , 
    useUpdateCookieMutation , 
    useCreateCookieMutation 
} = settingSlices; 