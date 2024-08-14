import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/orderSlice";

const PendingRequsitions = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const filteredOrders = orders
    ? orders?.filter((order) => !order.isDelivered)
    : [];

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="py-4">
      <div>
        <h4 className="mt-2 flex justify-center text-3xl ">
          PENDING LOCAL PURCHASE REQUISITIONs
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
            <div className="overflow-x-auto">
              <table
                className="w-full text-sm text-left text-gray-200 
              dark:text-gray-400"
              >
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">LPO - NO</th>
                    <th className="py-2 px-4 border-b text-sm">PRODUCT NAME</th>

                    <th className="py-2 px-4 border-b">QTY</th>
                    <th className="py-2 px-4 border-b">USER</th>
                    <th className="py-2 px-4 border-b">DEPARTMENT</th>

                    <th className="py-2 px-4 border-b">ORDER DATE</th>
                    <th className="py-2 px-4 border-b">DELIVERED</th>
                    <th className="py-2 px-4 border-b"></th>
                    {/* <th className="py-2 px-4 border-b"></th> */}
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr className="py-3">
                      <td>{order._id}</td>
                      <td>
                        <p className="uppercase ml-3">
                          {" "}
                          {order?.orderItems[0]?.name}
                        </p>
                      </td>
                      <td className="flex items-center space-x-2 m-3">
                        {order?.orderItems.map((item) => (
                          <p key={item._id}>{item.qty}</p>
                        ))}
                      </td>
                      <td>{order.user.name}</td>
                      <td>{order.user.dept}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>
                        {order?.deliveredAt
                          ? order.deliveredAt.substring(0, 10)
                          : "on process"}{" "}
                      </td>
                      <td>
                        <Link to={`/inventory/order/${order._id}`}>
                          <button variant="light" className="btn-sm">
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

export default PendingRequsitions;
