import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { suggestState } from "../store/suggestState";

const sampleSuggest = [
  {
    place: "中野通り商店街",
    description:
      "高円寺駅から中野通り商店街までは自転車で約10分程度です。商店街の両側には桜の木が並び、春には美しい桜並木が楽しめます。商店街には多くの飲食店や雑貨店があり、散策がてら訪れるのもおすすめです。",
  },
  {
    place: "新宿御苑	",
    description:
      "高円寺駅から新宿御苑までは自転車で約15分程度です。新宿御苑は、都内でも有数の桜の名所のひとつで、春には多くの人で賑わいます。お花見スポットとして知られる「水辺の広場」や、「桜山」など、見どころもたくさんあります。入場料が必要ですが、桜の美しさを満喫できます。",
  },
  {
    place: "井の頭恩賜公園",
    description:
      "高円寺駅から井の頭恩賜公園までは自転車で約20分程度です。公園内には、大小様々な池が点在し、桜並木も美しいスポットです。また、公園内には動物園もあり、動物たちと触れ合いながらのんびり過ごすこともできます。桜の季節には、公園内のさまざまな場所で桜を楽しめます。",
  },
];

export const useSuggest = () => {
  // stateに型を定義するのはこうする
  const [suggest, setSuggest] = useRecoilState(suggestState);

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

        //TODO ここをサンプルデータからChatGPTの結果に変える
        // setSuggest(res.data);
        setSuggest(sampleSuggest);

        console.log(suggest);
      });
  };

  return { getSuggest, suggest };
};
