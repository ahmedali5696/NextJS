import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/loginSlice";
import { faArrowRightFromBracket, faTableColumns, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";

export default function Profile() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [dashboard, setDashboard] = useState()
  const { profile } = useSelector(state => state.data.data)


  useEffect(() => {
    if (router.pathname === '/admin/home') {
      setDashboard(true)
    } else {
      setDashboard(false)
    }
  },[router.pathname])

  function logoutHandler() {
    dispatch(logout())
    router.push('/admin')
  }

  return (
    <div className=" flex text-center main-text-color p-main-style gap-3 p-6 mb-28">
      <div className="my-auto mr-auto">
        <a href="http://localhost:3000/" target="_blank" rel="noreferrer" className="btn bg-green-600 text-slate-50">
          Website
        </a>
      </div>
      <div>
        <Link href={`/admin/${dashboard ? 'profile' : 'home'}`} className="group">
          {dashboard ?
            <Image src={profile[0].img} width={25} height={25} alt="Profile Photo" className=" rounded-full mx-auto" /> :
            <FontAwesomeIcon icon={faTableColumns} size="lg" className="group-hover:text-green-600" />
          }
          <p>{dashboard ? 'Profile' : 'Dashboard'}</p>
        </Link>
      </div>
      <div>
        <button className="group" onClick={logoutHandler}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" className="group-hover:text-green-600" />
          <p>Logout</p>
        </button>
      </div>
    </div>

  );
}