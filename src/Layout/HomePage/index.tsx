import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
import Lobby from "../../pages/Lobby/index";
import AddUser from "../../pages/AddUser/index";
import Login from "../../pages/Login/index";
import Novel from "../../pages/Novel/index";
import NovelEp from "../../pages/Novel/NovelEp/index";
import NovelEpDetail from "../../pages/Novel/NovelEpDetail/index";
import NoMenuLayout from "../NoMenuLayout/index";
import MenuLayout from "../MenuLayout/index";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Routes that need the menu */}
        <Route element={<MenuLayout />}>
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/novel" element={<Novel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/novelEp" element={<NovelEp />} />
          <Route path="/novelEpDetail" element={<NovelEpDetail />} />
        </Route>

        {/* Routes that don't need the menu */}
        <Route element={<NoMenuLayout />}>
          {/* <Route path="/novelDetail" element={<NovelDetail />} /> */}
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/novel" />} />
      </Routes>
    </Router>
  );
};

export default App;
