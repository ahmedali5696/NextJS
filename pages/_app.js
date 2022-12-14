import { Provider } from 'react-redux'
import React, { useEffect } from "react";

import { wrapper } from '../store'
import '../styles/globals.css'


function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  useEffect(() => {
    if (localStorage.getItem('theme') === "dark") {
      document.documentElement.classList.add('dark')
    }
  })

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider >
  )
}

export default MyApp
