import { getDatabase, ref, set } from "firebase/database";
import { useDispatch } from "react-redux";

import { updateData } from "../store/dataSlice";


export default function useAddData() {
  const dispatch = useDispatch()


  function addNewItem(path, item, id) {
    const db = getDatabase();

    setLoading(true)
    set(ref(db, path + '/' + id), { ...item, id: id + 1 })
    	.then(() => {
        dispatch(updateData(path))
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  return [addNewItem]
}
