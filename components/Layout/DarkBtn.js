import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";


export default function DarkBtn() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setDarkMode(true)
    }
  },[])

  function toggleDark() {
    if (!document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    setDarkMode(!darkMode)
  }

  return (
    <div className="flex gap-2 max-[768px]:flex-col md:left-[27%] items-center px-7 absolute bottom-3">
        <FontAwesomeIcon icon={faSun} size='xs' />
        <button onClick={toggleDark} className=" max-[768px]:rotate-90"><FontAwesomeIcon icon={darkMode ? faToggleOn : faToggleOff} size='lg' /></button>
        <FontAwesomeIcon icon={faMoon} size='xs' />
      </div>
  )
}