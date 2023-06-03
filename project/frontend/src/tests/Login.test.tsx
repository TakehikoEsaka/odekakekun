/* eslint-disable testing-library/no-debugging-utils */
import { render, screen, fireEvent } from "@testing-library/react";
import { Login } from "../pages/Login";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

test("render Home", () => {
  render(<Login />, { wrapper: BrowserRouter });

  // フォーム要素が存在することを確認
  const submitButton = screen.getByRole("button", { name: "ログイン" });
  const formInputs = screen.getAllByRole("group");
  expect(formInputs[0]).toBeInTheDocument();
  expect(formInputs[1]).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  // ボタンがクリック可能であることを確認
  fireEvent.click(submitButton);
});
