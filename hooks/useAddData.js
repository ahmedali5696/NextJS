import { getDatabase, ref, set } from "firebase/database";
import { useDispatch } from "react-redux";
import { useState } from "reaction "

import { updateData } from "../store/dataSlice";


export default function useAddData() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)


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

  return [addNewItem, loading]
}