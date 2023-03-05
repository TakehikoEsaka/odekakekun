import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Container,
} from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";

export const Login = () => {
  const [email, setEmail] = useState("sfa@gmail.com");
  const [password, setPassword] = useState("fasd");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("defaut error message");

  // const formData = new FormData();
  // // OAuth2 expects form data, not JSON data
  // formData.append("username", email);
  // formData.append("password", password);

  const handleSubmit = async (event) => {
    console.log("hi");
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    // ここで投げるLoginの型が違うのか認証が通らない
    axios
      .post("http://localhost:80/token", formData)
      .then((response) => {
        // 成功時の処理
        console.log(response);
      })
      .catch((error) => {
        // エラー時の処理
        console.log(error);
      });

    setIsLoading(false);
  };

  return (
    <Container display="flex" justifyContent="center" alignItems="center">
      <Box>
        <form onSubmit={handleSubmit}>
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

            {error && <p>{error}</p>}
            <p>{email}</p>
            <p>{password}</p>
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
