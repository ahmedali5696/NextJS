import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import useRemoveData from "../../../hooks/useRemoveData";
import SectionHeader from "../../sections/SectionHeader"
import Spinner from "../../Spinner";


export default function Messages() {
  const { isLoading } = useSelector(state => state.data)
  const { messages } = useSelector(state => state.data.data)
  const myMessages = typeof messages === 'undefined' || messages === null ? [] : typeof messages === 'object' ? Object.values(messages) : messages || []
  const { removeItem } = useRemoveData()


  return (
    <section id="messages" className="dash-section">
      <SectionHeader
        heading="Messages"
        desc="Read and remove your messages"
      />
      <ul className="border rounded-md p-2 mt-5">
        {isLoading ?
          <Spinner /> :
          myMessages.reverse().map(msg => (
            msg &&
            <li key={msg.id} className="flex gap-3 p-1 items-center main-bg main-text-color shadow-md mb-2">
              <div>
                <p><span className=" font-semibold">Name:</span> {msg.username}</p>
                <p><span className=" font-semibold">Email:</span> {msg.email}</p>
                <p><span className=" font-semibold">Message:</span> {msg.msg}</p>
              </div>
              <FontAwesomeIcon icon={faCircleXmark} onClick={() => removeItem('messages', msg.id)} className="text-red-600 ml-auto mr-2 cursor-pointer" />
            </li>
          ))
        }
      </ul>
    </section>
  )
}