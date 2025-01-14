import { Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaRegImage } from 'react-icons/fa';
import { useAddBlogMutation, useUpdateBlogMutation } from '../../../redux/apiSlices/blogsSlice';
import Swal from 'sweetalert2';

const CreateBlog = ({ itemForEdit , setItemForEdit , openAddModel ,setOpenAddModel , refetch }) => {
  const [form] = Form.useForm();
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);  
  const [addBlog] = useAddBlogMutation() 
  const [updateBlog] = useUpdateBlogMutation()

  useEffect(()=>{ 
    if(itemForEdit){
 form.setFieldsValue({title:itemForEdit?.name , description:itemForEdit?.description}) 
 setImgUrl(itemForEdit?.image)
    }
  },[itemForEdit])   


  const onFinish = async (values) => {
  
    const formData = new FormData();
    if (imgFile) {
      formData.append("image", imgFile);
    } 

    const data = { 
      title: values?.title, 
      description: values?.description, 
    } 

    formData.append("data", JSON.stringify(data));

    if (itemForEdit?.id) {
      await updateBlog({ id: itemForEdit?.id, value: formData }).then(
        (res) => {
          if (res?.data?.success) {
            Swal.fire({
              title: "Slider Updated!",
              text: "Your Slider has been update.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              refetch();  
              setOpenAddModel(false);  
              setImgUrl(null)
              form.resetFields() 
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
        }
      );
    } else {
      await addBlog(formData).then((res) => {
       
        if (res?.data?.success) {
          Swal.fire({
            title: "Slider Added!",
            text: "Your Slider has been added.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            refetch(); 
            setOpenAddModel(false); 
            setImgUrl(null) 
            form.resetFields() 
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
      });
    }
  }; 


  const handleCancel = () => {
    setImgFile(null);
    setImgUrl(null); 
    setItemForEdit(null)
    form.resetFields();
    setOpenAddModel(false);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
      setImgUrl(URL.createObjectURL(file));
    }
  };



  return (
    <Modal
      centered
      open={openAddModel}
      onCancel={handleCancel}
      width={500}
      footer={null}
    >
      <div className="p-6">
        <h1 className="font-semibold text-[#555555] text-xl mb-2 mt-2">
          {itemForEdit ? "Update Blog" : "Add Blog"}
        </h1>
        <Form onFinish={onFinish} layout="vertical" form={form}>
          <Form.Item
            name="title"
            label={<p className="text-[#6D6D6D]">Title</p>}
            rules={[{ required: true, message: "Please input Title" }]}
          >
            <Input className="w-full border px-3 py-2" />
          </Form.Item>

          <Form.Item name="images" label={<p className="text-[#6D6D6D]">Image</p>}>
            <label htmlFor="image" className="p-3 border block mt-2 mb-2">
              <div className="flex justify-center items-center w-full h-[150px] ">
                {imgUrl ? (
                  <img src={imgUrl} alt="Selected" className="h-[150px] w-full object-contain p-2" />
                ) : (
                  <FaRegImage className="text-5xl" />
                )}
              </div> 
              <div className='hidden'>
              <Input
                id="image"
                type="file"
                onChange={handleChange}
                className="hidden"
              />
              </div>
            </label>
          </Form.Item>

          <Form.Item name="description" label={<p className="text-[#6D6D6D]">Description</p>}>
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item className="text-center mt-8">
            <button type="primary" htmlType="submit" className="bg-primary text-white w-[120px] h-[42px] rounded-lg">
              Submit
            </button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateBlog;
