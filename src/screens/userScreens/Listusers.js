import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useListUsersQuery } from "../redux/userApiSlice";
import { FaUserEdit } from "react-icons/fa";
import EditUserClearance from "./EditUserClearance";

const UserList = () => {
  const [editModal, setEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { data: users, isLoading, error } = useListUsersQuery();
  console.log("users", users);

  const openModalHandler = (user) => {
    setSelectedUser(user);
    setEditModal(true);
  };

  const closeModalHandler = () => {
    setEditModal(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {editModal && (
        <EditUserClearance user={selectedUser} onClose={closeModalHandler} />
      )}
      <div className="w-full py-4">
        <h3 className="text-3xl text-green-600 font-bold text-center mb-6">
          List Users Dashboard
        </h3>

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-green-500"></div>
          </div>
        ) : error ? (
          <h3 className="text-center text-red-500">
            {error?.data?.message || "Something went wrong!"}
          </h3>
        ) : users && users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-md text-white bg-blue-600">
                <tr>
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Department</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4">{user._id}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.dept}</td>
                    <td className="py-2 px-4 text-blue-500 cursor-pointer">
                      <button
                        onClick={() => openModalHandler(user)}
                        className="px-6 p-2 bg-orange-600 rounded-2xl text-slate-100
                      "
                      >
                        <FaUserEdit size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3 className="text-center text-gray-500">No Users</h3>
        )}
      </div>
    </div>
  );
};

export default UserList;
