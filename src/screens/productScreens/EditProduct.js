import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getProduct,
  resetStatus,
  updateProduct,
} from "../../redux/productSlice";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.products
  );

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    location: "",
    manufacturer: "",
    supplier: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        manufacturer: product.manufacturer || "N/A",
        location: product.location || "N/A",
        stock: product.stock || "",
        supplier: product.supplier || "",
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      stock: parseInt(formData.stock),
    };
    dispatch(updateProduct({ id, formData: updatedData }));
    navigate("/dashboard");
  };

  return (
    <div className="edit-product">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Edit Product</h1>
      <form onSubmit={handleSubmit} className="text-gray-900">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            className="border p-2 w-full text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Supplier</label>
          <input
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Supplier</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>{" "}
        <div className="mb-4">
          <label className="block text-gray-700">Supplier</label>
          <input
            type="text"
            name="Manufacturer"
            value={formData.manufacturer}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
