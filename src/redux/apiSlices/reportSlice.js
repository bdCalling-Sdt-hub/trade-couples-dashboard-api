import { api } from "../api/baseApi"

const reportSlice = api.injectEndpoints({
    endpoints: (builder) => ({    

     getReportList: builder.query({
            query: (page) => { 
                const params= new URLSearchParams() 
                if(page) params.append("page" ,page)            
                return{
                    url:`/report?${params.toString()}`
                } 
            }
        }), 

        updateReportStatus: builder.mutation({
            query: (id) => ( {
                url:`/report/${id}` ,
                method:"PATCH" ,
            })
        })
    }) 
}) 

export const {useGetReportListQuery , useUpdateReportStatusMutation } = reportSlice