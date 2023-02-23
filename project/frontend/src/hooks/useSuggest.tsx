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

// dockerの環境に合わせて環境変数でURLは持っておいた方がよい
// axiosで受けておるデータ型が間違っているときにエラーを出したい
// useStateで肩が間違っているときにエラーを出力したい
export const useSuggest = (): SuggestHookReturnType => {
  // stateに型を定義するのはこうする
  const [suggest, setSuggest] = useState<string>("Default Value");

  const getSuggest = (wishVariables : string) => {
    axios
    .get("http://localhost:80")
    .then((res) => {
			setSuggest("Updated");
		})
    .catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              // これがエラーを起こす理由を明らかにしたい
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
  }

  return { getSuggest, suggest };
};
