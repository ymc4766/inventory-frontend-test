import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../../redux/orderSlice";

const { Option } = Select;

const OrderItem = ({ orderItem, onPriceUpdate, isDeliver }) => {
  const [newPrice, setNewPrice] = useState("");
  const [supplier, setNewSupplier] = useState("");

  const dispatch = useDispatch();
  const { data: orderDetails, refetch: refetchOrderDetails } =
    useGetOrderDetailsQuery({ orderId: orderItem.orderId });
  // const { getOrderDetails } = useGetOrderDetailsQuery(orderItem);

  const handleCategoryChange = (value) => {
    setNewSupplier(value);
  };

  const handlePriceUpdate = async () => {
    try {
      if (!newPrice || isNaN(newPrice)) {
        toast.error("Please enter a valid price.");
        return;
      }

      const response = await axios.put(
        `/api/orders/updateItemPrice/${orderItem._id}`,
        {
          newPrice: parseFloat(newPrice),
          supplier,
        }
      );

      if (response.status === 200) {
        const updatedOrderItem = response.data.updatedOrderItem;
        onPriceUpdate(orderItem._id, updatedOrderItem);
        toast.success("Order item  updated successfully!");
        onPriceUpdate(orderItem._id, updatedOrderItem);
        refetchOrderDetails();
      } else {
        toast.error("Failed to update order item price. Please try again.");
      }

      setNewPrice("");
      setNewSupplier("");
    } catch (error) {
      console.error("Error updating order item price:", error);
      toast.error("An error occurred while updating order item price.");
    }
  };

  return (
    <tr key={orderItem._id} className="">
      <td>
        <Link to={`/product/${orderItem?.product?._id}`}>
          {" "}
          {orderItem?.name}
        </Link>
      </td>

      <td>{orderItem?.qty}</td>
      <td>{orderItem?.price}</td>
      <td>
        {orderItem?.product?.supplier ? orderItem?.product?.supplier : "N/A"}
      </td>

      {!isDeliver && (
        <td>
          <div className="flex items-center space-x-1">
            <div className="w-[200px] text-slate-700 mb-2">
              {/* <label
                className="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2"
                htmlFor="category"
              >
                Price
              </label> */}
              <input
                type="text"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="Enter new price Purchased"
                className="p-2 rounded-1xl text-gray-950"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Supplier</label>
              <input
                type="text"
                name="supplier"
                value={supplier}
                onChange={(e) => setNewSupplier(e.target.value)}
                className="border p-2 w-full"
              />
            </div>

            <button
              type="submit"
              onClick={handlePriceUpdate}
              className="px-3 bg-blue-800 p-2 ml-3 rounded-3xl"
            >
              <p className="flex items-center">
                <FaCheck className="mr-2" />
                UPDATE
              </p>
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default OrderItem;
