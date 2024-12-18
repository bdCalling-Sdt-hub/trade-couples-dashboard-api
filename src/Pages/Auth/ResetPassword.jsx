import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useResetPasswordMutation } from "../../redux/apiSlices/authSlice";

const ResetPassword = () => {
  const navigate = useNavigate(); 
  const [resetPassword , {isError ,isLoading , isSuccess , error ,data}] = useResetPasswordMutation() 

  useEffect(() => {
    if (isSuccess) {
      if (data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: data?.message,
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
        navigate("/auth/login")
          window.location.reload(); 
        });
      }
    }
    if (isError) {
      Swal.fire({
       
        text: error?.data?.message,  
        icon: "error",
      });
    }
  }, [isSuccess, isError, error, data, navigate]);  


  const onFinish = async(values) => {   
    await resetPassword(values)
  }

  return (
    <div>

        <div className="text-center mb-12">
          <h1 className="text-[25px] font-semibold mb-6">Reset Password</h1>
        </div>

        <Form
          layout="vertical"
          onFinish={onFinish}
        >

            <Form.Item
              name="newPassword" 
              label={ <p
                style={{
                  display: "block",
                  color: "#5C5C5C",
                }}
                htmlFor="email"
                className="font-semibold "
              >
                New Password
              </p>}
              rules={[
                {
                  required: true,
                  message: "Please input your new Password!",
                }, 
                {
                  min: 8,
                  message: "Password must be at least 8 characters long!",
              },  
              ]}
              style={{ marginBottom: 0 }}
            >
              <Input.Password
                type="password"
                placeholder="Enter New password"
                style={{
                  border: "1px solid #E0E4EC",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                }} 
                className="mb-6"
              />
            </Form.Item>       
           
            <Form.Item
              style={{ marginBottom: 0 }} 
              label={ <p
                style={{
                  display: "block",
                  color: "#5C5C5C",
                }}
                htmlFor="email"
                className="font-semibold"
              >
                Confirm Password
              </p>}
              name="confirmPassword"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                }, 

                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The new password that you entered do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                type="password"
                placeholder="Enter Confirm password"
                style={{
                  border: "1px solid #E0E4EC",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                }} 
                className="mb-6"
              />
            </Form.Item>
      

            <Form.Item style={{marginBottom: 0}}>
            <Button
              htmlType="submit"
              style={{
                width: '100%',
                height: 45,
                color: "white",
                fontWeight: "400px",
                fontSize: "18px",
                background: "#007BA5",
                marginTop: 20
              }}
            >
           {isLoading ? "Updating..." : "Update Password"}  
            </Button>
          </Form.Item>


         
        </Form>


    </div>
  );
};

export default ResetPassword;
