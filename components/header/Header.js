import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import cover from "../../public/cover.jpg"
import MsgModal from "./MsgModal";


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useSelector(state => state.data.data)

  function toggleModal() {
    setIsOpen(!isOpen);
  }


  return (
    <header id="home" className=" mb-10">

      <div className="header__cover w-full h-[clamp(200px,50vw,300px)] relative shadow-[inset_0px_0px_30px_rgba(0,0,0,0.2)]">
        <Image className="-z-10 object-cover" src={cover} alt="Site Cover" fill />
      </div>

      <div className="header__profile mx-6 flex flex-col lg:flex-row justify-between">
        <div className="  flex flex-col md:flex-row -translate-y-10">
          <Image className=" rounded-full border-4 border-white drop-shadow-lg shadow-lg w-24 h-24 sm:w-40 sm:h-40" src={profile[0].img} alt="Profile Photo" width={160} height={160} />

          <div className=" ml-1 md:ml-4 pt-3 md:pt-14 ">
            <h1 className=" font-semibold text-sm sm:text-2xl dark:text-gray-50">{profile[0].fullname}</h1>
            <h2 className="main-text-color text-sm sm:text-base" >{profile[0].jop}</h2>
          </div>
        </div>

        <div className="-translate-y-5 lg:translate-y-0 lg:my-6 mb-5">
          <button className="btn mr-3 main-text-color main-bg" type="button">
            <a href={profile[0].cv} target="_blank" rel="noreferrer" >
              <FontAwesomeIcon icon={faDownload} /> CV
            </a>
          </button>

          <button id="show-dialog" onClick={toggleModal} aria-controls="msg-modal" className="btn bg-green-600 text-slate-50 dark:border-transparent" type="button">
            <FontAwesomeIcon icon={faPaperPlane} /> Message Me
          </button>
        </div>
      </div>

      <MsgModal toggle={toggleModal} isOpen={isOpen} />
    </header>
  )
}