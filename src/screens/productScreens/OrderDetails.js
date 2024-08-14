import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
} from "../../redux/orderSlice";
import Loader from "../../components/Loader";

const OrderDetails = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);

  const { data, isLoading, error } = useGetOrderDetailsQuery(orderId);

  const [deliverOrder, { isLoading: deliverLoading }] =
    useDeliverOrderMutation();
  useEffect(() => {
    if (data) {
      setOrder(data.order);
    }
  }, [data]);
  const navigate = useNavigate();

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      toast.success("Order Delivered And  Decremented the Stock");
      navigate("/LPO-factory");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  console.log("order", order);

  return (
    <div>
      <div>
        {error ? (
          <h3>{error}</h3>
        ) : (
          <div className="px-4">
            <div className="flex items-center justify-evenly">
              <div>
                <h3>Order Info</h3>
                <p>
                  <span className="font-bold text-slate-100">Order LPO:</span>{" "}
                  {order?._id}
                </p>
                <p>
                  <span className="font-bold">Order Date:</span>{" "}
                  {order?.createdAt && order?.createdAt?.substring(0, 10)}
                </p>

                <p>
                  <span className="font-bold">
                    Payment : {order?.approvedStatusProcur?.paymentMethod}
                  </span>{" "}
                </p>
                <p>
                  <span className="font-bold">Delivery Status:</span>{" "}
                  {order?.isDelivered
                    ? `Delivered at ${order?.deliveredAt.substring(0, 10)}`
                    : "Not Delivered"}
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold mb-4">Additional Info</h2>
                <p>
                  <span className="font-bold">Requested By:</span>{" "}
                  {order?.approvedData && order?.approvedData?.reqBy}
                </p>

                <p>
                  <span className="font-bold">Approved By:</span>{" "}
                  {order?.approvedData && order?.approvedData.approvedBy}
                </p>
                <p>
                  <span className="font-bold">Comment:</span>{" "}
                  {order?.approvedData && order?.approvedData.comment}
                </p>

                <div>
                  <h3 className=""> Req TYPE = {order?.requisitionSteps}</h3>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
              <div className="px-4">
                <table
                  striped
                  bordered
                  hover
                  responsive
                  className="w-full text-sm text-left text-slate-300 text-lg dark:text-gray-400"
                >
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>QUANTITY</th>
                      <th>price</th>
                      <th>supplier</th>
                      {!order?.isDelivered && <th> update</th>}
                    </tr>
                  </thead>

                  <tbody>
                    {order?.orderItems?.map((item) => (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>{item.price ? item.price : "0"}</td>
                        <td>{item.supplier ? order.supplier : "N/A"} </td>
                        <td>Edit</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {order && !order?.isDelivered && (
          <div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={deliverHandler}
                className="px-5 p-2 bg-green-600 text-slate-100 rounded-2xl hover:bg-slate-300 hover:text-orange-800"
              >
                {deliverLoading ? <Loader /> : " DELIVER ORDER FACTORY"}
              </button>
            </div>
          </div>
        )}

        {order && order?.isDelivered && !order.isReceived && (
          <div>
            <div className="mt-4 flex justify-end">
              <button className="px-5 p-2 bg-green-600 text-slate-100 rounded-2xl hover:bg-slate-300 hover:text-orange-800">
                RECEIVE ORDER
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
