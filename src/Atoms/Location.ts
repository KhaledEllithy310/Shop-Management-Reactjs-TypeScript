import { atom } from "recoil";

interface ILocation {
  lat: number;
  lng: number;
  address: string;
}
export const locationState = atom<ILocation>({
  key: "locationState",
  default: {} as ILocation,
});
