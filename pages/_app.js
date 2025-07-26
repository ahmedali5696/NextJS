import { Provider } from 'react-redux'
import React, { useEffect, useState } from "react";

import { wrapper } from '../store'
import '../styles/globals.css'


function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('theme') === "dark") {
      document.documentElement.classList.add('dark')
    }
    setIsSSR(false)
  }, [])
  
if (isSSR) return null
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider >
  )
}

export default MyApp
