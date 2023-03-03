import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Flex,
  Container,
} from "@chakra-ui/react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //   const handleSubmit = (e) => {
  //     event.preventDefault();
  //     setIsLoading(true);

  //     // TODO: ログイン処理を実装

  //     setIsLoading(false);
  //   };

  return (
    <Container display="flex" justifyContent="center" alignItems="center">
      <Box>
        <form
        //   onSubmit={handleSubmit}
        >
          <Stack spacing={3}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>パスワード</FormLabel>
              <Input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isLoading}
              loadingText="送信中..."
            >
              ログイン
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};
