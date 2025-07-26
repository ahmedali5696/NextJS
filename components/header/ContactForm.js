import { useDispatch, useSelector } from "react-redux"

import { sendMsg } from "../../store/msgSlice";
import useValidate from "../../hooks/useValidate"
import Spinner from "../Spinner";
import useAddData from "../../hooks/useAddData";

export default function ContactForm() {
  const dispatch = useDispatch()
  const { sending, success } = useSelector(state => state.msg)
  const { messages, locations } = useSelector(state => state.data.data)
  const [emptyFieldMsg, checkEmptyFields] = useValidate()
  const [addNewItem] = useAddData()

  const getUserLocation = () => {
    const id = locations?.length || 0

    if (typeof window !== 'undefined') {
      const geolocation = window.navigator.geolocation

      if (geolocation) {
        geolocation.getCurrentPosition((position) => {
          addNewItem('locations', { lat: position.coords.latitude, long: position.coords.longitude, date: new Date().toISOString() }, id)
        }, (error) => {
          addNewItem('locations', { lat: 0, long: 0, date: new Date().toISOString() }, id)
        });
      }
    }
  }

  function sendMsgHandler(e) {
    e.preventDefault()

    const id = messages?.length || 0
    const allInput = e.target
    const username = e.target[0].value
    const email = e.target[1].value
    const msg = e.target[2].value


    if (!checkEmptyFields(allInput)) {
      window.navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          getUserLocation()

          dispatch(sendMsg({
            msg: { id: id + 1, username, email, msg }, id
          }));
        } else {
          alert("لقد رفضت الوصول الى الموقع. يرجى تفعيله من إعدادات المتصفح او افتح من متصفح مختلف او في صفحة متصفح متخفي.");
        }
      });
    }


  }

  return (
    <>
      {sending ?
        <Spinner /> :
        success ?
          <p className=" text-center text-green-600 font-medium">Message sent</p> :
          <form onSubmit={sendMsgHandler}>
            <p className="text-red-500 mb-2">{emptyFieldMsg}</p>
            <div className="input-group">
              <label htmlFor="your-name">Your Name</label>
              <input id="your-name" className=" form-input" name="your-name" type="text" />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input id="email" className=" form-input" name="email" type="email" />
            </div>
            <div className="input-group">
              <label htmlFor="message">Your Message</label>
              <textarea name="message" id="message" className=" form-textarea rounded" rows="3"></textarea>
            </div>
            <button type="submit" className="btn border-0 py-2 w-full mx-auto block bg-green-600 text-slate-50">Send</button>
          </form>
      }
    </>
  )
}