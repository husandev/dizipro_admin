import React, { useState } from 'react'
import SideBar from '../Copmonents/SideBar'
import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getMe } from '../Slices/get_me'
import { useDispatch,useSelector } from 'react-redux';
import instance from '../../axios'

const SidebarLayout = ({ children }) => {

  const [path,setPath] = useState(true)
  const router = useRouter()
  const dispatch = useDispatch()
  const getMeStatus = useSelector((state) => state)

  useEffect(()=> {
    console.log(router.pathname);
    if(typeof window !== "undefined"){
      console.log(window.location.pathname);
      if(window.location.pathname !== "/login" || window.location.pathname !== "/courses"){
        setPath(true)
      }
      else{
        setPath(false)
      }
    }

    let token;
    console.log(getMeStatus);
    if(typeof window !== "undefined"){
      token = localStorage.getItem('token')
    }
    
    instance.get('api/users/me',token)
    .then((response) => {
        console.log(response);
    })
    .catch((er) => {
        console.log(er?.response?.data?.message);
        if(er?.response?.data?.message === "jwt expired" || er?.response?.data?.message === "jwt malformed"){
          router.push("/login")
        }
    })

   
  },[])
 
console.log(path);

  return (
    <>
      {
        router.pathname !== "/login" ?  <SideBar /> : null
      }
     
      <Box sx={router.pathname !== "/login" ? {padding:"40px 48px 0 124px"} : null}>
          {children}
      </Box>
    </>
  )
}

export default SidebarLayout