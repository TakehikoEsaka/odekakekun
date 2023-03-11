import { Box, Flex, Spacer, Button, useMediaQuery } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "../store/loginState";

// import { UserContext } from "../providers/UserProvider";

export const TopHeader = () => {
  const [isLargerThanLG] = useMediaQuery("(min-width: 62em)");

  const tryLogout = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  };

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

      {useRecoilValue(loginState) === true ? (
        <Button variant="solid" onClick={tryLogout}>
          ログアウト
        </Button>
      ) : (
        <Link to="login">
          <Button colorScheme="blue" variant="solid">
            ログイン
          </Button>
        </Link>
      )}
    </Flex>
  );
};
