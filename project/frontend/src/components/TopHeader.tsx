import { Box, Flex, Spacer, Button, useMediaQuery } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const TopHeader = () => {
  const [isLargerThanLG] = useMediaQuery("(min-width: 62em)");
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      p={4}
      px={isLargerThanLG ? "16" : "6"}
    >
      <Box fontWeight="bold" fontSize="xl">
        <Link to="/">おでかけ君</Link>
      </Box>
      <Spacer />
      <Button colorScheme="blue" variant="solid">
        <Link to="login">ログイン</Link>
      </Button>
    </Flex>
  );
};
