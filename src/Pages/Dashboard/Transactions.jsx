import React, { useState } from 'react';
import Title from '../../components/common/Title';
import { ConfigProvider, Input, Table } from 'antd'; 
import { IoEyeOutline } from "react-icons/io5";
import { useGetSubscriptionQuery } from '../../redux/apiSlices/subscriptionSlice';
 
const data =[
    {
        key:1 , 
        transactions_no: "123456789", 
        date:"12-12-2022", 
        amount:"$1000", 
        status:"Pending", 
    } , 
    {
        key:2 , 
        transactions_no: "123456789", 
        date:"12-12-2022", 
        amount:"$1000", 
        status:"Pending", 
    } , 
    {
        key:3 , 
        transactions_no: "123456789", 
        date:"12-12-2022", 
        amount:"$1000", 
        status:"Pending", 
    } , 
    {
        key:4 , 
        transactions_no: "123456789", 
        date:"12-12-2022", 
        amount:"$1000", 
        status:"Pending", 
    } , 
    {
        key:5 , 
        transactions_no: "123456789", 
        date:"12-12-2022", 
        amount:"$1000", 
        status:"Pending", 
    } , 

]
const Transactions = () => { 
    const [search, setSearch] = useState("") 
        const [page, setPage] = useState(1);
        const itemsPerPage = 10;  
        const [open , setOpen] = useState(false) 
        const {data:subscriptions} = useGetSubscriptionQuery(); 

    
        const columns = [
            {
                title: "Serial No.",
                dataIndex: "key",
                key: "key",
                render: (_,record, index) =><p>{((page - 1) * itemsPerPage) + index + 1}</p>
            },
            {
                title: "Transactions No.",
                dataIndex: "transactions_no",
                key: "transactions_no",
            },
            {
                title: "Amount",
                dataIndex: "amount",
                key: "amount",
            },       
            {
                title: "Transactions Date",
                dataIndex: "date",
                key: "date",
               
            },
            {
                title: "Status",
                dataIndex: "status",
                key: "status",
               
            },
            {
                title: "Action",
                dataIndex: "action",
                key: "Action",
               render:(_, record)=> <div> 
                <button className=' ' onClick={() => setOpen(true)}> <IoEyeOutline size={22}/> </button>
               </div>
            },
       
        ];  
    return (
        <div>
        <div className='flex items-center justify-between mb-4'>
             <Title >Subscription</Title>
             <Input
                 style={{
                     width: 300, 
                     height: 40,
                     outline: "none",
                     border: "1px solid #d9d9d9",
                     boxShadow: "none"
                 }}
                 placeholder="Search.."
                 onChange={(e)=>setSearch(e.target.value)}
             />
         </div>

         <ConfigProvider
             theme={{
                 components: {
                     Pagination: {
                         itemActiveBg: "#007BA5",
                         borderRadius: "100%"
                     }
                 },
                 token:{
                     colorPrimary: "white"
                 }
             }}
         >
             <Table
                 columns={columns} 
                 dataSource={data} 
                 pagination={{
                     current: parseInt(page),
                     onChange: (page)=> setPage(page)
                 }}
             />
         </ConfigProvider> 
       
     </div>
    );
};

export default Transactions;