import React, { useState } from 'react'
import SideBar from '../Copmonents/SideBar'
import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const SidebarLayout = ({ children }) => {

  const [path,setPath] = useState(true)
  const router = useRouter()


  useEffect(()=> {
    if(typeof window !== "undefined"){
      console.log(window.location.pathname);
      if(window.location.pathname !== "/login" || window.location.pathname !== "/courses"){
        setPath(true)
      }
      else{
        setPath(false)
      }
    }

    let token = localStorage.getItem('token')
    console.log(token);
    if(!token){
      // router.push('/login')
    }
  },[])
 
console.log(path);

  return (
    <>
      {
        path ?  <SideBar /> : null
      }
     
      <Box sx={path ? {padding:"40px 48px 0 124px"} : null}>
          {children}
      </Box>
    </>
  )
}

export default SidebarLayout