import React from "react";
import { Link } from "react-router-dom";

const CheckSteps = ({ step1, step2 }) => {
  return (
    <nav className="mt-12 items-center ">
      <div className="flex items-center space-x-3">
        {step1 ? (
          <Link to="/login">Sign in</Link>
        ) : (
          <Link className="disabled">Sign in</Link>
        )}{" "}
        {step2 ? (
          <Link to="/requisition-type">Order Requisition </Link>
        ) : (
          <Link disapled className="text-gray-400 cursor-not-allowed">
            ORDER REQUISITION
          </Link>
        )}
      </div>
    </nav>
  );
};

export default CheckSteps;
