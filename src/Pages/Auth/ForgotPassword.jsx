import {  Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "../../redux/apiSlices/authSlice";
import Swal from "sweetalert2";


const ForgotPassword = () => {
  const navigate = useNavigate();  
  const [email , setEmail] = useState()
  const [forgetPassword, {isLoading , isError , error , data , isSuccess}] = useForgetPasswordMutation() 


  useEffect(() => {
      if (isSuccess) {
       
        if (data) {
          Swal.fire({
            position: "center",
            icon: "success",
            text: data?.message,
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            localStorage.setItem("email", JSON.stringify(email))    
            navigate('/auth/verify-otp')
            window.location.reload(); 
          });
        }
  
      }
      if (isError) {
        Swal.fire({          
          //@ts-ignore
          text: error?.data?.message,  
          icon: "error",
        });
      }
    }, [isSuccess, isError, error, data, navigate]);   


  const onFinish = async(values) => {  
     
      setEmail(values?.email)
   await forgetPassword(values)
  };
  return (
    <div>

        <div className="text-center mb-8">
          <h1 className="text-[25px] font-semibold mb-6">Forgot Password</h1>
          <p className="w-[90%] mx-auto text-base">Enter your email below to reset your password</p>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          
            <Form.Item
              label={<p>Email</p>}
              name="email"
              id="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                placeholder="Enter your email address"
                style={{
                  height: 40,
                  border: "1px solid #d9d9d9",
                  outline: "none",
                  boxShadow: "none"
                }}
              />
            </Form.Item>

          <Form.Item>
            <button
              type="submit"
              style={{
                width: '100%',
                height: 45,
                color: "white",
                fontWeight: "400px",
                fontSize: "18px",
           
                marginTop: 20
              }}
              className="flex items-center justify-center bg-primary rounded-lg"
            >
          {isLoading ? "Sending..." : "Send OTP"}  
            </button>
          </Form.Item>
        </Form>
    </div>
  );
};

export default ForgotPassword;
