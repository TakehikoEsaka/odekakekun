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
        timeout: 60000, // タイムアウト時間をミリ秒で指定
      })
      .then((res) => {
        console.log("res.data is ", res.data);

        if (res.data === null) {
          console.log("response is null !");

          // ASK message以外はdefault値を使おうと思っているが、その場合も記載は必要なのか？
          setSuggest({
            message: "エラーがおきました。もう一度やり直してください",
            suggest_place: {},
            suggest_description: {},
            suggest_distance: {},
          });
        } else {
          //ASK。以下でsetSuggest(...suggest, res.data)がダメな理由
          setSuggest({ message: null, ...res.data });
        }
      })
      .catch((error) => {
        // その他のエラーの場合の処理
        console.log("エラーが発生しました", error.message);
        if (error.code === "ECONNABORTED") {
          // タイムアウトエラーの場合の処理
          console.log("リクエストがタイムアウトしました");
          setSuggest({
            message:
              "ネットワークトラブルのため回答が出せませんでした。もう一度やり直すか暫くたってから再度お試し下さい。",
            suggest_place: {},
            suggest_description: {},
            suggest_distance: {},
          });
        }
      });
  };

  return { getSuggest, suggest };
};
