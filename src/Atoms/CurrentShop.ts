import { atom } from "recoil";
import { IShop } from "../interfaces";

export const currentShopState = atom<IShop>({
  key: "currentShopState",
  default: {} as IShop,
});
