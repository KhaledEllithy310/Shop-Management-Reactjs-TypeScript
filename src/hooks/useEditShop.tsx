import { useRecoilState } from 'recoil'
import { shopState } from '../Atoms/Shops'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { IShop } from '../interfaces'

export const useEditShop = () => {
  const [, setShopList] = useRecoilState(shopState)

  const editShop = async (shop: IShop) => {
    try {
      // get the target shop from firebase
      const shopRef = doc(db, 'shops', shop.id)
      // update the target shop
      await updateDoc(shopRef, {
        shopName: shop.shopName,
        shopCode: shop.shopCode,
        location: shop.location,
        phoneNumber: shop.phoneNumber
      })

      //update recoil state with new shop
      setShopList((prevShops: IShop[]) => {
        return prevShops.map(s => (s.id === shop.id ? shop : s))
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  return editShop
}
