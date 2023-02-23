import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { NotFound } from "./pages/NotFound";
import { Route, BrowserRouter, Routes } from "react-router-dom";

export const RouteConfig = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<div />} />
        <Route path="home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
