import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Select } from "antd";
import { BiCart } from "react-icons/bi";
import { getProduct } from "../../redux/productSlice";
import { addToCart } from "../../redux/cartSlice";

const { Option } = Select;

const ProductDetails = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const { product, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const selectRef = useRef();
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      const parsedValue = parseInt(inputValue, 10);

      if (parsedValue && parsedValue > 0 && parsedValue <= product.stock) {
        setQty(parsedValue);
      }
    }
  };

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch]);

  const addRequisitionHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/store-requisition");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-3xl font-bold mb-6 text-center">ASSET DETAIL</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-500 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl text-white font-semibold mb-4">
            {product?.name}
          </h1>
          <p className="text-gray-300 text-lg leading-6 mb-4">
            {product?.description}
          </p>
          <p className="text-gray-300 text-lg mb-2">
            {product?.manufacturer && (
              <>
                <span className="font-semibold">Manufacturer:</span>{" "}
                {product?.manufacturer}
              </>
            )}
          </p>
          <p className="text-gray-300 text-lg mb-2">
            {product?.supplier && (
              <>
                <span className="font-semibold">Supplier:</span>{" "}
                {product?.supplier}
              </>
            )}
          </p>
          <p className="text-gray-300 text-lg mb-2">
            <span className="font-semibold">Price:</span> ${product?.price}
          </p>
          {/* // input qty */}
          <div>
            <div className=" py-3">
              <h3>SElect QTY</h3>
            </div>
            <div className="flex items-center space-x-4">
              <input
                placeholder=" ADD  QTY  HERE"
                value={inputValue}
                onChange={handleInputChange}
                ref={selectRef}
                onKeyPress={handleInputKeyPress}
                className="text-gray-700 outline-none p-1 rounded-2xl"
              />
              <Select
                onChange={(value) => setQty(value)}
                value={qty}
                className="w-[100%]"
              >
                {[
                  ...Array(product.stock)
                    .keys()
                    .map((x) => (
                      <Option valu={x + 1} key={x + 1}>
                        {x + 1}
                      </Option>
                    )),
                ]}
              </Select>
            </div>
          </div>
        </div>
        <div className="bg-gray-600 p-6 rounded-lg shadow-lg">
          <div className="text-white">
            <p className="text-lg font-semibold mb-2">Stock Information:</p>
            <p className="text-md mb-4">
              {product?.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
            <p className="text-md mb-4">
              <span className="font-semibold">Stock:</span> {product?.stock}
            </p>
            <p className="text-md mb-4">
              <span className="font-semibold">Quantity:</span> {product?.qty}
            </p>
            <p className="text-md mb-4">
              <span className="font-semibold">Unit of Measure:</span>{" "}
              {product?.uom}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full text-left my-4">
        <button
          className="flex justify-center items-center gap-2 w-full py-3 px-4 bg-red-500 text-white text-md font-bold border border-red-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-red-500 lg:m-0 md:px-6"
          title="Confirm Order"
          onClick={addRequisitionHandler}
          disabled={product?.stock === 0}
        >
          <span>Add Requisition</span>
          <BiCart size={28} />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
