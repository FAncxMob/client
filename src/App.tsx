import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import HomePage from "./HomePage/index";
import Login from "./pages/Login/index";
import "./App.css";

function App() {
  return (
    <div className="home-page">
      <HomePage />
    </div>
  );
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>時計</p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
