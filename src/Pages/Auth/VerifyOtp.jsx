import { Button, ConfigProvider, Form, Input, Typography } from "antd";
import React, { useState } from "react"
import OTPInput from "react-otp-input";
import { useNavigate, useParams } from "react-router-dom";
import { useForgetPasswordMutation, useOtpVerifyMutation } from "../../redux/apiSlices/authSlice";
import { getFromLocalStorage, setToLocalStorage } from "../../util/local-stroage";
import Swal from "sweetalert2";
const { Text } = Typography;

const VerifyOtp = () => {
  const navigate = useNavigate();
  const email = getFromLocalStorage("email")
  const userEmail = JSON.parse(email ? email : "")
  const [forgetPassword] = useForgetPasswordMutation()
  const [otpVerify, { isLoading }] = useOtpVerifyMutation()



  const handleResendEmail = async () => {
    const value = {
      email: userEmail
    }
    await forgetPassword(value).then((res) => {
      if (res?.data?.success) {
        Swal.fire({
          text: res?.data?.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        })
      } else {
        Swal.fire({
          title: "Oops",
          //@ts-ignore
          text: res?.error?.data?.message,
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });

      }
    })

  };

  const onFinish = async (values) => {

    const data = {
      email: userEmail,
      oneTimeCode: parseInt(values?.otp)
    }

    await otpVerify(data).then((res) => {

      if (res?.data?.success) {
        Swal.fire({
          text: res?.data?.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/auth/reset-password")
          setToLocalStorage("resetToken", res?.data?.data);
          window.location.reload();
        });
      } else {
        Swal.fire({
          title: "Oops",
          //@ts-ignore
          text: res?.error?.data?.message,
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });

      }
    })
  };
  return (
    <div>

      <div className="text-center mb-6">
        <h1 className="text-[25px] font-semibold mb-6">Verify OTP</h1>
        <p className="w-[80%] mx-auto">We'll send a verification code to your email. Check your inbox and
          enter the code here.</p>
      </div>


      <Form layout="vertical" onFinish={onFinish}>

      <ConfigProvider
            theme={{
                components: {
                    Input: {
                        // lineHeight: 3,
                        controlHeight: 55,

                        borderRadius: 10,
                    },
                },
                token: {
                    colorPrimary: '#292C61',
                },
            }}
        >      
        <Form.Item
          className="flex items-center justify-center mx-auto"
          name="otp"
          rules={[{ required: true, message: 'Please input otp code here!' }]}
        >
          <Input.OTP
            style={{
              width: 300, 
              height: 50,
      
            }}
            className=""
            variant="filled"
            length={5}
          />
        </Form.Item>
        </ConfigProvider>

        <div className="flex items-center justify-between mb-6">
          <Text>Don't received code?</Text>

          <p
            onClick={handleResendEmail}
            className="login-form-forgot"
            style={{ color: "#007BA5", cursor: "pointer" }}
          >
            Resend
          </p>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            htmlType="submit"
            style={{
              width: "100%",
              height: 40,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
              background: "#007BA5",
              color: "white"
            }}
          >
            {isLoading ? "Loading..." : "Verify"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyOtp;
