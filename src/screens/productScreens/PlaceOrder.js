import React, { useEffect } from "react";
import { useCreateOrderMutation } from "../../redux/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { clearCartItems } from "../../redux/cartSlice";
import { getProducts } from "../../redux/productSlice";

const PlaceOrder = () => {
  const { cartItems, approvedData, requisitionSteps } = useSelector(
    (state) => state.cart
  );

  const [createOrder, { isLoading, error, isSuccess }] =
    useCreateOrderMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!approvedData?.reqBy) {
      navigate("/store-requisition");
    }

    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      navigate("/my-orders-list");
    }
  }, [approvedData.reqBy, isSuccess]);

  const placeOrderHandler = async () => {
    try {
      // const orderData = {
      //   orderItems: cartItems?.map((item) => ({
      //     product: item._id, // Ensure product ID is included
      //     name: item.name,
      //     qty: item.qty,
      //     category: item.category,
      //     stock: item.stock,
      //     supplier: item.supplier,
      //   })),
      //   approvedData,
      //   requisitionSteps,
      // };\
      const payload = {
        orderItems: await Promise.all(
          cartItems.map(async (item) => {
            if (!item.supplier) {
              const product = await getProducts(item._id);
              item = { ...item, supplier: product.supplier };
            }

            return {
              product: item._id,
              name: item.name,
              qty: item.qty,
              category: item.category,
              price: item.price,
              description: item.description,
              stock: item.stock,
              supplier: item.supplier,
              user: item.user,
            };
          })
        ),
        approvedData: approvedData,
        requisitionSteps: requisitionSteps,
      };
      // await createOrder(orderData).unwrap();
      const { res } = await createOrder(payload).unwrap();
      // console.log("res", res);
      dispatch(clearCartItems());
    } catch (err) {
      console.error("Failed to place order: ", err);
    }
  };
  return (
    <div className="w-full mt-[-42px] ">
      <div className=" grid grid-rows-2 grid-flow-col gap-4 mt-3 md:mt-16 py-6">
        {" "}
        <div className="">
          <h1 className="text-slate-200 flex justify-center pb-4">
            PLACE ORDER SCREEN
          </h1>
          {cartItems.length === 0 ? (
            <h4>
              Your Cart is Empty{" "}
              <Link to="/dashboard" className="underline">
                Go back
              </Link>
            </h4>
          ) : (
            <div className="table w-full ">
              <table className="min-w-full  bg-gray-600 border border-gray-200 text-slate-100">
                <thead>
                  <tr className="py-2 px-4 border-b">
                    <th>PRODUCT NAME</th>
                    <th className="py-2 px-4 border-b">UOM</th>
                    <th className="py-2 px-4 border-b"> STOCK</th>
                    <th className="py-2 px-4 border-b">MANUFACTURER</th>
                    <th className="py-2 px-4 border-b">MODEL NO</th>
                    <th className="py-2 px-4 border-b">QTY</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>

                      <td className="py-2 px-4 border-b">PCS</td>
                      <td className="py-2 px-4 border-b">{item?.stock}</td>
                      <td className="py-2 px-4 border-b">
                        {item?.manufacturer ? item.manufacturer : "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {item?.modelNO ? item.modelNO : "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b">{item?.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="py-3 ">
            <h3 className="mt-2 text-slate-200 text-2xl p-2">ADDITION INFO</h3>
            <div className="flex flex-col space-y-3">
              <div className="text-md font-semibold text-slate-100 uppercase  ">
                <b>REQ BY : {approvedData.reqBy} </b> <br />
                <b> APPROVED BY : {approvedData.approvedBy}</b>
                <p> REMARKS : {approvedData.comment} </p>
              </div>
            </div>
          </div>
          {/* // for button save reqyuisition */}

          <div className="flex justify-end">
            {isLoading && <Loader />}
            <button
              disabled={cartItems?.length === 0}
              onClick={placeOrderHandler}
              className="text-lg bg-orange-400 text-black p-2 px-5 mr-5 rounded-lg"
            >
              SAVE REQUISITION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
