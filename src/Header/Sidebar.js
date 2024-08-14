import React, { useState } from "react";
import { BiSolidUserPin, BiTime } from "react-icons/bi";
import {
  BsCart4,
  BsCheck2Square,
  BsFillGrid3X3GapFill,
  BsGrid1X2Fill,
} from "react-icons/bs";
import { IoIosArrowUp, IoIosClose } from "react-icons/io";
import { FaJediOrder, FaToolbox, FaTools } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ openSidebarToggle, openSidebar }) => {
  const [isInventoryOpen, setIsInventoryOpen] = useState(true);
  const [isProcurmentOpen, setIsProcurmentOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const totalQty = cartItems?.reduce((acc, item) => acc + Number(item.qty), 0);

  const toggleInventory = () => {
    setIsInventoryOpen(!isInventoryOpen);
  };
  const toggleProcurement = () => {
    setIsProcurmentOpen(!isProcurmentOpen);
  };
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive p-4" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand  flex items-center space-x-2 text-slate-300 ">
          <BiTime size={26} className="icon_head mr-2" /> 2:15
        </div>
        <span className="icon close_icon " onClick={openSidebar}>
          <IoIosClose size={32} className="text-slate-100 ml-4" />
        </span>
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-list-item ">
          <span className="flex items-center space-x-2">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </span>
        </li>
        <li className="sidebar-list-item">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={toggleInventory}
          >
            <div className="flex items-center">
              <BsFillGrid3X3GapFill className="icon" /> Inventory
            </div>

            {/* Icon for the parent item in the nested list */}
            {isInventoryOpen ? (
              <IoIosArrowUp className="icon ml-2" />
            ) : (
              <IoIosArrowUp className="icon ml-2 rotate-90" />
            )}
          </div>
          {/* // add nested List here */}
          {isInventoryOpen && (
            <ul className="nested-list ml-8 space-y-3 mt-2">
              <li>
                <Link
                  to="/warehouse"
                  className="flex items-center text-gray-300 hover:text-black hover:underline"
                >
                  <FaToolbox className="icon" /> Warehouse
                </Link>
              </li>
              <li>
                <Link
                  to="/store-requisition"
                  className="flex items-center text-gray-300 hover:text-black hover:underline"
                >
                  <BsCart4 className="icon" /> CART
                  <span className="badge text-orange-700 mt-[-20px]">
                    {totalQty}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/my-orders-list"
                  className="flex items-center
                   text-gray-300 hover:text-black hover:underline"
                >
                  <BiSolidUserPin className="icon" /> MY REQUISITIONs
                </Link>
              </li>
              <li className="">
                <Link
                  to="/LPO-factory"
                  className="flex items-center text-gray-300 hover:text-black hover:underline "
                >
                  <FaJediOrder className="mr-1" />
                  LP orders
                </Link>
              </li>

              <li className="">
                <Link
                  to="/goods-receive-note"
                  className="flex items-center  text-gray-300 hover:text-black hover:underline "
                >
                  <FaTools className="mr-2" />
                  GRN
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="sidebar-list-item">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={toggleProcurement}
          >
            <div className="flex items-center">
              <BsCheck2Square className="icon" /> procurement
            </div>

            {isProcurmentOpen ? (
              <IoIosArrowUp className="icon ml-2" />
            ) : (
              <IoIosArrowUp className="icon ml-2 rotate-90" />
            )}
          </div>
          {isProcurmentOpen && (
            <ul className="ml-8 space-y-3 mt-2">
              <li className="">
                <Link to="/LPO-procurement">Local purchase orders</Link>
              </li>

              <li className="">
                <Link to="/pending-requisitions">Pending Requisition </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
