import {
  Flex,
  Box,
  List,
  Icon,
  ListItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  ListIcon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  FaWalking,
  FaTrain,
  FaBiking,
  FaBus,
  FaRegHandPointRight,
  FaCarSide,
} from "react-icons/fa";

export const Histories = (props) => {
  const [groupedData, setGroupedData] = useState({});

  // 初回レンダリング時用
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    props.getHistories(token);
    // ASK props.getHistoriesが実行された後に実行する方法
  }, []);

  // 初回レンダリング時と質問後履歴更新時の対応用
  useEffect(() => {
    if (props.histories !== undefined) {
      const newData = props.histories.reduce(
        (acc, obj) => {
          const key = obj.question_uuid;
          if (!acc.hasOwnProperty(key)) {
            acc[key] = {
              question_uuid: key,
              place: [],
              time: [],
              way: [],
              suggest_place: [],
            };
          }

          // 定義していないkeyにpushしようとするとレンダリング止まってしまう。JSでいつエラーを吐いて止まってしまうのか・どういった書き方ならundefinedなどで見逃されるかの違いは抑えておきたい
          acc[key].place.push(obj.place);
          acc[key].time.push(obj.time);
          acc[key].way.push(obj.way);
          acc[key].suggest_place.push(obj.suggest_place);
          return acc;
        },

        // コールバックが初回実行時の初期値は{}
        {}
      );

      // TODO この辺りの話をまとめる
      // シャローコピーをして値を渡す必要がある理由
      // プリミティブタイプはメモリを別で確保するが、オブジェクトはメモリは別で確保せずに参照先がコピーされるから
      // newDataを展開しないとオブジェクトの値の入り方が1階層ずれてしまうので注意
      // オブジェクトのstateを更新する時は新しいオブジェクトがあっても大丈夫
      // 参考：https://zenn.dev/luvmini511/articles/722cb85067d4e9
      // 参考：https://devsakaso.com/react-usestate/
      setGroupedData({ ...newData, ...groupedData });
    }
  }, [props.histories]);

  const renderIcon = (value) => {
    switch (value) {
      case "徒歩":
        return <Icon as={FaWalking} color="green.500" />;
      case "電車":
        return <Icon as={FaTrain} color="green.500" />;
      case "自転車":
        return <Icon as={FaBiking} color="green.500" />;
      case "バス":
        return <Icon as={FaBus} color="green.500" />;
      case "車":
        return <Icon as={FaCarSide} color="green.500" />;
      default:
        return null; // 対応するアイコンがない場合はnullを返す
    }
  };

  return (
    <Flex justifyContent="cloumn" p={6} flexDirection="column">
      <Accordion>
        {true &&
          // ASK groupedDataは値ではなくstateでもつべきか？
          Object.values(groupedData)
            .slice(0, 5) //上限4つまでプルダウンは表示する
            .map((items) => (
              <AccordionItem key={items.question_uuid}>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {/* wayに合わせてアイコンを変化 */}
                    {renderIcon(items.way[0])}
                    {items.place[0]}から{items.time[0]}以内で{items.way[0]}
                    を使っていける
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <List>
                    {items.suggest_place.map((item) => (
                      <ListItem key={item}>
                        <Flex ml={6}>
                          <ListIcon
                            as={FaRegHandPointRight}
                            color="green.500"
                          />
                          {item}
                        </Flex>
                      </ListItem>
                    ))}
                  </List>
                </AccordionPanel>
              </AccordionItem>
            ))}
      </Accordion>
    </Flex>
  );
};
