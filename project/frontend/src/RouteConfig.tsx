import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { CreateUser } from "./pages/CreateUser";
import { TopHeader } from "./components/TopHeader";
import { LoginHeader } from "./components/LoginHeader";
import { NotFound } from "./pages/NotFound";
import { Route, BrowserRouter, Routes } from "react-router-dom";

export const RouteConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<TopHeader />} />
        <Route path="create_user" element={<LoginHeader />} />
        <Route path="login" element={<LoginHeader />} />
        <Route path="home" element={<TopHeader />} />
        <Route path="*" element={<TopHeader />} />
      </Routes>
      <Routes>
        <Route index element={<Home />} />
        <Route path="create_user" element={<CreateUser />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
