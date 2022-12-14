import Footer from "./Footer"
import Navbar from "./Navbar"

export default function Layout({ children, navs }) {


  return (
    <>
      <style jsx global>{`
        #__next {
          margin-left: 250px;
        }

        @media (max-width: 767px) {
          #__next {
            margin-left: 61px;
          }
        }
      `}</style>
      <Navbar navItems={navs[0]} navIcons={navs[1]} />
      <div className="cont">
        {children}
      </div>
      <Footer />
    </>
  )
}