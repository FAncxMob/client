import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  PicRightOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, message } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import axios from "axios";
import { isPhone } from "../../utils/utils";

const { Header, Sider, Content } = Layout;

// Layout with Menu
const MenuLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      key: "novelmMenu",
      icon: <PicRightOutlined />,
      label: "なろう小説API", // 添加 Link
      children: [
        {
          key: "novel",
          icon: <UploadOutlined />,
          label: <Link to="/novel">なろう小説API</Link>, // 添加 Link
        },
        { key: "6", label: "Option 6" },
        { key: "7", label: "Option 7" },
        { key: "8", label: "Option 8" },
      ],
    },
    {
      key: "lobby",
      icon: <UserOutlined />,
      label: <Link to="/lobby">lobby</Link>, // 添加 Link
    },
  ];

  const menuFor999 = [
    ...menuFor0,
    {
      key: "addUser",
      icon: <VideoCameraOutlined />,
      label: <Link to="/addUser">ユーザー追加</Link>, // 添加 Link
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

  const isMobile = isPhone();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsedWidth={isMobile ? "0" : "80px"}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
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
            // overflowY: "auto",
            // overflowX: "hidden",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MenuLayout;
