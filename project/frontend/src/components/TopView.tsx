import {
  Button,
  Flex,
  Box,
  Image,
  useMediaQuery,
  Text,
} from "@chakra-ui/react";

type PropType = {
  getSuggest: (wishVariables: string) => void;
};

export const TopView = (props: PropType) => {
  const [isLargerThanLG] = useMediaQuery("(min-width: 62em)");

  const trySuggest = () => {
    // Reactの基本だけど子どもから親のstateを書き換えれる
    props.getSuggest("test");
  };

  return (
    <Flex
      alignItems="center" // 縦方向に揃える
      // backgroundPosition="center"
      // backgroundRepeat="no-repeat"
      backgroundColor="#f7f5f4"
      w="100%"
      px={isLargerThanLG ? "16" : "6"}
      py="16"
      // minHeight="90vh"
      // justifyContent="space-between"
      // flexDirection={isLargerThanLG ? "row" : "column"}
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
