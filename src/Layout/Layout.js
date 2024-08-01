import React, { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Header/Sidebar";

const Layout = ({ children }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <div className="grid-container">
      <Header openSidebar={openSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        openSidebar={openSidebar}
      />
      <main className="main-container">{children}</main>
    </div>
  );
};

export default Layout;
