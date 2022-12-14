import { getDatabase, ref, update } from "firebase/database";
import { useDispatch } from "react-redux";

import { updateData } from "../store/dataSlice";


export default function useRemoveData() {
  const dispatch = useDispatch()


  function removeItem(path, id) {
    const db = getDatabase();
    const initId = id === 0 ? id : id - 1

    const updates = {};
    updates['/' + path + '/' + initId] = null;

    return (
      update(ref(db), updates)
        .then(dispatch(updateData(path)))
    )
  }

  return { removeItem }
}