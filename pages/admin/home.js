import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { faBriefcase, faGraduationCap, faLayerGroup, faGear, faMessage } from "@fortawesome/free-solid-svg-icons";

import Meta from "../../components/Meta"
import Layout from "../../components/Layout/Layout"
import Header from "../../components/admin/Header";
import Skills from "../../components/admin/sections/Skills";
import Experiances from "../../components/admin/sections/Experiances";
import Portfolio from "../../components/admin/sections/Portfolio";
import Certifications from "../../components/admin/sections/Certfi";
import Messages from "../../components/admin/sections/Messages";

import { getData } from "../../store/dataSlice";
import { wrapper } from '../../store'


export default function Home() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      router.replace('/admin')
    } else {
      setMounted(true)
    }
  }, [router])

  const navs = [
    ['skills', 'experiance', 'portfolio', 'certifications', 'messages'],
    [faGear, faGraduationCap, faBriefcase, faLayerGroup, faMessage]
  ]

  return (
    <>
      <Meta title="Ahmed Ali | Dashboard" />
      {mounted &&
        <Layout navs={navs}>
          <Header />
          <main>
            <Skills />
            <Experiances />
            <Portfolio />
            <Certifications />
            <Messages />
          </main>
        </Layout>
      }
    </>
  );
}

export const getStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    await store.dispatch(getData())

    return{
      revalidate: 3600
    }
  })