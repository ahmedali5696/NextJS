import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import useUpdateData from "../../hooks/useUpdateData";
import useUploadImg from "../../hooks/useUploadImg";
import { updateData } from "../../store/dataSlice";
import { wrapper } from '../../store'

import Header from "../../components/admin/Header"
import Meta from "../../components/Meta";
import SectionHeader from "../../components/sections/SectionHeader"
import ErrorAlert from "../../components/ErrorAlert";

export default function Profile() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { profile } = useSelector(state => state.data.data)
  const [updateItem] = useUpdateData()
  const { uploadImg } = useUploadImg()

  const [show, setShow] = useState(false)
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);


  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      router.replace('/admin')
    } else {
      setMounted(true)
    }
  }, [router])

  function changeHandler(e) {
    const file = e.target.files[0];
    setFile(file);
  }

  useEffect(() => {
    let fileReader, isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }

  }, [file]);

  function updateHandler(e) {
    e.preventDefault()
    const id = profile?.length || 0
    const img = e.target[0]?.files[0]
    const fullname = e.target[1].value
    const jop = e.target[2].value
    const cv = e.target[3].value
    const about = e.target[4].value

    if (e.target[0].value === '') {
      updateItem('profile', {
        fullname, jop, cv, about, img: profile[0].img
      }, id)
    } else {
      uploadImg('profile', img)
        .then(imgUrl => updateItem('profile', {
          fullname, jop, cv, about, img: imgUrl
        }, id))
    }
    setShow(true)
  }

  return (
    <>
      <Meta title="Ahmed Ali | Profile" />
      {mounted &&
        <>
          <Header />
          <main>
            <div className="mx-auto mb-32 max-w-xl px-5">
              <SectionHeader
                heading="Profile"
                desc="Edite all your personal informations"
              />

              {show && <ErrorAlert msg={'The profile has been updated'} close={() => setShow(false)} bg="bg-green-300" />}

              <form onSubmit={updateHandler}>
                <div className="input-group main-text-color relative flex">
                  <Image className=" mx-auto mb-10 rounded-full border-4 border-white drop-shadow-lg shadow-lg w-32 h-32 min-[540px]:w-40 min-[540px]:h-40" src={fileDataURL ? fileDataURL : profile[0].img} alt="Profile Photo" width={160} height={160} />
                  <label htmlFor="photo" className=" absolute bottom-[30%] right-[33%] dark:text-black drop-shadow-lg cursor-pointer">
                    <FontAwesomeIcon icon={faCamera} size="lg" className=" bg-white rounded-full p-1.5" />
                  </label>
                  <input type="file" name="photo" id="photo" accept="image/*" hidden onChange={changeHandler} />
                </div>
                <div className="input-group main-text-color">
                  <label htmlFor="fullname">Fullname</label>
                  <input defaultValue={profile[0].fullname} type="text" name="fullname" id="fullname" />
                </div>
                <div className="input-group main-text-color">
                  <label htmlFor="title">Jop Title</label>
                  <input defaultValue={profile[0].jop} type="text" name="title" id="title" />
                </div>
                <div className="input-group main-text-color">
                  <label htmlFor="cv-link">CV Link</label>
                  <input defaultValue={profile[0].cv} type="url" placeholder="https://example.com" name="cv-link" id="cv-link" />
                </div>
                <div className="input-group main-text-color">
                  <label htmlFor="about">About</label>
                  <textarea defaultValue={profile[0].about} name="about" id="about" className=" form-textarea rounded" rows="3"></textarea>
                </div>
                <button type="submit" className="admin-btn">Update</button>
              </form>

            </div>
          </main>
        </>}
    </>
  )
}


export const getStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    await store.dispatch(updateData('profile'))

    return{
      revalidate: 86000
    }
  })