import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./../../../Components/ProductCart/Navbar/Navbar";

export default function Layout({ darkMode, toggleMode }) {
  return (
    <div>
      <Navbar darkMode={darkMode} toggleMode={toggleMode} />
      <Outlet />
    </div>
  );
}
