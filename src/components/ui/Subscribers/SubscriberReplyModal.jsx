import { Form, Input, Modal } from 'antd';
import React from 'react';
import { usePostReplyMutation } from '../../../redux/apiSlices/subscriberSlice';
import Swal from 'sweetalert2';

const SubscriberReplyModal = ({open , setOpen , userId , refetch }) => {  
    const [form] = Form.useForm(); 
    const [postReply] = usePostReplyMutation() 
    const handleClose = () => {
        setOpen(false);
        form.resetFields();
      }; 

      const onFinish = async(values) => { 
        const data ={
            id: userId , 
            ...values
        }
       
        await postReply(data).then((res) => { 
            console.log(res);
          if (res?.data?.success) {
            Swal.fire({
              text: res?.data?.message,
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              refetch();
              handleClose();
              form.resetFields();
            });
          } else {
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

    return (
        <Modal
        centered
        open={open}
        onCancel={handleClose}
        width={500}
        footer={null}
      >
        <div className="p-6 mt-4">
          
          <Form form={form} layout='vertical' onFinish={onFinish}>
            <Form.Item
              label={<p className='text-[#6D6D6D] text-xl font-medium mb-1'> Reply? </p>}
              name="description"
              rules={[{ required: true, message: "Please enter your reply" }]}
              className="text-[#6D6D6D] py-1"
            >
              <Input.TextArea rows={5} style={{resize:"none"}} className="w-full border outline-none px-3 py-[10px]" />
            </Form.Item>
  
            <Form.Item className="text-end mt-6">
              <button
                type="submit"
                className="bg-primary text-white w-40 h-11 rounded-lg"
              >
                Send
              </button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    );
};

export default SubscriberReplyModal;