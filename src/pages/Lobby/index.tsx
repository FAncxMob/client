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
  message,
  Select,
} from "antd";
import type { TableProps } from "antd";
import type { FormProps } from "antd";
const { Sider, Content } = Layout;

interface DataType {
  fromUser: string;
  message: string;
  updateDatetime: string;
}

type FieldType = {
  toUserId?: string;
  message?: string;
};

const Lobby: React.FC = () => {
  const [messagesToMe, setMessagesToMe] = useState([]);
  const [userList, setUserList] = useState([]);

  // 获取数据
  // const fetchData = async () => {
  //   const response = await axios.get("http://localhost:5000/api/getUsers");
  //   // 为每个用户项添加唯一的 key

  //   setDataList(
  //     response.data.map((user: DataType) => ({
  //       ...user,
  //       key: user.userId, // 使用 userId 作为唯一的 key
  //     }))
  //   );
  // };

  // 获取message
  const fetchMyMessage = async () => {
    const userStr = sessionStorage.getItem("user") ?? "";
    const user = JSON.parse(userStr);
    const response = await axios.post(
      "http://localhost:5000/api/fetchMyMessage",
      {
        toUserId: user.userId,
      }
    );

    setMessagesToMe(
      response.data.map((user: DataType, index: any) => ({
        ...user,
        key: index, // 使用 userId 作为唯一的 key
      }))
    );
  };

  // 获取数据
  const fetchUserData = async () => {
    const response = await axios.get("http://localhost:5000/api/getUserList");
    // 为每个用户项添加唯一的 key

    setUserList(
      response.data.map((user: any) => ({
        ...user,
        key: user.userId, // 使用 userId 作为唯一的 key
      }))
    );
  };

  useEffect(() => {
    // testSession();
    fetchUserData();
    fetchMyMessage();
  }, []);

  // testSession TODO:NG
  // const testSession = async () => {
  //   const response = await axios.get("http://localhost:5000/api/dashboard", {
  //     withCredentials: true,
  //   });

  //   console.log(response, "response");
  // };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "送信元",
      dataIndex: "fromUserId",
      key: "fromUserId",
    },
    {
      title: "メッセージ内容",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "日付",
      dataIndex: "updateDatetime",
      key: "updateDatetime",
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

  // 添加message
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);

    const userStr = sessionStorage.getItem("user") ?? "";
    const user = JSON.parse(userStr);
    const res = await axios.post("http://localhost:5000/api/addMessage", {
      fromUserId: user.userId,
      toUserId: values.toUserId,
      message: values.message,
    });

    if (res.data.data) {
      message.success(res.data.message);
      fetchMyMessage(); // 更新数据列表
    } else {
      message.error(res.data.message);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      {" "}
      <h1>りゅうたろう！頑張れ！</h1>
      要望があったらここにメッセージを残してください
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
            label="宛先"
            name="toUserId"
            rules={[{ required: true, message: "Please input your toUserId!" }]}
          >
            <Select
              // defaultValue="lucy"
              style={{ width: 120 }}
              // onChange={handleChange}
              options={userList}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="メッセージ内容"
            name="message"
            rules={[{ required: true, message: "Please input your message!" }]}
          >
            <Input.TextArea />
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
            fetchMyMessage();
          }}
        >
          リフレッシュ
        </Button>
        <Table dataSource={messagesToMe} columns={columns} />;
      </div>
    </div>
  );
};

export default Lobby;
