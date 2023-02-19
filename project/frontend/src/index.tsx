import ReactDOM from "react-dom";
import { App } from "./App";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/styles/style";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </ChakraProvider>,
  document.getElementById("root")
);
