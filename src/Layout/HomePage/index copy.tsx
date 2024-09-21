// import React, { useState, useEffect } from "react";
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
//   PicRightOutlined,
//   ContainerOutlined,
// } from "@ant-design/icons";
// import { Button, Layout, Menu, theme, message } from "antd";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Link,
//   Navigate,
//   useLocation,
// } from "react-router-dom";
// import Lobby from "../../pages/Lobby/index";
// import AddUser from "../../pages/AddUser/index";
// import Login from "../../pages/Login/index";
// import Novel from "../../pages/Novel/index";
// import NovelDetail from "../../pages/Novel/NovelDetail/index";
// import axios from "axios";
// import { isPhone } from "../../utils/utils";

// const { Header, Sider, Content } = Layout;

// const Page2 = () => <div>这是未定画面1的内容</div>;
// const Page3 = () => <div>这是未定画面2的内容</div>;

// const API_URL = process.env.REACT_APP_API_URL;

// const App: React.FC = () => {
//   const location = useLocation(); // 获取当前路径

//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLogin = async (values: any) => {
//     console.log("Success:", values, API_URL);
//     const res: any = await axios.post(`${API_URL}/api/login`, values);
//     console.log(res, "res");
//     if (res.data.user) {
//       message.success(res.data.message);
//       sessionStorage.setItem("user", JSON.stringify(res.data.user)); // 保存登录状态
//       setIsAuthenticated(true);
//     } else {
//       message.error(res.data.message);
//     }
//   };

//   useEffect(() => {
//     // 检查 sessionStorage 中的用户状态
//     const user = sessionStorage.getItem("user");
//     if (user) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, []);
//   const menuFor0 = [
//     {
//       key: "novelmMenu",
//       icon: <PicRightOutlined />,
//       label: "なろう小説API", // 添加 Link
//       children: [
//         {
//           key: "novel",
//           icon: <UploadOutlined />,
//           label: <Link to="/novel">なろう小説API</Link>, // 添加 Link
//         },
//         {
//           key: "novelDetail",
//           icon: <ContainerOutlined />,
//           label: <Link to="/novelDetail">小説詳細</Link>, // 添加 Link
//         },
//         { key: "6", label: "Option 6" },
//         { key: "7", label: "Option 7" },
//         { key: "8", label: "Option 8" },
//       ],
//     },
//     {
//       key: "lobby",
//       icon: <UserOutlined />,
//       label: <Link to="/lobby">lobby</Link>, // 添加 Link
//     },
//   ];

//   const menuFor999 = [
//     ...menuFor0,
//     {
//       key: "addUser",
//       icon: <VideoCameraOutlined />,
//       label: <Link to="/addUser">ユーザー追加</Link>, // 添加 Link
//     },
//   ];

//   const [targetMenu, setTargetMenu] = useState(menuFor0);

//   useEffect(() => {
//     if (isAuthenticated) {
//       const userStr = sessionStorage.getItem("user") ?? "";

//       if (userStr) {
//         const user = JSON.parse(userStr);
//         if (user?.lvl == "999") {
//           setTargetMenu(menuFor999);
//         } else {
//           setTargetMenu(menuFor0);
//         }
//       }
//     }
//   }, [isAuthenticated]);

//   const isMobile = isPhone();
//   return (
//     <Router>
//       <Routes>
//         <Route path="/novelDetail" element={<NovelDetail />} />
//       </Routes>
//       {/* {!isAuthenticated && (
//         <Layout>
//           <Routes>
//             <Route path="/login" element={<Login onLogin={handleLogin} />} />
//             <Route path="*" element={<Navigate to="/login" />} />

//           </Routes>
//         </Layout>
//       )} */}
//       {location.pathname !== "/novelDetail" && (
//         <Layout style={{ height: "100vh" }}>
//           <Sider
//             collapsedWidth={isMobile ? "0" : "80px"}
//             trigger={null}
//             collapsible
//             collapsed={collapsed}
//           >
//             <div className="demo-logo-vertical" />
//             <Menu
//               theme="dark"
//               mode="inline"
//               defaultSelectedKeys={["1"]}
//               items={targetMenu}
//             />
//           </Sider>

//           <Layout>
//             <Header style={{ padding: 0, background: colorBgContainer }}>
//               <Button
//                 type="text"
//                 icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//                 onClick={() => setCollapsed(!collapsed)}
//                 style={{
//                   fontSize: "16px",
//                   width: 64,
//                   height: 64,
//                 }}
//               />
//             </Header>
//             <Content
//               style={{
//                 margin: "24px 16px",
//                 padding: 24,
//                 minHeight: 280,
//                 background: colorBgContainer,
//                 borderRadius: borderRadiusLG,
//                 overflowY: "auto",
//                 overflowX: "hidden",
//               }}
//             >
//               <Routes>
//                 {/* <Route path="*" element={<Navigate to="/lobby" />} /> */}
//                 {isAuthenticated ? (
//                   <Route path="/lobby" element={<Lobby />} />
//                 ) : (
//                   <Route path="/lobby" element={<Navigate to="/login" />} />
//                 )}
//                 {/* <Route path="/lobby" element={<Lobby />} /> */}
//                 <Route
//                   path="/login"
//                   element={<Login onLogin={handleLogin} />}
//                 />
//                 <Route path="/addUser" element={<AddUser />} />
//                 <Route path="/novel" element={<Novel />} />
//                 <Route path="/page3" element={<Page3 />} />
//               </Routes>
//             </Content>
//           </Layout>
//         </Layout>
//       )}
//     </Router>
//   );
// };

// export default App;
export default {
  //
};
