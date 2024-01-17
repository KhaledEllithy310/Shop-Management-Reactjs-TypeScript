import { useRecoilState } from "recoil";
import { shopState } from "../Atoms/Shops";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { IShop } from "../interfaces";

export const useGetShopList = () => {
  const [shopList, setShopList] = useRecoilState(shopState);
  const [isLoading, setIsLoading] = useState(false);
  //   const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchShopList = async () => {
      try {
        console.log("fetching shop list");
        
        const querySnapshot = await getDocs(collection(db, "shops"));
        //get all shops from firebase
        const shopData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          shopName: doc.data().shopName,
          shopCode: doc.data().shopCode,
          location: {
            lat: doc.data().location?.lat,
            lng: doc.data().location?.lng,
            address: doc.data().location?.address,
          },
          phoneNumber: doc.data().phoneNumber,
        }));
        //update recoil state with all shops
        setShopList(shopData as IShop[]);
      } catch (error) {
        console.error("Error fetching shop list: ", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShopList();
  }, []);

  return { isLoading, shopList };
};
