import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
const { Header, Content } = Layout;

// Layout without Menu
const NoMenuLayout: React.FC = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <Layout>
      {/* <Header
        style={{ padding: 0, backgroundColor: "#fff", textAlign: "center" }}
      >
        NoMenuLayout
      </Header> */}
      <Content
        style={{ margin: "16px", padding: "16px", backgroundColor: "#fff" }}
      >
        <Outlet />
      </Content>
    </Layout>
  </Layout>
);

export default NoMenuLayout;
