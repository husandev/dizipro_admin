import React, { useState } from 'react'
import SideBar from '../Copmonents/SideBar'
import { Box } from '@mui/material'
import { useEffect } from 'react'

const SidebarLayout = ({ children }) => {

  const [path,setPath] = useState(true)
  
  useEffect(()=> {
    if(typeof window !== "undefined"){
      console.log(window.location.pathname);
      if(window.location.pathname !== "/login"){
        setPath(true)
      }
      else{
        setPath(false)
      }
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