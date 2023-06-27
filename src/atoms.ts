import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isThemeAtom = atom({
  key: "isTheme",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
