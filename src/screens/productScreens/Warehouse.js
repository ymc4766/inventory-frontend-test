import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../redux/productSlice";

const Warehouse = () => {
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    if (isSuccess) {
      toast.success("products render Successfuly");
    }
  }, [isSuccess]);

  return (
    <div className="product-list w-full mt-10 px-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">List Inventory</h1>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
          Create Asset
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>{message}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white text-gray-800">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Category</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Stock</th>
                <th className="py-2 px-4 border">Supplier</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products?.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border">{product.name}</td>
                    <td className="py-2 px-4 border">{product.category}</td>
                    <td className="py-2 px-4 border">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border">{product.stock}</td>
                    <td className="py-2 px-4 border">{product.supplier}</td>
                    <Link to={`/asset/${product._id}`}>
                      <td className="py-2 px-4 border">View</td>
                    </Link>{" "}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* <CreateProduct showModal={isModalVisible} closeModal={closeModal} /> */}
      {/* <CreateProduct showModal={showModal} closeModal={closeModal} /> */}
    </div>
  );
};

export default Warehouse;
