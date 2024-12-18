import React, { useState } from 'react'; 
import SubscriberReplyModal from '../../components/ui/Subscribers/SubscriberReplyModal';
import Title from '../../components/common/Title';
import { ConfigProvider, Input, Table } from 'antd';

const data = [
    {
        key: 1,
        name: "John Doe",
        email: "Hb0vM@example.com",
        country: "United States",
        status: "Active",

    } ,
    {
        key: 2,
        name: "John Doe",
        email: "Hb0vM@example.com",
        country: "United States",
        status: "Active",
    } , 
    {
        key: 3,
        name: "John Doe",
        email: "Hb0vM@example.com",
        country: "United States",
        status: "Active",
    } ,
     {
        key: 4,
        name: "John Doe",
        email: "Hb0vM@example.com",
        country: "United States",
        status: "Active",
    } , 
    {
        key: 5,
        name: "John Doe",
        email: "Hb0vM@example.com",
        country: "United States",
        status: "Active",
    }
]

const Reports = () => { 
        const [search, setSearch] = useState("") 
        const [page, setPage] = useState(1);
        const itemsPerPage = 10;  
        const [open , setOpen] = useState(false)

    
        const columns = [
            {
                title: "Serial No.",
                dataIndex: "name",
                key: "name",
                render: (_,record, index) =><p>{((page - 1) * itemsPerPage) + index + 1}</p>
            },
            {
                title: "User Name",
                dataIndex: "name",
                key: "name",
            },
            {
                title: "EMAIL",
                dataIndex: "email",
                key: "email",
            },       
            {
                title: "Country",
                dataIndex: "country",
                key: "country",
               
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
                <button className=' bg-primary text-white py-2 px-4 rounded-md ' onClick={() => setOpen(true)}> Reply</button>
               </div>
            },
       
        ]; 

    return (
        <div>
        <div className='flex items-center justify-between mb-4'>
             <Title >Reports</Title>
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
         <SubscriberReplyModal open={open} setOpen={setOpen} />
     </div>
    );
};

export default Reports;