import { api } from "../api/baseApi"

const blogsSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllBlogs: builder.query({
            query: (page) => ({
                url: "/blogs",
            })
        }),

        addBlog: builder.mutation({
            query: (value) => ({
                url: "/blogs/create-blog",
                method: "POST",
                body: value
            })
        }),

        updateBlog: builder.mutation({
            query: ({id , data}) => ({
                url: `/blogs/${id}`,
                method: "PATCH",
                body: data
            })
        }),

        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: "DELETE"
            })
        }),

    })
})

export const { useAddBlogMutation, useDeleteBlogMutation, useGetAllBlogsQuery, useUpdateBlogMutation } = blogsSlice 