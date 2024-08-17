import React, { useState } from "react";
import { createCategory, getCategories } from "../redux/categorySlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CategoryModal = ({ onClose }) => {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = async () => {
    const newCategory = {
      title,
    };

    try {
      await dispatch(createCategory(newCategory)).unwrap();
      // toast.success("Product created successfully!");
      dispatch(getCategories()); // Fetch the updated list of products
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create category!");
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white text-dark_bg_5 p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <h2 className="text-2xl font-bold mb-4">Create Category</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
