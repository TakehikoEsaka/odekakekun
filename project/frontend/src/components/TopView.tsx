import {
  Button,
  Flex,
  Box,
  Image,
  useMediaQuery,
  Text,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { chatGPTLoadingState } from "../store/chatGPTLoadingState";

type PropType = {
  getSuggest: (place: string, hour: string, way: string) => void;
  getHistories: () => void;
};

export const TopView = (props: PropType) => {
  const [isLargerThanLG] = useMediaQuery("(min-width: 62em)");

  const trySuggest = () => {
    // ASK フォームの値をどうやってとってくるか
    props.getSuggest("高円寺", "1時間", "自転車");
    props.getHistories();
  };

  return (
    <Flex
      alignItems="center" // 縦方向に揃える
      backgroundColor="#f7f5f4"
      w="100%"
      px={isLargerThanLG ? "16" : "6"}
      py="16"
    >
      <Box mr={isLargerThanLG ? "6" : "0"} w={isLargerThanLG ? "60%" : "80%"}>
        <Text
          fontSize={isLargerThanLG ? "5xl" : "4xl"}
          fontWeight="bold"
          mb="4"
        >
          行きたい場所がすぐ見つかる
        </Text>

        <Text mb="6" fontSize={isLargerThanLG ? "lg" : "base"} opacity={0.7}>
          場所・所要時間・交通手段を指定するだけで <br />
          行きたい場所が簡単に見つかる！
        </Text>

        <Button
          w="200px"
          colorScheme="blue"
          variant="solid"
          h="50px"
          size={isLargerThanLG ? "lg" : "md"}
          mb={isLargerThanLG ? "0" : "10"}
          onClick={trySuggest}
          isDisabled={useRecoilValue(chatGPTLoadingState)}
        >
          まずは試してみる
        </Button>
      </Box>
      <Flex w={isLargerThanLG ? "10%" : "20%"} justifyContent="center">
        <Image
          boxSize="100%"
          alt="walking man gif"
          src="https://media2.giphy.com/media/ZIu85AaVBfGKmgDreB/giphy.gif?cid=ecf05e477vjzk73sxyfodfknh4uvt93zzoo9zzuf2tzq3x2y&rid=giphy.gif&ct=s"
        ></Image>
      </Flex>
    </Flex>
  );
};
