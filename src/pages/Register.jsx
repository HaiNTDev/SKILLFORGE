import React, { useState } from "react";
import { Form, Input, Button, Segmented, Avatar, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import api from "../config/axios";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from "../config/firebase";
import { useForm } from "antd/es/form/Form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const onFinish = async (values) => {
    console.log("Received values:", values);
    try {
      const response = await api.post("/authentication/register", {
        ...values,
        role: role.toUpperCase(),
      });
      toast.success("Đã đăng ký thành công");
      navigate("/login");
    } catch (e) {
      alert(e.message);
    }
  };

  const [role, setRole] = useState("Student");

  const handleRegisterWithGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result.user);
        form.setFieldValue("fullName", result.user.displayName);
        form.setFieldValue("email", result.user.email);
        form.setFieldValue("avatar", result.user.photoURL);
        setAvatar(result.user.photoURL);
        form.setFieldValue("username", result.user.email.split("@")[0]);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <section className="container ">
      <div className="container-fluid h-custom ">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/liquid-fort-412406.appspot.com/o/dontDelete%2Flogin.svg?alt=media&token=b56f6951-d457-467c-b500-f588fe0ea029"
              className="img-fluid "
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-2">
            <Form
              form={form}
              name="registerForm"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Sign up with</p>

                <Button
                  type="primary"
                  className="btn-floating mx-1"
                  onClick={handleRegisterWithGoogle}
                >
                  <i className="fab fa-google"></i>
                </Button>
              </div>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>
              <Segmented
                options={["Student", "Teacher"]}
                default={"Student"}
                className="mb-4"
                onChange={(value) => {
                  setRole(value);
                }}
              />{" "}
              {avatar && (
                <Form.Item name="avatar">
                  <Avatar src={avatar} size={100} />
                </Form.Item>
              )}
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please enter your username!",
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Username"
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email!",
                    type: "email",
                  },
                ]}
              >
                <Input
                  type="email"
                  placeholder="Enter a valid email address"
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password!",
                  },
                ]}
              >
                <Input
                  type="password"
                  placeholder="Enter password"
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                />
              </Form.Item>
              <Form.Item
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Please enter your full name!",
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Full Name"
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number!",
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Phone Number"
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                />
              </Form.Item>
              <div className="text-center text-lg-start mt-4 pt-2">
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  Register
                </Button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account?{" "}
                  <Link to="/login" className="link-danger">
                    Login
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
