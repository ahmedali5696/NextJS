import { useRouter } from "next/router";
import { use, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loginState, userLogin } from "../../store/loginSlice";


export default function FormLogin() {
  const [fieldsError, setFieldError] = useState({
    email: '',
    password: '',
    emailValid: false,
    passValid: false
  })

  const emailInput = useRef()
  const passInput = useRef()
  const dispatch = useDispatch()
  const router = useRouter()
  const { isLoggedIn } = useSelector(loginState)


  function validateEmail(e) {
    const email = /\w@\w+\.\w{2,5}$/i

    if (!email.test(e.target.value) && e.target.value !== '') {
      setFieldError(prev => ({
        ...prev,
        email: 'Email format not valid',
        emailValid: false
      }))
    } else if (e.target.value === '') {
      setFieldError(prev => ({
        ...prev,
        email: '',
        emailValid: false
      }))
    } else {
      setFieldError(prev => ({
        ...prev,
        email: '',
        emailValid: true
      }))
    }
  }

  function validatePassword(e) {
    const pass = /[0-9a-zA-Z]{6,}/

    if (!pass.test(e.target.value) && e.target.value !== '') {
      setFieldError(prev => ({
        ...prev,
        password: 'Password must be more than 6 chracter',
        passValid: false
      }))
    } else if (e.target.value === '') {
      setFieldError(prev => ({
        ...prev,
        password: '',
        passValid: false
      }))
    } else {
      setFieldError(prev => ({
        ...prev,
        password: '',
        passValid: true
      }))
    }
  }

  function loginHandler(e) {
    e.preventDefault()

    const email = emailInput.current.value
    const password = passInput.current.value

    dispatch(userLogin({ email, password }))
  }



  const btnDisable = fieldsError.emailValid && fieldsError.passValid ? false : true
  return (
    <form onSubmit={loginHandler}>
      <div className="input-group relative">
        <label htmlFor="email">Email</label>
        <input ref={emailInput} onChange={validateEmail} type="email" name="email" id="email" className=" form-input invalid:border-red-500" />
        <p className=" absolute -bottom-[18px] font-extralight text-sm text-red-500">{fieldsError.email}</p>
      </div>

      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input ref={passInput} onChange={validatePassword} type="password" name="password" id="password" className="invalid:border-red-500 form-input" pattern="[0-9a-zA-Z]{6,}" />
        <p className="block font-extralight text-sm text-red-500">{fieldsError.password}</p>
      </div>

      <button disabled={btnDisable} type="submit" className="btn border-0 py-2 w-full bg-green-600 text-slate-50 disabled:opacity-50">Login</button>
    </form>
  );
}