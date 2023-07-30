import { useState } from "react";

import axiosInstance from "../axios";

export const useHistories = () => {
  const [histories, setHistories] = useState();

  const token = localStorage.getItem("access_token")
    ? localStorage.getItem("access_token")
    : "None";

  const getHistories = async () => {
    try {
      const response = await axiosInstance.get("/get_all_suggest", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHistories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return { histories, getHistories };
};
