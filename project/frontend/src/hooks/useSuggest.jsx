import axios, { AxiosResponse } from "axios";
import { useState } from "react";

export const useSuggest = () => {
  // stateに型を定義するのはこうする
  const [suggest, setSuggest] = useState("Smple Suggest from Chat-GPT");

  const token = localStorage.getItem("access_token")
    ? localStorage.getItem("access_token")
    : "None";

  const getSuggest = async (question) => {
    await axios
      .post("http://localhost:80/suggest", null, {
        params: {
          question: question,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setSuggest(res.data);
      });
  };

  return { getSuggest, suggest };
};
