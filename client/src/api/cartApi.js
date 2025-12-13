import axios from "axios";

const API = "http://localhost:5000/api/cart";

export const addToCart = (productId) => {
  const token = localStorage.getItem("token");

  return axios.post(
    `${API}/add`,
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
