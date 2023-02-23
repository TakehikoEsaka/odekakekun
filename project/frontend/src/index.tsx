import ReactDOM from "react-dom";
import { Home } from "./pages/Home";

import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/styles/style";
import reportWebVitals from "./reportWebVitals";

import { NotFound } from "./pages/NotFound";

import { Route, BrowserRouter, Routes, Link } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <nav>
          <ul>
            <li>
              <Link to="login">Login</Link>
            </li>
            <li>
              <Link to="home">Home</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<div />} />
          <Route path="home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </RecoilRoot>
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
