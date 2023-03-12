// 型ファイルがないと怒られる時は@typesを入れておく
import { useState } from "react";
import { useRecoilValue } from "recoil";

import { TopView } from "../components/TopView";
import { WishVariables } from "../components/WishVariables";
import { Results } from "../components/Results";
import { Histories } from "../components/Histories";
import { useSuggest } from "../hooks/useSuggest";
import { useHistories } from "../hooks/useHistories";
import { loginState } from "../store/loginState";

export const Home = () => {
  // 質問：型ファイルはここにも記載するべきなのか、そもそも子どものファイルと親ファイルのどちらにも記載する必要があるのか
  const { getSuggest, suggest } = useSuggest();
  const { getHistories, histories } = useHistories();
  const [showResults, setShowResults] = useState(true);

  return (
    <>
      <TopView getSuggest={getSuggest} />
      <WishVariables getSuggest={getSuggest} />

      {/* ここをgetSuggestした時にshowResultsのON/OFFを入れる */}
      {showResults && <Results />}

      {useRecoilValue(loginState) === true ? (
        <Histories getHistories={getHistories} histories={histories} />
      ) : (
        <>ログインすると履歴が見えます</>
      )}
    </>
  );
};
