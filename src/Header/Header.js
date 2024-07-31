import React from "react";
import { BsJustify } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
const Header = ({ openSidebar }) => {
  return (
    <header className="header">
      <div className="meu-icon" onClick={openSidebar}>
        <BsJustify size={24} />
      </div>

      <div className="header-left">
        <h3 className="text-lg sm:ml-3 md:text-3xl text-slate-200">
          Inventory SYS
        </h3>
      </div>
      <div className="header-right flex items-center space-x-2">
        <p className="hidden md:block">User name</p>
        <button className="flex items-center space-x-1">
          <BiLogOut size={28} /> Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
