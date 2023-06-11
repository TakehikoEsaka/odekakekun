import { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import axiosInstance from "../axios";

export const CreateUser = () => {
  const [email, setEmail] = useState("testuser@gmail.com");
  const [password, setPassword] = useState("testpass");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const [redirectTo, setRedirectTo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(redirectTo);
  }, [redirectTo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // OAuth2はJSONではなくFormDataを使う仕様なので注意
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    if (password !== confirmPassword) {
      setError("パスワードが一致しません");
    } else {
      try {
        const response = await axiosInstance
          .post("/create_user", formData)
          .catch((error) => {
            setError("既にアカウントが存在しています");
          });
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("login_state", "true");
        setRedirectTo("/home");
      } catch (e) {
        console.log(e);
      }
    }

    setIsLoading(false);
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
            </FormControl>

            <FormControl isRequired>
              <FormLabel>パスワード</FormLabel>
              <Input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>パスワード(確認)</FormLabel>
              <Input
                type="password"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isLoading}
              loadingText="送信中..."
            >
              アカウント作成
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
