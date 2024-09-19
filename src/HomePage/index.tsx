import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, message } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import Lobby from "../pages/Lobby/index";
import AddUser from "../pages/AddUser/index";
import Login from "../pages/Login/index";
import axios from "axios";

const { Header, Sider, Content } = Layout;

const Page2 = () => <div>这是未定画面1的内容</div>;
const Page3 = () => <div>这是未定画面2的内容</div>;

const API_URL = process.env.REACT_APP_API_URL;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = async (values: any) => {
    console.log("Success:", values, API_URL);
    const res: any = await axios.post(`${API_URL}/api/login`, values);
    console.log(res, "res");
    if (res.data.user) {
      message.success(res.data.message);
      sessionStorage.setItem("user", JSON.stringify(res.data.user)); // 保存登录状态
      setIsAuthenticated(true);
    } else {
      message.error(res.data.message);
    }
  };

  useEffect(() => {
    // 检查 sessionStorage 中的用户状态
    const user = sessionStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  const menuFor0 = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link to="/lobby">lobby</Link>, // 添加 Link
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: <Link to="/page3">未定画面2</Link>, // 添加 Link
    },
  ];

  const menuFor999 = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link to="/lobby">lobby</Link>, // 添加 Link
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: <Link to="/page2">ユーザー追加</Link>, // 添加 Link
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: <Link to="/page3">未定画面2</Link>, // 添加 Link
    },
  ];

  const [targetMenu, setTargetMenu] = useState(menuFor0);

  useEffect(() => {
    if (isAuthenticated) {
      const userStr = sessionStorage.getItem("user") ?? "";
      const user = JSON.parse(userStr);
      if (user?.lvl == "999") {
        setTargetMenu(menuFor999);
      } else {
        setTargetMenu(menuFor0);
      }
    }
  }, [isAuthenticated]);

  return (
    <Router>
      {!isAuthenticated && (
        <Layout>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} />
            {/* 默认重定向 */}
          </Routes>
        </Layout>
      )}
      {isAuthenticated && (
        <Layout style={{ height: "100vh" }}>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={targetMenu}
            />
          </Sider>

          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route path="*" element={<Navigate to="/lobby" />} />
                <Route path="/lobby" element={<Lobby />} />
                <Route path="/page2" element={<AddUser />} />
                <Route path="/page3" element={<Page3 />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      )}
    </Router>
  );
};

export default App;
