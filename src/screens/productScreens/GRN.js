import React from "react";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/orderSlice";

const GRN = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  const filteredOrders = orders?.filter((order) => order?.isRecieved);
  return (
    <div className="py-4">
      <h4 className="mt-2 flex justify-center text-3xl ">
        GOODS RECEIVE NOTEs
      </h4>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div
            className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2
       border-gray-100"
          ></div>
        </div>
      ) : error ? (
        <h3>{error?.data.message || "Some thing went wrong "} </h3>
      ) : (
        <div className="px-4">
          {filteredOrders?.length === 0 ? (
            <h3 variant="info">No received orders available.</h3>
          ) : (
            <div className="px-4">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-3 px-6 text-left border-r border-b">
                      Order GRN
                    </th>
                    <th className="py-3 px-6 text-left border-r border-b">
                      PRODUCT NAME
                    </th>
                    <th className="py-3 px-6 text-left border-r border-b">
                      QTY
                    </th>
                    <th className="py-3 px-6 text-left border-r border-b">
                      USER
                    </th>
                    <th className="py-3 px-6 text-left border-r border-b">
                      Order Date
                    </th>
                    <th className="py-3 px-6 text-left border-r border-b">
                      Delivered Date
                    </th>
                    <th className="py-3 px-6 text-left border-b">
                      Received Date
                    </th>
                    {/* Add more headers as needed */}
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders?.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-500">
                      <td className="py-3 px-6 border-r border-b">
                        {order._id}
                      </td>
                      <td className="py-2 px-4 border-r border-b">
                        <p className="uppercase">{order.orderItems[0].name}</p>
                      </td>
                      <td className="py-2 px-4 border-r border-b">
                        {order.orderItems.map((item, index) => (
                          <p className="uppercase" key={item._id}>
                            {item.qty}
                            {index !== order.orderItems.length - 1 && (
                              <br />
                            )}{" "}
                            {/* Add line break if not the last item */}
                          </p>
                        ))}
                      </td>
                      <td className="py-2 px-4 border-r border-b">
                        {order.user && order.user.name}
                      </td>
                      <td className="py-2 px-4 border-r border-b">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="py-2 px-4 border-r border-b">
                        {order.deliveredAt?.substring(0, 10)}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {order.recievedAt?.substring(0, 10)}
                      </td>
                      {/* Add more columns as needed */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GRN;
