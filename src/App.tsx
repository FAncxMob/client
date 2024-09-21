import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import HomePage from "./Layout/HomePage/index";
// import HomePageForP from "./pages/phone/Novel/index";
import Login from "./pages/Login/index";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
function App() {
  return (
    <div className="home-page">
      <HomePage />
    </div>
  );
}

export default App;
