import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { removeFromCart } from "../redux/cartSlice";

const CartScreen = () => {
  const { cartItems } = useSelector((state) => state.cart);
  // console.log(cartItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success("removed Item Succesfuly !");
  };

  const requisitionTypeHandler = () => {
    navigate("/requisition-type");
  };
  return (
    <div>
      <div className="product-list">
        <div className=" grid grid-rows-2 grid-flow-col gap-4 mt-3 md:mt-16 py-6">
          {" "}
          <div className="">
            <h1 className=" flex justify-center text-3xl font-bold text-slate-100 ">
              Requisition Note
            </h1>
            {cartItems.length === 0 ? (
              <span className="py-3 mr-2">
                Your Requisition is Empty
                <Link
                  to="/dashboard"
                  className="ml-2 underline text-orange-600"
                >
                  Go BACK
                </Link>
              </span>
            ) : (
              <div className="table w-full">
                <table className="min-w-full bg-gray-600 border border-gray-200 text-slate-100">
                  <thead>
                    <tr className="py-2 px-4 border-b">
                      <th>PRODUCT NAME</th>
                      <th className="py-2 px-4 border-b">UOM</th>
                      <th className="py-2 px-4 border-b"> STOCK</th>
                      <th className="py-2 px-4 border-b">MANUFACTURER</th>
                      <th className="py-2 px-4 border-b">MODEL NO</th>
                      <th className="py-2 px-4 border-b">QTY</th>
                      <th className="py-2 px-4 border-b">RM</th>
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
                        <td onClick={() => removeFromCartHandler(item._id)}>
                          <AiOutlineDelete
                            size={28}
                            className="text-red-700  "
                          />{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="flex justify-end mr-4 ">
                <button
                  onClick={requisitionTypeHandler}
                  className="btn btn-primary  bg-slate-200 px-5 p-2 rounded-xl mt-3"
                >
                  {" "}
                  Continue Requisition
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
