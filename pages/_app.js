import SidebarLayout from '../src/Layouts/sideBarLayout'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../src/Store/store'
import { StrictMode, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {

  const [path,setPath] = useState(true)



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
