// 型ファイルがないと怒られる時は@typesを入れておく
import { TopView } from "../components/TopView";
import { WishVariables } from "../components/WishVariables";
import { Results } from "../components/Results";
import { useSuggest } from "../hooks/useSuggest";

export const Home = () => {
  // 質問：型ファイルはここにも記載するべきなのか、そもそも子どものファイルと親ファイルのどちらにも記載する必要があるのか
  const { getSuggest, suggest } = useSuggest();

  return (
    <>
      <TopView getSuggest={getSuggest} />
      <WishVariables getSuggest={getSuggest} />
      <Results suggest={suggest} />
    </>
  );
};
