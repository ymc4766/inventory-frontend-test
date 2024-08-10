import { Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveApprovedData } from "../redux/cartSlice";

const ApprovedModal = ({ showApprovedModal, setShowApprovedMadal }) => {
  const { approvedData } = useSelector((state) => state.cart);

  const [reqBy, setReqBy] = useState(approvedData?.reqBy);
  const [approvedBy, setApprovedBy] = useState(approvedData?.approvedBy);
  const [comment, SetComment] = useState(approvedData?.comment);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveApprovedData({ reqBy, approvedBy, comment }));
    navigate("/placeorder");
  };

  return (
    <Modal
      okType="add"
      open={showApprovedModal}
      footer={false}
      onCancel={() => {
        setShowApprovedMadal(false);
      }}
    >
      <div>
        <h1>Approved Modal</h1>
      </div>
      <form onSubmit={submitHandler}>
        <div className="mb-3 mt-2">
          <label className="block text-sm font-medium text-gray-900 ">
            Requested By
          </label>
          <input
            name="name"
            type="text"
            onChange={(e) => setReqBy(e.target.value)}
            value={reqBy}
            className="inputForm"
            placeholder="Requested By"
          />
        </div>
        <div className="mb-3 mt-2">
          <label className="block text-sm font-medium text-gray-900 ">
            Approved By
          </label>
          <input
            name="approvedBy"
            type="text"
            onChange={(e) => setApprovedBy(e.target.value)}
            value={approvedBy}
            className="inputForm"
            placeholder="Approved By"
          />
        </div>{" "}
        <div className="mb-3 mt-2">
          <label className="block text-sm font-medium text-gray-900 ">
            Leave Comment
          </label>
          <input
            name="comment"
            type="text"
            onChange={(e) => SetComment(e.target.value)}
            value={comment}
            className="inputForm"
            placeholder="Add Some Comment "
          />
        </div>
        <div className="mt-4 flex justify-end mr-5">
          <button
            type="submit"
            className="px-3 p-2 bg-orange-500 rounded-2xl text-slate-50"
          >
            Continue
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ApprovedModal;
