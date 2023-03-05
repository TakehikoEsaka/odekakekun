// 型ファイルがないと怒られる時は@typesを入れておく
import { useState } from "react";

import { TopView } from "../components/TopView";
import { WishVariables } from "../components/WishVariables";
import { Results } from "../components/Results";
import { Histories } from "../components/Histories";
import { useSuggest } from "../hooks/useSuggest";
import { useHistories } from "../hooks/useHistories";

export const Home = () => {
  // 質問：型ファイルはここにも記載するべきなのか、そもそも子どものファイルと親ファイルのどちらにも記載する必要があるのか
  const { getSuggest, suggest } = useSuggest();
  const { getHistories, histories } = useHistories();

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("access_token")
  );

  return (
    <>
      <TopView getSuggest={getSuggest} />
      <WishVariables getSuggest={getSuggest} />
      <Results suggest={suggest} />
      {loggedIn ? <>{loggedIn}</> : <>hi</>}
      <Histories getHistories={getHistories} histories={histories} />
    </>
  );
};
