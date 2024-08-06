import axios from "axios";
import { PRODUCTS_URL } from "../redux/constants";

export const createProductService = async (formData) => {
  const response = await axios.post(`${PRODUCTS_URL}/create`, formData);

  return response.data;
};

export const getProductService = async (id) => {
  const response = await axios.get(`${PRODUCTS_URL}/${id}`);

  return response.data;
};
