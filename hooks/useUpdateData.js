import { getDatabase, ref, update } from "firebase/database";
import { useDispatch } from "react-redux";

import { updateData } from "../store/dataSlice";


export default function useUpdaeData() {
  const dispatch = useDispatch()


  function updateItem(path, item, id) {
    const db = getDatabase();
    const initId = id === 0 ? id : id - 1

    const updates = {};
    updates['/' + path + '/' + initId] = item;

    return (
      update(ref(db), updates)
        .then(dispatch(updateData(path)))
    )
  }

  return [updateItem]
}