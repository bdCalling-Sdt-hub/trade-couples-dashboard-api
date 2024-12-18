import React, { useEffect, useState } from 'react';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { Form, Input } from "antd"; 
import { useProfileQuery, useUpdateProfileMutation } from '../../../redux/apiSlices/authSlice';
import { imageUrl } from '../../../redux/api/baseApi';
import Swal from 'sweetalert2';

const UserProfile = () => {  
    const [form] = Form.useForm();
    const [image, setImage] = useState(
        "https://avatars.design/wp-content/uploads/2021/02/corporate-avatars-TN-1.jpg"
    );
    const [imgURL, setImgURL] = useState(image);  
    const {data:userProfile , refetch} = useProfileQuery()  
    const [updateProfile , {isLoading , isSuccess , isError , error , data}] = useUpdateProfileMutation()
    console.log(userProfile?.data); 

    useEffect(() => {
        if (userProfile?.data) {
            form.setFieldsValue({
                name: userProfile?.data?.name,
                email: userProfile?.data?.email,
                contact: userProfile?.data?.contact,
              
            }); 
            setImgURL(userProfile?.data?.image?.startsWith("https") ? userProfile?.data?.image : `${imageUrl}${userProfile?.data?.image}`) 
        }
    }, [userProfile, form]); 

    useEffect(() => {
        if (isSuccess) { 
            Swal.fire({
              text: data?.message ,
              icon: "success",
              timer: 1500,
              showConfirmButton: false
            }).then(() => { 
              refetch(); 
            });
        }
        if (isError) {
          Swal.fire({ 
            //@ts-ignore
            text: error?.data?.message,  
            icon: "error",
          });
        }
      }, [isSuccess, isError, error, data])   
 


    const handleSubmit = async(values) => { 
        const formData = new FormData() 
        if(image){
            formData?.append("image" , image)
        }  

        const data = {
            ...values
        } 
    
       
       formData.append("data",JSON.stringify(data)) 
  
        await updateProfile(formData).then((res) => {
            console.log(res);
        })
    }; 


    const onChange = (e) => {
        const file = e.target.files[0];
        const imgUrl = URL.createObjectURL(file);
        setImgURL(imgUrl);
        setImage(file);
    };

    return (
        <div className="lg:grid lg:grid-rows-2 gap-y-0">
            {/* Profile Image */}
            <div className="flex justify-center">
                <input
                    onChange={onChange}
                    type="file"
                    id="img"
                    className="hidden"
                />
                <label 
                    htmlFor="img"
                    className="relative w-48 h-48 cursor-pointer rounded-full border border-primary bg-white bg-cover bg-center"
                    style={{ backgroundImage: `url(${imgURL})` }}
                > 
                    <div 
                        className="absolute bottom-1 right-1 w-12 h-12 rounded-full border-2 border-primary bg-gray-100 flex items-center justify-center"
                    >
                        <MdOutlineAddPhotoAlternate size={22} className="text-primary" />
                    </div> 
                </label>
            </div>

            {/* Form */}
            <div className="flex justify-center items-center">
                <Form
                    name="normal_login"
                    layout="vertical"
                    className="w-3/4"
                    onFinish={handleSubmit} 
                    form={form} 
          
                >
                    <div className="grid lg:grid-cols-2 gap-x-8 gap-y-7">
                        <Form.Item
                            name="name"
                            label={<p className="block">Full Name</p>}
                            className="mb-0"
                        >
                            <Input
                                placeholder="Enter Your Full Name"
                                className="border border-gray-300 h-[45px] bg-white rounded-lg"
                            />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label={<p className="block">Email</p>}
                            className="mb-0" 
                        >
                            <Input
                                type="text"
                                placeholder="Enter Email"
                                className="border border-gray-300 h-[45px] bg-white rounded-lg" 
                                readOnly
                            /> 
                        </Form.Item>

                    </div>
                        <Form.Item
                            name="contact"
                            label={<p>Contact Number</p>}
                            className="mb-0 mt-4"
                        >
                            <Input
                                type="text"
                                placeholder="Enter Phone Number"
                                className="border border-gray-300 h-[45px] bg-white rounded-lg"
                            />
                        </Form.Item>

                    <div className="text-end mt-6">
                        <Form.Item>
                            <button
                                type="submit"
                                className="bg-primary text-white w-36 h-[45px] rounded-lg"
                            >
                            {isLoading ? "Loading..." : "Update"}    
                            </button>
                        </Form.Item>          
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default UserProfile;
