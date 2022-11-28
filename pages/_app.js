import SidebarLayout from '../src/Layouts/sideBarLayout'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../src/Store/store'
import { StrictMode } from 'react'

function MyApp({ Component, pageProps }) {
  return (
    <StrictMode>
      <Provider store={store}>
        <SidebarLayout >
          <Component  {...pageProps} />
        </SidebarLayout>
      </Provider>
    </StrictMode>
 
  )
}

export default MyApp
