import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckSteps from "../../components/CheckSteps";
import { saveRequisitionMethod } from "../../redux/cartSlice";

const RequisitionType = () => {
  const [type1, saveTypeOne] = useState("FACTORY REQUISITION");
  const [type2, saveTypeTwo] = useState("PURCHASE REQUISITION");
  const [selectedRequisitionType, setSelectedRequisitionType] = useState(
    "FACTORY REQUISITION"
  );

  const cart = useSelector((state) => state.cart);
  const { requisitionSteps } = cart;
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [requisitionSteps, userInfo, navigate]);

  const handleSelectChange = (event) => {
    setSelectedRequisitionType(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Dispatch action to save the selected type
    dispatch(saveRequisitionMethod(selectedRequisitionType));

    if (selectedRequisitionType === "FACTORY REQUISITION") {
      navigate("/confirm-requisition");
    } else if (selectedRequisitionType === "PURCHASE REQUISITION") {
      navigate("/purchase-requisition");
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-4 py-3">
        <CheckSteps step1 step2 />

        <div>
          <h3>REQUISITION METHOD </h3>

          <form
            className="mt-1 flex flex-col space-y-3"
            onSubmit={submitHandler}
          >
            <div className="mb-4">
              <label
                htmlFor="requisitionType"
                className="text-lg font-medium text-slate-300 dark:text-gray-300"
              >
                Choose Requisition Type:
              </label>

              <select
                id="requisitionType"
                onChange={handleSelectChange}
                value={selectedRequisitionType}
                className="w-full py-2 px-3 mt-1 border border-gray-300 bg-white text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="FACTORY REQUISITION">FACTORY REQUISITION</option>
                <option value="PURCHASE REQUISITION">
                  PURCHASE REQUISITION
                </option>
              </select>
            </div>

            <button
              className="px-4 bg-blue-400 p-2 rounded-lg  w-[120px]"
              type="submit"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RequisitionType;
