import React, { Suspense } from "react";
import { faBriefcase, faGraduationCap, faLayerGroup, faUser, faGear, faHomeAlt } from "@fortawesome/free-solid-svg-icons";

import About from "../components/About";
import Header from "../components/header/Header";
import Meta from "../components/Meta";
import Certfications from "../components/sections/Certfications";
import Experiances from "../components/sections/Experiances";
import Portfolio from "../components/sections/Portfolio";
import Skills from "../components/sections/skills";
import Spinner from "../components/Spinner"

import { getData } from "../store/dataSlice";
import { wrapper } from '../store'
const Layout = React.lazy(() => import("../components/Layout/Layout"));



export default function Home() {


  const navs = [
    ['home', 'about', 'skills', 'experiance', 'portfolio', 'certifications'],
    [faHomeAlt, faUser, faGear, faGraduationCap, faBriefcase, faLayerGroup]
  ]
  return (
    <>
      <Meta />
      <Suspense fallback={<Spinner />}>
        <Layout navs={navs}>
          <Header />
          <About />
          <Skills/>
          <Experiances />
          <Portfolio />
          <Certfications />
        </Layout>
      </Suspense>
    </>
  );
}

export const getStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    await store.dispatch(getData())

    return{
      revalidate: 86000
    }
  })
