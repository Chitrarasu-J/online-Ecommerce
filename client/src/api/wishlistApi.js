import axios from "./axiosClient";

// Add product to wishlist
export const addToWishlist = async (productId) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    "/wishlist",
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// Get wishlist items
export const getWishlist = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get("/wishlist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// Remove from wishlist
export const removeFromWishlist = async (productId) => {
  const token = localStorage.getItem("token");

  const res = await axios.delete(`/wishlist/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
