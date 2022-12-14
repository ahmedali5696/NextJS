import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import useValidate from "../../../hooks/useValidate";
import useUploadImg from "../../../hooks/useUploadImg";
import useAddData from "../../../hooks/useAddData";
import useRemoveData from "../../../hooks/useRemoveData";

import SectionHeader from "../../sections/SectionHeader"
import Spinner from "../../Spinner";


export default function Skills() {
  const { isLoading } = useSelector(state => state.data)
  const { skills } = useSelector(state => state.data.data)
  const mySkills = typeof skills === 'object' ? Object.values(skills) : skills || []
  const [show, setShow] = useState(false)

  const { uploadImg } = useUploadImg()
  const [addNewItem] = useAddData()
  const { removeItem } = useRemoveData()
  const [emptyFieldMsg, checkEmptyFields, clearForm] = useValidate()


  function addItemHandler(e) {
    e.preventDefault()

    const id = skills?.length || 0
    const allInputs = e.target
    const skillName = e.target[0].value
    const selectedImg = e.target[1]?.files[0]

    if (!checkEmptyFields(allInputs)) {
      uploadImg('skills', selectedImg)
        .then(imgUrl => addNewItem('skills', { img: imgUrl, name: skillName }, id))

      setShow(true)
      clearForm(allInputs)
    }
  }


  return (
    <section id="skills" className="dash-section">
      <SectionHeader
        heading="Skills"
        desc="Put and remove your skills"
      />

      <p className="text-red-500 mb-2">{emptyFieldMsg}</p>

      <form onSubmit={addItemHandler}>
        <div className="input-group main-text-color">
          <label htmlFor="skill-name">Skill Name <span className="text-red-400">*</span></label>
          <input type="text" name="skill-name" id="skill-name" />
        </div>
        <div className="input-group main-text-color">
          <label htmlFor="skill-logo">Skill Logo <span className="text-red-400">*</span></label>
          <input type="file" name="skill-logo" id="skill-logo" accept="image/*" />
        </div>
        <button id="skill-btn" type="submit" className="admin-btn">Submit</button>
      </form>

      <ul className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-1 border rounded-md p-2 mt-5">
        {isLoading ?
          <Spinner /> :
          mySkills.map(skill => (
            skill &&
            <li key={skill.id} className="flex gap-1 p-1 items-center main-bg shadow-md mb-2 main-text-color">
              <Image src={skill.img} alt="Skill Logo" width={32} height={32} />
              <p>{skill.name}</p>
              <a href="" className=" ml-auto mr-2" onClick={e => { e.preventDefault(); removeItem('skills', skill.id) }}>
                <FontAwesomeIcon icon={faCircleXmark} className="text-red-600" />
              </a>
            </li>
          ))}
      </ul>
    </section>

  );
}
