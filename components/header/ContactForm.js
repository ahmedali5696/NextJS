import { useDispatch, useSelector } from "react-redux"

import { sendMsg } from "../../store/msgSlice";
import useValidate from "../../hooks/useValidate"
import Spinner from "../Spinner";

export default function ContactForm() {
  const dispatch = useDispatch()
  const { sending, success } = useSelector(state => state.msg)
  const { messages } = useSelector(state => state.data.data)
  const [emptyFieldMsg, checkEmptyFields] = useValidate()

  function sendMsgHandler(e) {
    e.preventDefault()

    const id = messages?.length || 0
    const allInput = e.target
    const username = e.target[0].value
    const email = e.target[1].value
    const msg = e.target[2].value

    if (!checkEmptyFields(allInput)) {
      dispatch(sendMsg({
        msg: { id: id + 1, username, email, msg }, id
      }))
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