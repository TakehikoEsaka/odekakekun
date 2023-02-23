import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/styles/style";
import reportWebVitals from "./reportWebVitals";
import { RouteConfig } from "./RouteConfig";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <RecoilRoot>
      <RouteConfig />
    </RecoilRoot>
  </ChakraProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
