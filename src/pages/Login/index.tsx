import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Layout,
  Menu,
  Input,
  Button,
  Space,
  Table,
  Tag,
  Checkbox,
  Form,
  Card,
  message,
} from "antd";
import type { TableProps } from "antd";
import type { FormProps } from "antd";
import "./index.css";
const { Sider, Content } = Layout;
const API_URL = process.env.REACT_APP_API_URL;
type FieldType = {
  userId?: string;
  password?: string;
  lvl?: number;
};

const Login: React.FC<any> = ({ onLogin }) => {
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    onLogin(values);
    // console.log("Success:", values);
    // const res: any = await axios.post(
    //   "http://localhost:5000/api/login",
    //   values
    // );
    // console.log(res, "res");
    // if (res.data.user) {
    //   message.success(res.data.message);
    //   sessionStorage.setItem("user", res.data.user); // 保存登录状态
    //   navigate("/lobby"); // 登录后重定向到lobby页面
    // } else {
    //   message.error(res.data.message);
    // }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card
        title="用户登录"
        style={{ width: 400, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
      >
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            name="userId"
            label="用户名"
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input placeholder="请输入您的用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input.Password placeholder="请输入您的密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
