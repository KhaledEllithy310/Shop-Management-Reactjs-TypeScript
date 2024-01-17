import { useRecoilState } from 'recoil'
import { shopState } from '../Atoms/Shops'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { IShop } from '../interfaces'

export const useAddShop = () => {
  const [shopList, setShopList] = useRecoilState(shopState)

  const addShop = async (shop: Omit<IShop, 'id'>) => {
    try {
      // Add a new shop in firebase
      const newShop = await addDoc(collection(db, 'shops'), shop)
      //update recoil state with new shop
      setShopList([...shopList, { ...shop, id: newShop.id }])
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  return addShop
}
