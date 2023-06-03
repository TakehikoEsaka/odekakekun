import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { Home } from "../pages/Home";

test("renders Home component", () => {
  render(
    <RecoilRoot>
      <Home />
    </RecoilRoot>
  );

  // TODO 以下の内容でテストコードを書いておく

  // TopView componentが表示されていることを確認
  expect(screen.getByTestId("top-view")).toBeInTheDocument();

  // WishVariables componentが表示されていることを確認
  expect(screen.getByTestId("wish-variables")).toBeInTheDocument();

  // chatGPTLoadingStateがtrueの場合、Progressコンポーネントが表示されていることを確認
  expect(screen.getByTestId("progress")).toBeInTheDocument();

  // 予測ボタンを押した時にボタンが押せなくなってること

  // 推論ボタンを押した時にレスポンスのモックを返して表示がきちんとされているか確認すること

  // chatGPTLoadingStateがfalseでsuggest.suggest_placeが存在する場合、Resultsコンポーネントが表示されていることを確認
  // そうでない場合、suggest.messageが存在する場合、メッセージが表示されていることを確認
  if (!screen.getByTestId("progress") && screen.getByTestId("results")) {
    expect(screen.getByTestId("results")).toBeInTheDocument();
  } else if (screen.getByTestId("suggest-message")) {
    expect(screen.getByTestId("suggest-message")).toBeInTheDocument();
  }

  // login_stateが"true"の場合、Historiesコンポーネントが表示されていることを確認
  // そうでない場合、ログインメッセージが表示されていることを確認
  if (localStorage.getItem("login_state") === "true") {
    expect(screen.getByTestId("histories")).toBeInTheDocument();
  } else {
    expect(screen.getByTestId("login-message")).toBeInTheDocument();
  }
});
