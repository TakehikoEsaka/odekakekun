import { useRecoilState } from "recoil";

import axiosInstance from "../axios";
import { suggestState } from "../store/suggestState";

export const useSuggest = () => {
  const [suggest, setSuggest] = useRecoilState(suggestState);

  const token = localStorage.getItem("access_token")
    ? localStorage.getItem("access_token")
    : "None";

  const getSuggest = async (place, time, way) => {
    await axiosInstance
      .post("/suggest", null, {
        params: {
          place: place,
          time: time,
          way: way,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      })
      .then((res) => {
        console.log("res.data is ", res.data);

        //TODO レスポンスの型定義をつけておく。もし違うレスポンスが帰ってきた時ようにエラー文言をつける
        //TODO 次のエラーが起こったらhooksの処理を中断する。openai.error.APIConnectionError: Error communicating with OpenAI: ('Connection aborted.', OSError(65, 'No route to host')
        //ASK。以下でsetSuggest(...suggest, res.data)がダメな理由
        setSuggest(res.data);

        console.log("suggest from backend is ", suggest);
      });
  };

  return { getSuggest, suggest };
};
