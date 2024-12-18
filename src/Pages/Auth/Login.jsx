import {  Checkbox, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormItem from "../../components/common/FormItem";
import { useLoginMutation } from "../../redux/apiSlices/authSlice";
import { setToLocalStorage } from "../../util/local-stroage";
import Swal from "sweetalert2";



const Login = () => {
  const [login , {isSuccess , isError , data , error , isLoading }] = useLoginMutation()    
  console.log(data); 
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      if (data) {
        Swal.fire({
          title: "Login Successful",
          text: "Welcome to Admin Dashboard",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          setToLocalStorage("tradeToken", data?.data);  
          navigate("/");  
          window.location.reload();
        });
      }

    }
    if (isError) {
      Swal.fire({
        title: "Failed to Login",
        text: error?.data?.message,  
        icon: "error",
      });
    }
  }, [isSuccess, isError, error, data, navigate]); 


  const onFinish = async(values) => {
    await login(values).then((res)=>{ 
      console.log(res); 
    })
  };

  return (
    <div 
    >
        <div className="text-center mb-8">
          <h1 className="text-[25px] font-semibold mb-6">Login</h1>
          <p>Please enter your email and password to continue</p>
        </div>
        <Form
          onFinish={onFinish}
          layout="vertical"
        >

          <FormItem name={"email"} label={"Email"} />

            <Form.Item
              name="password"
              label={<p>Password</p>}
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                }, 
                {
                  min: 8,
                  message: "Password must be at least 8 characters long!",
              }, 
              ]}
            >
              <Input.Password
                type="password"
                placeholder="Enter your password"
                style={{
                  height: 40,
                  border: "1px solid #d9d9d9",
                  outline: "none",
                  boxShadow: "none"
                }}
              />
            </Form.Item>

            <div className="flex items-center justify-between">
              <Form.Item style={{marginBottom: 0}} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a
                className="login-form-forgot text-primary font-semibold"
                href="/auth/forgot-password"
              >
                Forgot password
              </a>
          </div>

          <Form.Item style={{marginBottom: 0}}>
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
              {isLoading? "Loading..." : "Sign in"} 
            </button>
          </Form.Item>

          
        </Form>
    </div>
  );
};

export default Login;
