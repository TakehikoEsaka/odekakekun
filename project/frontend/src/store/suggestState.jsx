import { atom } from "recoil";

// TODO ここを型ファイルで定義できるようにする。以下のような感じで
// type SuggestState = {
//   place: Record<number, string>,
//   description: Record<number, string>,
//   distance: Record<number, string>,
// };

export const suggestState = atom({
  key: "suggestState",
  default: {
    message: null,
    suggest_place: {},
    suggest_description: {},
    suggest_distance: {},
  },
});
