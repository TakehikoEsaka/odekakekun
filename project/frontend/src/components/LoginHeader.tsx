import { Box, Flex, Spacer, useMediaQuery } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const LoginHeader = () => {
  const [isLargerThanLG] = useMediaQuery("(min-width: 62em)");
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      p={4}
      px={isLargerThanLG ? "16" : "6"}
    >
      <Link to="/">
        <Box fontWeight="bold" fontSize="xl">
          おでかけ君
        </Box>
      </Link>

      <Spacer />
    </Flex>
  );
};
