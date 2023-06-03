/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import { Login } from "./pages/Login";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

test("render Home", () => {
  render(<Login />, { wrapper: BrowserRouter });
});
