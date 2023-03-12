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
  const question = useRecoilValue(questionState);
  const suggest = useRecoilValue(suggestState);

  const [isLargerThanLG] = useMediaQuery("(min-width: 62em)");

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

      <Flex px={4} py={4}>
        {suggest.length > 1 && (
          <List>
            {suggest.map((item) => (
              <ListItem>
                <ListIcon as={FaWalking} color="green.500" />
                <Link color="teal.500" href="#">
                  {item.place}
                </Link>
                <Text mb={4} fontSize="base">
                  {item.description}
                </Text>
              </ListItem>
            ))}
          </List>
        )}
      </Flex>
    </Flex>
  );
};
