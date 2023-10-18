import React from "react";
import { Button, Typography, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    const apiUrl = "http://localhost:3000/login";

    axios
      .post(apiUrl, values)
      .then((response) => {
        console.log("Response:", response.data);
        if (response?.data?.status) {
          navigate("/homepage");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="loginContainer">
      <Form
        name="basic"
        className="loginForm"
        style={{ width: 350 }}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        title="Welcome To"
      >
        <Typography.Title
          style={{
            textAlign: "center",
            fontFamily: "sans-serif",
          }}
        >
          Login
        </Typography.Title>
        <Typography.Paragraph
          style={{
            textAlign: "center",
            fontFamily: "sans-serif",
            marginBottom: "20px",
          }}
        >
          Please Login your portel
        </Typography.Paragraph>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item style={{ marginTop: "40px" }}>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
