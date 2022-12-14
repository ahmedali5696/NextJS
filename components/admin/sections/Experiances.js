import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import SectionHeader from "../../sections/SectionHeader"
import { useSelector } from "react-redux";
import { data } from "autoprefixer";
import useAddData from "../../../hooks/useAddData";
import useValidate from "../../../hooks/useValidate";
import Spinner from "../../Spinner";
import { useState } from "react";
import { useRef } from "react";
import useRemoveData from "../../../hooks/useRemoveData";
import useUpdaeData from "../../../hooks/useUpdateData";


export default function Experiances() {
  const [editeMode, setEditeMode] = useState({ id: 0, mode: false })
  const { isLoading } = useSelector(state => state.data)
  const { experiances } = useSelector(state => state.data.data)
  const myExperiances = typeof experiances === 'object' ? Object.values(experiances) : experiances || []
  const [addNewItem] = useAddData()
  const [updateItem] = useUpdaeData()
  const { removeItem } = useRemoveData()
  const [emptyFieldMsg, checkEmptyFields, clearForm] = useValidate()

  const titleRef = useRef()
  const companyRef = useRef()
  const fromRef = useRef()
  const toRef = useRef()
  const descRef = useRef()


  function addItemHandler(e) {
    e.preventDefault()

    const id = experiances?.length || 0
    const allInputs = e.target
    const title = e.target[0].value
    const company = e.target[1].value
    const date = { from: e.target[2].value, to: e.target[3].value }
    const description = e.target[4].value

    if (!checkEmptyFields(allInputs)) {
      addNewItem('experiances', {
        title,
        company,
        date,
        description
      }, id)

      clearForm(allInputs)
    }
  }

  function editeModeHandler(item) {

    setEditeMode({ id: item.id, mode: true })

    titleRef.current.value = item.title
    companyRef.current.value = item.company
    fromRef.current.value = item.date.from
    toRef.current.value = item.date.to
    descRef.current.value = item.description
  }

  function updateHandler() {
    const id = editeMode.id
    const item = {
      id,
      title: titleRef.current.value,
      company: companyRef.current.value,
      date: { from: fromRef.current.value, to: toRef.current.value },
      description: descRef.current.value
    }

    updateItem('experiances', item, id)
    cancleEdite()
  }

  function cancleEdite() {

    setEditeMode(prev => ({ ...prev, mode: false }))

    titleRef.current.value = ''
    companyRef.current.value = ''
    fromRef.current.value = ''
    toRef.current.value = ''
    descRef.current.value = ''
  }

  return (
    <section id="experiance" className="dash-section">
      <SectionHeader
        heading="Experiances"
        desc="Put, update or remove your Experiances"
      />

      <p className="text-red-500 mb-2">{emptyFieldMsg}</p>

      <form onSubmit={addItemHandler}>
        <div className="input-group main-text-color">
          <label htmlFor="title">Title <span className="text-red-400">*</span></label>
          <input ref={titleRef} type="text" name="title" id="title" />
        </div>

        <div className="input-group main-text-color">
          <label htmlFor="company">Company <span className="text-red-400">*</span></label>
          <input ref={companyRef} type="text" name="company" id="company" />
        </div>

        <div className="flex max-[540px]:flex-col main-text-color justify-between">
          <div className="input-group">
            <label htmlFor="start-date">From <span className="text-red-400">*</span></label>
            <input ref={fromRef} type="text" placeholder="i.e: Sep 2022" name="start-date" id="start-date" className=" placeholder:opacity-50" />
          </div>

          <div className="input-group">
            <label htmlFor="end-date">To <span className="text-red-400">*</span></label>
            <input ref={toRef} type="text" placeholder="i.e: Jun 2022" name="end-date" id="end-date" className=" placeholder:opacity-50" />
          </div>
        </div>

        <div className="input-group main-text-color">
          <label htmlFor="description">Description <span className="text-red-400">*</span></label>
          <input ref={descRef} type="text" name="description" id="description" />
        </div>

        {editeMode.mode ?
          <div className="flex justify-between">
            <button type="button" onClick={updateHandler} className=" bg-yellow-500 text-slate-50 rounded py-1 px-2 ">Update</button>
            <button type="button" onClick={cancleEdite} className=" bg-gray-500 text-slate-50 rounded py-1 px-2 ">Cancle</button>
          </div> :

          <button type="submit" className="admin-btn">Submit</button>
        }

      </form>

      <ul className="border rounded-md p-2 mt-5 grid grid-cols-[repeat(auto-fit,minmax(185px,1fr))] gap-1">
        {isLoading ?
          <Spinner /> :
          myExperiances.map(exp => (
            exp &&
            <li key={exp.id} className="flex justify-between p-2 items-center main-bg shadow-md mb-2 main-text-color">
              <div>
                <p>{exp.title}</p>
              </div>
              <div>
                <FontAwesomeIcon onClick={() => editeModeHandler(exp)} icon={faPenToSquare} className=" cursor-pointer mr-2 text-blue-600" />
                <FontAwesomeIcon onClick={() => { removeItem('experiances', exp.id); cancleEdite() }} icon={faCircleXmark} className="cursor-pointer text-red-600" />
              </div>
            </li>
          ))
        }
      </ul>
    </section>

  );
}