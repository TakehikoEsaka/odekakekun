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
    // fastAPIで出てきたリクエスト内容
    // http://localhost:8000/suggest?place=%E9%AB%98%E5%86%86%E5%AF%BA&way=%E5%BE%92%E6%AD%A9&time=1%E6%99%82%E9%96%93&id=11
    axios
      .get("http://odekakekun-backend_container/suggest&query=test")
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
