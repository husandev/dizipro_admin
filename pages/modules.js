import { Box,Table ,TableContainer ,styled,TableRow,Paper,TableHead ,TableCell ,TableBody, CircularProgress   } from '@mui/material'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CustomBtn from '../src/Copmonents/CustomBtn';
import CustomPagination from '../src/Copmonents/CustomPagination';
import CustomTypegraphy from '../src/Copmonents/CustomTypegraphy'
import { getModules, modules } from '../src/Slices/get_modules';

    
const StyledRow = styled(TableRow)(
    ( theme ) => `
        background:#fff;
        padding:14px 21px;
        height:50px;
        cursor:pointer;
        margin-bottom:1px;
        align-items: center;
        justify-content: space-between;
        

        &:hover th,
        &:hover td{
            border-color:#d1d1d3  !important;
        }   

 
        td,th{
            border: 0;
        }
  `
  );

function Modules() {

    const ModulesStatus = useSelector((state) => state.get_modules.status)
    const modulesData = useSelector(modules)
    const dispatch = useDispatch()

    useEffect(()=> {
        if(ModulesStatus === "idle"){
            dispatch(getModules())
        }
    },[ModulesStatus,modulesData])

    if(ModulesStatus === "succeeded"){
        return (
            <Box>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <CustomTypegraphy component="h3" class="title" text="Modular"/>
                    <Link href={"/add-module"} legacyBehavior>
                        <a>
                            <CustomBtn text=""  class="add__course">
                                <Image  src="/icons/white-plus.svg" width={15} height={15} alt="threeDots"/>
                                <CustomTypegraphy component="h3" class="btn__text" text="Yangi modul qo'shish"/>
                            </CustomBtn>
                        </a>
                    </Link>
                
                </Box>
    
                <Box >
                    <Box sx={{  borderColor: 'divider' }}>
                        <TableContainer sx={{boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.03)",padding:"24px 34px"}} component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <StyledRow sx={{background:"#f6f6f6",borderColor:'transparent !important'}}>
                                        <TableCell  ><CustomTypegraphy className="table__text" variant={"span"} text={"NOMI"} /></TableCell>
                                        <TableCell  ><CustomTypegraphy className="table__text" variant={"span"} text={"TAVSIF"} /></TableCell>
                                        <TableCell  ><CustomTypegraphy className="table__text" variant={"span"} text={"ID"} /></TableCell>
                                        <TableCell  ><CustomTypegraphy className="table__text" variant={"span"} text={"DARSLAR SONI"} /></TableCell>
                                    </StyledRow>
                                </TableHead>
                                <TableBody >
                                    {
                                        modulesData?.map(item => (
                                            <StyledRow key={item.id}> 
                                                <TableCell className='rowBorderStart'  component="th" scope="row">
                                                    <CustomTypegraphy class="course__sub--title" variant={"p"} text={item.title} />
                                                </TableCell>
                                                <TableCell className='rowBorderMiddle'  component="th" scope="row">
                                                    <CustomTypegraphy class="course__desc" variant={"p"} text={item.description} />
                                                </TableCell>
                                                <TableCell className='rowBorderMiddle'  component="th" scope="row">
                                                    <CustomTypegraphy class="course__sub--title" variant={"p"} text={item.id} />
                                                </TableCell>
                                                <TableCell className='rowBorderEnd' >
                                                    {item.lessons_count}                    
                                                </TableCell>
                                            </StyledRow>
                                        ))
                                    }
                                   
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box sx={{display:"flex",justifyContent:"center",marginTop:"30px"}}>
                        <CustomPagination />
                    </Box>
                </Box>
            </Box>
        )
    }

    else{
        return(
            <Box sx={{height:"93vh",display:"flex",alignItems:"center", justifyContent:"center"}}>
                <CircularProgress />
            </Box>
        )
    }

    
}


export default Modules