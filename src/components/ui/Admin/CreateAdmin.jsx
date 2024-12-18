import { Form, Input, Modal } from 'antd';
import React from 'react';
import Swal from 'sweetalert2';
import { useCreateAdminMutation } from '../../../redux/apiSlices/adminSlice';

const CreateAdmin = ({ open, setOpen  , refetch }) => { 
  const [form] = Form.useForm();  
  const [createAdmin] = useCreateAdminMutation() 
  
  const onFinish = async(values) => {  
    const data ={
      gender:"Male" ,
      ...values
    }
    await createAdmin(data).then((res)=>{
      if(res?.data?.success){
        Swal.fire({
            text:res?.data?.message,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            refetch();   
            setOpen(false); 
            form.resetFields() 
          })
    }else{
        Swal.fire({
            title: "Oops",
            text: res?.error?.data?.message,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
      
    }

    })
   
  }; 

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      centered
      open={open}
      onCancel={handleClose}
      width={500}
      footer={null}
    >
      <div className="p-6 mt-4">
        <h1 className="font-semibold text-[#555555] text-xl mb-3">Add Admin</h1>
        
        <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the admin's name" }]}
            className="text-[#6D6D6D] py-1"
          >
            <Input className="w-full border outline-none px-3 py-[10px]" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter the admin's email" }]}
            className="text-[#6D6D6D] py-1"
          >
            <Input className="w-full border outline-none px-3 py-[10px]" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
            className="text-[#6D6D6D] py-1"
          >
            <Input.Password className="w-full border outline-none px-3 py-[10px]" />
          </Form.Item>

          <Form.Item className="text-center mt-6">
            <button
              type="submit"
              className="bg-primary text-white w-40 h-11 rounded-lg"
            >
              Create
            </button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateAdmin;
