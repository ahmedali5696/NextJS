import { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { storage } from "../firebase";



export default function useUploadImg() {
  const [progresspercent, setProgresspercent] = useState(0);
  const [imgLoading, setLoading] = useState(false)


  function uploadImg(path, targetFile) {
    return new Promise((resolve) => {
      const file = targetFile

      if (!file) return;

      setLoading(true)

      const storageRef = ref(storage, path + '/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      const promise = new Promise((res) => {

        uploadTask.on("state_changed",
          (snapshot) => {
            const progress =
              Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgresspercent(progress);
          },
          (error) => {
            alert(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              res(downloadURL)
            })
          }
        )
      })

      promise.then(downloadURL => resolve(downloadURL))
        .then(() => setLoading(false))
    })
  }

  return { uploadImg, imgLoading }
}
