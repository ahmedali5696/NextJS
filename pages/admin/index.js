import { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { loginState } from "../../store/loginSlice";
import FormLogin from "../../components/admin/FormLogin";
import Spinner from "../../components/Spinner"
import Meta from "../../components/Meta"
import ErrorAlert from "../../components/ErrorAlert";
import logo from "../../public/logo.png";

export default function Admin() {
  const { loading, isLoggedIn, loginError } = useSelector(loginState)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()


  useLayoutEffect(() => {
    if (localStorage.getItem('isLoggedIn')) {
      router.replace('/admin/home')
    } else {
      setMounted(true)
    }
  }, [router])

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/admin/home')
    }
  }, [isLoggedIn, router])


  function loginErrorMsg() {
    let msg;
    switch (loginError) {
      case 'EMAIL_NOT_FOUND':
        msg = 'Sorry, This email not found';
        break;

      case 'INVALID_PASSWORD':
        msg = 'Password is wrong, try again';
        break;

      case 'USER_DISABLED':
        msg = 'Your Account has been suspended, please contact us.';
        break;

      default:
        msg = 'Error from the server, Please try later.';
        break;

    }

    return msg
  }

  return (
    <>
      <Meta title="Ahmed Ali | Admin Login" />
      {mounted &&
        <main className=" relative my-auto px-5">
          <div className="logo relative mb-10 px-5">
            <Image src={logo} alt="Logo" width={200} className="mx-auto" />
          </div>
          {
            !isLoggedIn &&
            <div className="form flex flex-col max-w-sm mx-auto p-7 main-text-color main-bg border-t-[6px] border-green-600 shadow-[0px_-14px_17px_-20px_rgb(0,0,0)] min-h-[304px] ">
              <h1 className="font-bold text-2xl text-center mb-5">Login</h1>
              {loading ?
                <Spinner /> :
                <FormLogin />
              }
            </div>
          }

          {loginError && <ErrorAlert msg={loginErrorMsg()} bg={'bg-red-300'} />}
        </main>}
    </>
  );
}