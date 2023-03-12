import { atom } from "recoil";

export const questionState = atom({
  key: "questionState",
  default: { place: "高円寺", hour: "30分", way: "自転車" },
});
