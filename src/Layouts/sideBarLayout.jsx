import React from 'react'
import SideBar from '../Copmonents/SideBar'
import { Box } from '@mui/material'

const SidebarLayout = ({ children }) => {
  return (
    <>
          <SideBar />
          <Box sx={{padding:"40px 48px 0 124px"}}>
              {children}
          </Box>
    </>
  )
}

export default SidebarLayout