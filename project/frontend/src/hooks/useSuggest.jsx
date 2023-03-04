// import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import axios from "../AxiosBaseService";

export const useSuggest = () => {
  // stateに型を定義するのはこうする
  const [suggest, setSuggest] = useState("Smple Suggest from Chat-GPT");

  const getSuggest = (wishVariables) => {
    // : AxiosResponse<Array<TodoType>>
    console.log("hi");
    axios
      .get("/")
      // Axiosのresponceの型はAxiosResponse型をimportして使う
      .then((res) => {
        console.log(wishVariables);

        var id = 0;
        if (typeof wishVariables === "undefined") {
          id = Math.floor(Math.random() * 100);
        } else {
          id = 0;
        }

        setSuggest(res.data[id].title);
      });
  };

  return { getSuggest, suggest };
};
