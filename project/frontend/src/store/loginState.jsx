import { atom } from "recoil";

// TODO
// セッションが切れてアクセスしたらログイン状態を解除する

export const loginState = atom({
  key: "loginState",
  default: false,
});
