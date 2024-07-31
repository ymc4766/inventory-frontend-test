import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Header/Sidebar";

const Layout = ({ children }) => {
  const openSidebar = () => {};
  return (
    <div className="grid-container">
      <Header openSidebar={openSidebar} />
      <Sidebar />
      <main className="main-container">{children}</main>
    </div>
  );
};

export default Layout;
