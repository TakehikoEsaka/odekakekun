import { Link } from "react-router-dom";
import { Container, Box, Text, VStack } from "@chakra-ui/react";

export const NotFound = () => {
  return (
    <>
      <VStack>
        <Container color="black" p={6} textAlign="center">
          <Box as="span" fontWeight="bold" fontSize="lg">
            お探しのページは見つかりませんでした。
          </Box>
        </Container>
        <Container textAlign="center">
          <Link to="home">
            <Box>
              <Text as="u" color="blue">
                こちら
              </Text>
              から質問ができます
            </Box>
          </Link>
        </Container>
      </VStack>
    </>
  );
};
