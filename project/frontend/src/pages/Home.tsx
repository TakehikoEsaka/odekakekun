// 型ファイルがないと怒られる時は@typesを入れておく
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Progress, Flex, useMediaQuery } from "@chakra-ui/react";

import { TopView } from "../components/TopView";
import { WishVariables } from "../components/WishVariables";
import { Results } from "../components/Results";
import { Histories } from "../components/Histories";
import { useSuggest } from "../hooks/useSuggest";
import { useHistories } from "../hooks/useHistories";
import { useLogin } from "../hooks/useLogin";
import { chatGPTLoadingState } from "../store/chatGPTLoadingState";

export const Home = () => {
  const [isLargerThanLG] = useMediaQuery("(min-width: 62em)");
  const { getSuggest, suggest } = useSuggest();
  const { getHistories, histories } = useHistories();
  const { checkLogin, getcheckLogin } = useLogin();

  // ASK なぜuseEffect入れているのに複数回レンダリングされているのか
  useEffect(() => {
    getcheckLogin();
  }, []);

  return (
    <>
      <TopView getSuggest={getSuggest} getHistories={getHistories} />
      <WishVariables getSuggest={getSuggest} getHistories={getHistories} />

      {useRecoilValue(chatGPTLoadingState) && (
        <Flex
          p={6}
          w="100%"
          px={isLargerThanLG ? "16" : "6"}
          py="16"
          flexDirection="column"
        >
          <Progress size="md" isIndeterminate colorScheme="teal" />
        </Flex>
      )}

      {Object.values(suggest.suggest_place).length > 0 && <Results />}

      {Boolean(localStorage.getItem("login_state")) === true ? (
        <Histories getHistories={getHistories} histories={histories} />
      ) : (
        <Flex
        // TODO スタイルを調整する
        >
          <>ログインすると履歴が見えます</>
        </Flex>
      )}
    </>
  );
};
