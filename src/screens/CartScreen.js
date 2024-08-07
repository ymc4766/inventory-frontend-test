import React from "react";
import { useSelector } from "react-redux";

const CartScreen = () => {
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  return <div>CartScreen</div>;
};

export default CartScreen;
