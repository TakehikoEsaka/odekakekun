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
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("string@gmail.com");
  const [password, setPassword] = useState("string");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [redirectTo, setRedirectTo] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    console.log("hi");
    event.preventDefault();
    setIsLoading(true);

    // OAuth2はJSONではなくform dataを使うので注意
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    // ここで投げるLoginの型が違うのか認証が通らない
    axios
      .post("http://localhost:80/token", formData)
      .then((response) => {
        console.log(response);
        localStorage.setItem("access_token", response.data.access_token);
        setRedirectTo("/home");
      })
      .catch((error) => {
        // ここにstateを無限ループしないように対応を入れる
        setError("メールアドレスまたはパスワードが違います");
      });

    setIsLoading(false);

    // リダイレクト先が設定されている場合、リダイレクトする
    if (redirectTo) {
      navigate(redirectTo);
    }
  };

  return (
    <Container
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box display="flex">
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
      {error && (
        <Alert status="error" marginTop={3} size="xs">
          <AlertIcon />
          {error}
        </Alert>
      )}
    </Container>
  );
};
