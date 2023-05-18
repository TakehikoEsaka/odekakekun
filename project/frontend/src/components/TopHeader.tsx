import { Box, Flex, Spacer, Button, useMediaQuery } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const TopHeader = () => {
  const [isLargerThanLG] = useMediaQuery("(min-width: 62em)");

  const tryLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("login_state");
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
      <Link to="/home" replace>
        <Box fontWeight="bold" fontSize="xl">
          おでかけ君
        </Box>
      </Link>

      <Spacer />

      {/* ASK RecoilValueはページロード時にリセットされてしまうのか？それとも維持されるのか？ */}
      {localStorage.getItem("login_state") === "true" ? (
        <Button variant="solid" onClick={tryLogout}>
          ログアウト
        </Button>
      ) : (
        <Link to="/login" replace>
          <Button colorScheme="blue" variant="solid">
            ログイン
          </Button>
        </Link>
      )}
    </Flex>
  );
};
