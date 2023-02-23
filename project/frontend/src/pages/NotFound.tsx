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
          <Box>
            <Text as="u" color="blue">
              <Link to="home">こちら</Link>
            </Text>
            から質問ができます
          </Box>
        </Container>
      </VStack>
    </>
  );
};
