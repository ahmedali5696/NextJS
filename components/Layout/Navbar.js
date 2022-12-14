import Image from "next/image";
import { useRef, useEffect } from "react";

import NavbarListItem from "./NavbarListItem";
import DarkBtn from "./DarkBtn";
import logo from "../../public/logo2.png"

export default function Navbar({ navItems, navIcons }) {
  // const itemRef = useRef()

  // useEffect(() => {
  //   console.log(itemRef)
  // }, [])

  // function addActiveClass(e) {
  //   // itemRef.current.classList.remove('nav-item')
    
  //   e.target.parentElement.classList.add('active')
  // }

  return (
    <nav className="navbar main-bg main-text-color fixed z-10 top-0 left-0 h-screen py-6 shadow overflow-hidden w-[60px] md:w-[250px] hover:w-[200px] md:hover:w-[250px] transition-[width] duration-300">

      <div className="navbar__brand relative flex gap-4 items-center mb-10 pl-4">
        <Image className="logo object-contain rounded-md shadow" src={logo} alt="Site Logo" width={30} />
        <h3 className="name font-bold text-black dark:text-gray-50 whitespace-nowrap">Ahmed Ali</h3>
      </div>

      <ul className="navbar__nav capitalize mx-1 px-4">
        {navItems.map((item, index) =>
          <NavbarListItem key={item} item={item} icon={navIcons[index]} />
        )}
      </ul>
      <DarkBtn />

    </nav>
  );
}

