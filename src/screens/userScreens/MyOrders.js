import React from "react";
import { useGetMyOrdersQuery } from "../../redux/orderSlice";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { BiCheck } from "react-icons/bi";

const MyOrders = () => {
  const { data, error, isLoading } = useGetMyOrdersQuery();

  const deleteOrderHandler = () => {};

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100"></div>
      </div>
    );
  }

  console.log("orders", data?.orders);
  return (
    <div className="">
      <div>
        <h1 className="flex justify-center text-3xl">MY REQUISITIONS ORDERS</h1>
        {data?.orders.length === 0 ? (
          <h3 className="text-sm text-blue-100 ">
            YOUR REQUISITION IS EMPTY
            <Link to="/dashboard" className="ml-2 underline text-blue-800">
              GO BACK
            </Link>{" "}
          </h3>
        ) : (
          <div>
            <table className="w-full text-sm text-left text-slate-300 text-lg dark:text-gray-400">
              <thead>
                <tr>
                  <th>S/N</th>

                  <th>GRN</th>
                  <th>PRODUCT NAME </th>
                  <th>DATE</th>
                  <th>QTY</th>
                  {/* <th>PAID</th> */}
                  <th>REQUISITION STATUS </th>
                  <th></th>
                </tr>
              </thead>
              <tbody className=" ">
                {data?.orders?.map((order, i) => (
                  <tr key={order?._id} className="border-b border-gray-300">
                    <td>{i}</td>
                    <td>{order?._id}</td>
                    <td className="uppercase"> {order?.orderItems[0]?.name}</td>
                    <td>{order?.createdAt?.substring(0, 10)}</td>

                    <td>
                      {order?.isDelivered ? (
                        <b>
                          <BiCheck className="text-green-700" />{" "}
                          {order?.deliveredAt.substring(0, 10)}
                        </b>
                      ) : (
                        <b className="flex items-center space-x-1">
                          <FaTimes className="mr-1" style={{ color: "red" }} />{" "}
                          Pending
                        </b>
                      )}
                    </td>
                    <td>
                      <button className="px-3 bg-orange-400 text-slate-100 rounded-lg py-2">
                        <Link to={`/orderdetail/${order?._id}`}>View</Link>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
