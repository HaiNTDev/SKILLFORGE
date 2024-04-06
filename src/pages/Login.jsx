import React from "react";
import { Form, Input, Button, Checkbox, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import api from "../config/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../redux/feature/accountSlice";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("Received values:", values);
    try {
      const response = await api.post("/authentication/login", values);
      localStorage.setItem("token", response.data.token);
      console.log(response.data);
      if (response.data.role == "STUDENT") {
        navigate("/");
      } else if (response.data.role == "TEACHER") {
        navigate("/dashboard/teacher/my-wallet");
      } else {
        navigate("/dashboard/admin/manage");
      }
      dispatch(login(response.data));
    } catch (e) {
      console.log(e);
      toast.error(e.response.data);
    }
  };
  const handleLoginGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result.user.accessToken);
        const response = await api.post("/authentication/loginGoogle", {
          token: result.user.accessToken,
        });
        localStorage.setItem("token", response.data.token);
        console.log(response.data);
        if (response.data.role == "TEACHER") {
          navigate("/dashboard/teacher/my-wallet");
        } else if (response.data.role == "STUDENT") {
          navigate("/");
        } else {
          navigate("/dashboard/admin/manage");
        }
        dispatch(login(response.data));
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
    <section>
      <div className="container " style={{ marginTop: "150px" }}>
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/liquid-fort-412406.appspot.com/o/dontDelete%2Flogin.svg?alt=media&token=b56f6951-d457-467c-b500-f588fe0ea029"
              className="img-fluid "
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-2">
            <Form
              name="loginForm"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>

                <Button
                  type="primary"
                  className="btn-floating mx-1"
                  onClick={handleLoginGoogle}
                >
                  <i class="fab fa-google"></i>
                </Button>
              </div>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>
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
                  placeholder="Enter a valid username"
                  size="large"
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
                />
              </Form.Item>
              <div className="d-flex justify-content-between align-items-center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="#!" className="text-body">
                  Forgot password?
                </a>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  Login
                </Button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <Link to="/register" className="link-danger">
                    Register
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

export default Login;
