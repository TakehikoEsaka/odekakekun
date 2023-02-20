import axios, { AxiosResponse } from "axios";
import { useState } from "react";

type TodoType = {
  userId: Number;
  id: Number;
  title: string;
  completed: Boolean;
};

type SuggestHookReturnType = {
  // 質問ここでT型など変数名を具体宣言せずに後で使う方法はあるのか
  getSuggest: (wishVariables: string) => void;
  suggest: string;
};

export const useSuggest = (): SuggestHookReturnType => {
  // stateに型を定義するのはこうする
  const [suggest, setSuggest] = useState<string>("Smple Suggest from Chat-GPT");

  const getSuggest = (wishVariables : string) => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos/")
      // Axiosのresponceの型はAxiosResponse型をimportして使う
      .then((res: AxiosResponse<Array<TodoType>>) => {
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
