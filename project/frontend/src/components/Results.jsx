import {
  Flex,
  Box,
  useMediaQuery,
  List,
  Link,
  ListItem,
  Text,
  Icon,
} from "@chakra-ui/react";
import { FaWalking, FaTrain, FaBiking, FaBus, FaCarSide } from "react-icons/fa";
import { useRecoilValue } from "recoil";

import { questionState } from "../store/questionState";
import { suggestState } from "../store/suggestState";

export const Results = () => {
  const [isLargerThanLG] = useMediaQuery("(min-width: 62em)");

  const question = useRecoilValue(questionState);
  const suggest = useRecoilValue(suggestState);

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
    <Flex
      p={6}
      w="100%"
      px={isLargerThanLG ? "16" : "6"}
      py="16"
      flexDirection="column"
    >
      <Box height="5vh" color="gray.600" fontSize="base">
        {question.place}から{question.hour}以内で{question.way}
        を使っていけるおすすめの場所はこちらです
      </Box>

      <Flex px={4} py={4} flexDirection="column">
        {Array(Object.values(suggest.suggest_place).length)
          .fill(null)
          .map((_, index) => (
            <List>
              <ListItem>
                {renderIcon(question.way)}
                {/* <ListIcon as={FaWalking} color="green.500" /> */}

                <Link color="teal.500" href="#">
                  {suggest.suggest_place[index]}
                </Link>
                <Text mb={4} fontSize="base">
                  {suggest.suggest_description[index]}
                </Text>
              </ListItem>
            </List>
          ))}
      </Flex>
    </Flex>
  );
};
