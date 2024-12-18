import { api } from "../api/baseApi"

const faqSlice = api.injectEndpoints({
    endpoints: (builder) => ({   
        getFaq:builder.query({
            query:(page)=>{ 
              const params= new URLSearchParams() 
              if(page)params.append("page" ,page)
              return{
                url:`/faq?${params.toString()}`} 
            }
          }) , 

        addFaq:builder.mutation({
        query:(value)=>({
          url:"/faq/create-faq" ,
          method:"POST" ,
          body:value
        })
        }) , 

        updateFaq:builder.mutation({
          query:(data)=>{  
            //console.log("faq data",data);
            return{
              url:`/faq/${data?.id}` ,
              method:"PATCH" ,
              body:data
            }
          }
        }) , 

        deleteFaq:builder.mutation({
          query:(id)=>({
            url:`/faq/${id}` ,
            method:"DELETE"
          })
        }) , 
    }) 
})

export const {useAddFaqMutation , useGetFaqQuery , useUpdateFaqMutation , useDeleteFaqMutation  } = faqSlice