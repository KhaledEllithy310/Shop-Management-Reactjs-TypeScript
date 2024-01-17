import { useRecoilState } from 'recoil'
import { shopState } from '../Atoms/Shops'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { IShop } from '../interfaces'

export const useDeleteShop = () => {
  const [, setShopList] = useRecoilState(shopState)

  const deleteShop = async (shop: IShop) => {
    try {
      // get the target shop from firebase
      const shopRef = doc(db, 'shops', shop.id)
      // Delete the target shop
      await deleteDoc(shopRef)

      //update recoil state with new shop
      setShopList((prevShops: IShop[]) => {
        return prevShops.filter(s => s.id !== shop.id)
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  return deleteShop
}
