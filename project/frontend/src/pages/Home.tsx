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
  const { getcheckLogin } = useLogin();

  // ASK なぜuseEffect入れているのに複数回レンダリングされているのか
  // セッションが切れている場合はログアウトにする
  // TODO getCheckLoginが終わったらレンダリングに入るようにする
  // ASK useEffectはこれを入れないと初回レンダリング時にエラーになってしまうのか？
  useEffect(() => {
    const checkLogin = async () => {
      await getcheckLogin();

      // 非同期処理は並列関係にあるものに対してかかる。この場合以下のconsole.logはcheckLogin変数定義の外に書いた場合はconsole.logがgetcheckLoginよりも先に実行されることもあったので注意
      console.log(
        "checked result is ",
        Boolean(localStorage.getItem("login_state"))
      );
    };

    checkLogin();
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

      {Object.values(suggest.suggest_place).length > 0 ? (
        <Results />
      ) : suggest.message != null ? (
        <Flex
          px={4}
          py={4}
          flexDirection="column"
          alignItems="center"
          color="red.300"
        >
          <>{suggest.message}</>
        </Flex>
      ) : null}

      {Boolean(localStorage.getItem("login_state")) === true ? (
        <Histories getHistories={getHistories} histories={histories} />
      ) : (
        <Flex
          px={4}
          py={4}
          flexDirection="column"
          alignItems="center"

          // TODO スタイルを調整する
        >
          <>ログインすると履歴が見えます</>
        </Flex>
      )}
    </>
  );
};
