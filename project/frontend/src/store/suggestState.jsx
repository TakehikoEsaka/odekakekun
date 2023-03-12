import { atom } from "recoil";

export const suggestState = atom({
  key: "suggestState",
  default: [{ place: null, description: null }],
});
