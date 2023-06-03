import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";

import { TopView } from "../components/TopView";
import { Home } from "../pages/Home";
import { WishVariables } from "../components/WishVariables";

const mockSubmit = jest.fn();

test("renders top view component", () => {
  // TopView componentが表示されていることを確認
  render(
    <RecoilRoot>
      <TopView getSuggest={jest.fn()} getHistories={jest.fn()} />
    </RecoilRoot>
  );

  expect(
    screen.getByRole("button", { name: "まずは試してみる" })
  ).toBeInTheDocument();
});

test("renders Wish component", () => {
  render(
    <RecoilRoot>
      <WishVariables getSuggest={jest.fn()} getHistories={jest.fn()} />
    </RecoilRoot>
  );

  // WishVariables componentが表示されていることを確認
  const placeVariables = screen.getByRole("textbox");
  expect(placeVariables).toBeInTheDocument();

  const [timeVariables, wayVariables] = screen.getAllByRole("combobox");
  expect(timeVariables).toBeInTheDocument();
  fireEvent.change(timeVariables, { target: { value: "15分" } });
  expect((timeVariables as HTMLInputElement).value).toBe("15分"); // asを使ってHTMLElementをHTMLInputElemntに変換可能¥

  fireEvent.change(wayVariables, { target: { value: "バス" } });
  expect((wayVariables as HTMLInputElement).value).toBe("バス");
});

test("renders Home component", () => {
  render(
    <RecoilRoot>
      <Home />
    </RecoilRoot>
  );

  // TODO 以下の内容でテストコードを書いておく

  // ASK そもそもstateの値をチェックするテストなんてありえるのか？
  // 予測ボタンを押すとchatGPTLodingStateがtrueになること

  // chatGPTLoadingStateがtrueの場合、Progressコンポーネントが表示されていることを確認
});
