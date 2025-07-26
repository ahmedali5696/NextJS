import React, { Suspense, useEffect } from "react";
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
import { useSelector } from "react-redux";
import useAddData from "../hooks/useAddData";
const Layout = React.lazy(() => import("../components/Layout/Layout"));



export default function Home() {
  const { profile, locations } = useSelector(state => state.data.data)
  const [addNewItem] = useAddData()

  const navs = [
    ['home', 'about', 'skills', 'experiance', 'portfolio', 'certifications'],
    [faHomeAlt, faUser, faGear, faGraduationCap, faBriefcase, faLayerGroup]
  ]

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

  useEffect(() => {
    getUserLocation()
  }, [])

  return (
    <>
      <Meta title={`${profile[0].fullname} | Front-end Developer`} />
      <Suspense fallback={<Spinner />}>
        <Layout navs={navs}>
          <Header />
          <About />
          <Skills />
          <Experiances />
          <Portfolio />
          <Certfications />
        </Layout>
      </Suspense>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(getData())
  })
