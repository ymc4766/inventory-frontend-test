import React from "react";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useGetOrdersQuery } from "../../redux/orderSlice";
import { useSelector } from "react-redux";

const LocalPurchaseOrders = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  console.log("all Orders", orders);

  const { userInfo } = useSelector((state) => state.auth);

  // Filter orders based on whether the user who created the order is from the "Inventory" department
  const filteredOrders = orders?.filter(
    (order) => order?.user?.dept === "Inventory"
  );

  return (
    <div>
      <div>
        <h1>LOCAL PURCHASE ORDERS</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <h4>{error}</h4>
        ) : (
          <div className="">
            <div className="">
              <table
                className="w-full text-sm text-left rtl:text-right
             text-blue-100 dark:text-blue-100 border-collapse"
              >
                <thead
                  className="text-xs
                 text-white uppercase bg-blue-600 
                 border-b border-blue-400 dark:text-white"
                >
                  <tr>
                    <th>S/N</th>
                    <th className="px-6 py-3">Product name</th>
                    <th className="px-6 py-3">QTY</th>
                    <th className="px-6 py-3">USER</th>

                    <th className="px-6 py-3">ORDER DATE</th>
                    <th className="px-6 py-3">DELIVER DATE</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr
                      key={order._id}
                      className="bg-gray-700 border-b border-gray-600"
                    >
                      <td className="px-6 py-3">{index + 1}</td>
                      <td className="px-6 py-3">{order.orderItems[0]?.name}</td>
                      <td className="px-6 py-3">{order.orderItems[0]?.qty}</td>
                      <td className="px-6 py-3">{order.user?.name}</td>
                      <td className="px-6 py-3">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3">
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <b className="flex items-center ">
                            <FaTimes
                              style={{ color: "red" }}
                              className="mr-2"
                            />{" "}
                            Pending
                          </b>
                        )}
                      </td>
                      <td className="px-6 py-3">
                        <Link to={`/procurement/order/${order._id}`}>
                          <button className="font-medium text-white hover:underline uppercase">
                            Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocalPurchaseOrders;
