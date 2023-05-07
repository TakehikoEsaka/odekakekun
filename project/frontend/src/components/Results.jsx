import {
  Flex,
  Box,
  useMediaQuery,
  List,
  Link,
  ListItem,
  Text,
  ListIcon,
} from "@chakra-ui/react";
import { FaWalking, FaTrain, FaBus } from "react-icons/fa";
import { useRecoilValue } from "recoil";

import { questionState } from "../store/questionState";
import { suggestState } from "../store/suggestState";

export const Results = () => {
  const [isLargerThanLG] = useMediaQuery("(min-width: 62em)");

  const question = useRecoilValue(questionState);
  const suggest = useRecoilValue(suggestState);

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
                <ListIcon as={FaWalking} color="green.500" />
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
