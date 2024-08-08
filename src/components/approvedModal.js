import { Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveApproveData } from "../redux/cartSlice";

const ApprovedModal = ({ showApprovedModal, setShowApprovedModal }) => {
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  const [comment, setComment] = useState(shippingAddress?.comment);
  const [reqBy, setReqBy] = useState(shippingAddress?.reqBy);
  const [approved, setApproved] = useState(shippingAddress?.approved);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(saveApproveData({ comment, reqBy, approved }));

    setShowApprovedModal(false);
    navigate("/placeorder");
  };
  return (
    <Modal
      type="add"
      open={showApprovedModal}
      onCancel={() => {
        setShowApprovedModal(false);
      }}
      footer={false}
    >
      <form layout="vertical" onSubmit={handleSubmit}>
        <div class="mb-6">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Requested By
          </label>
          <input
            autoComplete="off"
            type="text"
            name="name"
            value={reqBy}
            onChange={(e) => setReqBy(e.target.value)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Requested By"
          />
        </div>
        <div class="mb-6">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Approved By
          </label>
          <input
            autoComplete="off"
            type="text"
            name="name"
            value={approved}
            onChange={(e) => setApproved(e.target.value)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Approved By "
          />
        </div>
        <div class="mb-6">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Remarks
          </label>
          <textarea
            type="text"
            name="name"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Add Some Remarks "
          />
        </div>

        <div className="mt-4 flex justify-end mr-6">
          <div className="">
            <button className="btn btn-primary mt-4 px-6 bg-orange-400 text-gray-900 p-2 rounded-xl">
              CONTINUE
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ApprovedModal;
