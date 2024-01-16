import { atom } from "recoil";
import { IShop } from "../interfaces";

export const shopState = atom<IShop[]>({
  key: "shopState", // Unique ID with respect to other atoms/selectors
  default: [] as IShop[],
});
