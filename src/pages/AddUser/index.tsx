import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

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
} from "antd";
import type { TableProps } from "antd";
import type { FormProps } from "antd";
const { Sider, Content } = Layout;

interface DataType {
  userId: string;
  password: string;
  lvl: number;
}

type FieldType = {
  userId?: string;
  password?: string;
  lvl?: number;
};

const Lobby: React.FC = () => {
  const [dataList, setDataList] = useState([]);

  // 获取数据
  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/api/getUsers");
    // 为每个用户项添加唯一的 key

    setDataList(
      response.data.map((user: DataType) => ({
        ...user,
        key: user.userId, // 使用 userId 作为唯一的 key
      }))
    );
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "userId",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "lvl",
      dataIndex: "lvl",
      key: "lvl",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Edit</a>
    //       {record.lvl !== 999 ? <a>Delete</a> : null}
    //     </Space>
    //   ),
    // },
  ];

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    await axios.post("http://localhost:5000/api/addUser", values);
    fetchData(); // 更新数据列表
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="UserId"
            name="userId"
            rules={[{ required: true, message: "Please input your userId!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <Button
          style={{ marginRight: 5 }}
          type="primary"
          onClick={() => {
            fetchData();
          }}
        >
          检索
        </Button>
        <Table dataSource={dataList} columns={columns} />;
      </div>
    </div>
  );
};

export default Lobby;
