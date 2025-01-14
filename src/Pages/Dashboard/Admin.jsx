import { Table } from 'antd'
import React, { useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import CreateAdmin from '../../components/ui/Admin/CreateAdmin';
import Title from '../../components/common/Title';
import { useDeleteAdminMutation, useGetAdminQuery } from '../../redux/apiSlices/adminSlice';
import Swal from 'sweetalert2';

const Admin = () => { 
 const [open , setOpen] = useState(false) 
 const {data:getAdmins  , refetch} = useGetAdminQuery()  
 const [deleteAdmin] = useDeleteAdminMutation()


 const data = getAdmins?.data?.map((value, index) => ({
    key: index + 1,
    id: value?._id,
    email: value?.email,
    name: value?.name,
    status: value?.status,
  }));  


  const handleDelete = async(id) => { 
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteAdmin(id).then((res) => { 
  if(res?.data?.success){
  Swal.fire({
    text: res?.data?.message,
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  }).then(() => {
    refetch();
  });
  }else {
  Swal.fire({
    title: "Oops",
    text: res?.error?.data?.message,
    icon: "error",
    timer: 1500,
    showConfirmButton: false,
  });
  }
  
        })
      }
    });
  };
  


    const columns= [
        {
            title: "Serial No.",
            dataIndex: "index",
            key: "index",
            render: (_,record, index) =><p>{index + 1}</p>
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_,record) =>  
                <div onClick={()=>handleDelete(record?.id)}> 

                    <RiDeleteBin5Line size={24} className="text-red-600"/>
                </div>
        },
    ]
    return (
        <div>
            {/* header */}
            <div className='flex items-center justify-between mb-4'>
                <Title className=''>Admins</Title>
                <button className='bg-primary text-white h-10 px-4 rounded-md' onClick={()=>{setOpen(true)}}>+ Add Admin</button>
            </div>

            {/* table container */}
            <Table columns={columns} dataSource={data} pagination={false}/> 
            <CreateAdmin open={open} setOpen={setOpen} refetch={refetch} />
        </div>
    )
}

export default Admin