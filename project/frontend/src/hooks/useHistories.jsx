import axios from "axios";
import { useState } from "react";

export const useHistories = () => {
  const [histories, setHistories] = useState();

  const getHistories = async (token) => {
    console.log(token);
    try {
      const response = await axios.get("http://localhost:80/get_all_suggest", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHistories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return { histories, getHistories };
};
