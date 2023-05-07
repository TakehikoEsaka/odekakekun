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
import { loginState } from "../store/loginState";
import { chatGPTLoadingState } from "../store/chatGPTLoadingState";

export const Home = () => {
  const [isLargerThanLG] = useMediaQuery("(min-width: 62em)");
  const { getSuggest, suggest } = useSuggest();
  const { getHistories, histories } = useHistories();
  const [login, setLogin] = useRecoilState(loginState);

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      setLogin(true);
    }
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

      {useRecoilValue(loginState) === true ? (
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
