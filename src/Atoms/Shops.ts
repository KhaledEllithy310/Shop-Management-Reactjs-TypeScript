import { atom } from "recoil";
import { IShop } from "../interfaces";

export const shopState = atom<IShop[]>({
  key: "shopState", 
  default: [] as IShop[],
});
