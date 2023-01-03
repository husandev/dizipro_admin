import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomBtn from '../../src/Copmonents/CustomBtn'
import CustomTypegraphy from '../../src/Copmonents/CustomTypegraphy'
import { course, getCourse } from '../../src/Slices/get_course'
import {Box, CircularProgress, Grid, List, ListItem ,TableContainer,Paper ,Table,TableHead,styled,TableRow,TableCell,TableBody } from "@mui/material"
import { getModules, modules } from '../../src/Slices/get_modules'
import { getModule, module } from '../../src/Slices/get_module'
import Link from 'next/link'


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


const StyledListItem = styled(ListItem)(
    ( theme ) => `
    padding:12px 20px;
    display:flex;
    align-items: center;
    justify-content: space-between;
    cursor:pointer;

    &:hover{
        background:#f5f5f5; 
        transition: all 0.4s ease
    }

    &.module__active{
        background:#f5f5f5; 

        .MuiTypography-module__name{
            color: #01605A;
        }

        .MuiTypography-module__lesson{
            color: rgba(0, 0, 0, 0.6);
        }
    }
     
  `
  );


function Course() {

    const courseData = useSelector(course)
    const courseStatus = useSelector((state) => state.get_course.status)
    const modulesStatus = useSelector((state) => state.get_modules.status)
    const Module = useSelector((state) => state.get_module)
    const [moduleId,setModuleId] = useState('')
    const [active,setActive] = useState(1)
    const dispatch = useDispatch()
    const router = useRouter()
    
    useEffect(() => {
        if(router.isReady){
            dispatch(getCourse(router.query.id))
        }
    },[router.query.id])


    useEffect(() => {
        if(courseStatus === "succeeded"){
            if(courseData?.modules[0] !== null){
                dispatch(getModule(courseData?.modules[0]?.id))
            }
        
        }

    },[courseStatus])

    useEffect(()=> {
        if(courseData?.modules[0] !== null){
            dispatch(getModule(courseData?.modules[0]?.id))
            setModuleId(courseData?.modules[0]?.id)
        }
    },[courseData])

    function ModuleHandler(item,id) {
        setActive(id)
        setModuleId(item.id)
        console.log(item,"course");
        dispatch(getModule(item.id))
    }


  
    if(courseStatus === "succeeded"){
        return (
            <Box>
                <Box sx={{boxShadow:"0px 2px 2px rgba(0, 0, 0, 0.04)",borderRadius:"8px",background:"#fff",padding:"24px"}}>
                    <Box sx={{display:"flex",alignItems:"center",paddingBottom:"20px",borderBottom:"1px solid rgba(0, 0, 0, 0.15)",marginBottom:"20px"}}>
                        
                        <Image style={{borderRadius:"6px",marginRight:"12px"}} width={70} height={40} src={`https://web.diziproedu.uz/uploads/images/${courseData?.images[0].src}`} alt="course"/>
                        <CustomTypegraphy text={courseData.name} component={"h3"} class="course__sub--text"/>
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <List className='srcoll' sx={{padding:"0",height:"205px",overflowY:"scroll"}}>
                                {
                                    courseData?.modules[0] !== null ? 
                                    courseData?.modules?.map((item,i) => (
                                        <StyledListItem key={item?.id} onClick={()=> ModuleHandler(item,i + 1)} className={i + 1 === active ? "module__active" : ""} >
                                            <Box sx={{display:"flex",alignItems:"center"}}>
                                                <Image src="/icons/burger.svg" width={16} height={16} alt="menu"/>
                                                <CustomTypegraphy text={item?.title} class="module__name"/>
                                            </Box>
                                            <CustomTypegraphy text="7" class="module__lesson"/>
                                        </StyledListItem>
                                    ))
                                    : null
                                }
                               
                            </List>
                            <Link href={`/add-module/${router.query.id}`} legacyBehavior >
                                <a>
                                    <CustomBtn class="add__module" text="">
                                        <Image width={20} height={20} src={`/icons/plus.svg`} alt="course"/>
                                        <CustomTypegraphy text="Modul qo’shish" class="add__module--text"/>
                                    </CustomBtn>
                                </a>
                            </Link>
                          
                        </Grid>
                        <Grid item xs={9}>
                            <TableContainer className='srcoll' sx={{height:"250px",boxShadow:"none",padding:"0 20px 20px 20px"}} component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <StyledRow sx={{background:"#f6f6f6",borderColor:'transparent !important'}}>
                                            <TableCell  sx={{borderRadius:"6px 0 0 6px"}}><CustomTypegraphy className="table__text" variant={"span"} text={"DARS NOMI"} /></TableCell>
                                            <TableCell  ><CustomTypegraphy className="table__text" variant={"span"} text={"#ID"} /></TableCell>
                                            <TableCell  ><CustomTypegraphy className="table__text" variant={"span"} text={"UZUNLIK"} /></TableCell>
                                            <TableCell  ><CustomTypegraphy className="table__text" variant={"span"} text={"LAST EDIT"} /></TableCell>
                                            <TableCell  ><CustomTypegraphy className="table__text" variant={"span"} text={"HARAKATLAR"} /></TableCell>
                                        </StyledRow>
                                    </TableHead>
                                    <TableBody >
                                        {
                                            Module.data[0]?.data?.lessons[0] !== null ? 
                                            Module.data[0]?.data?.lessons?.map(item => (
                                                <StyledRow
                                                    key={item?.id}
                                                > 
                                                    <TableCell className='rowBorderStart' >
                                                        {item?.title}
                                                    </TableCell>
                                                    <TableCell className='rowBorderMiddle'  component="th" scope="row">
                                                        <CustomTypegraphy className="table__id" variant={"span"} text={`${item?.id}`} />
                                                    </TableCell>
                                                    <TableCell className='rowBorderMiddle' >{item?.seconds}</TableCell>
                                                    <TableCell className='rowBorderMiddle' >548 000 UZS</TableCell>
                                                    <TableCell className='rowBorderEnd' >
                                                        <Box sx={{display:"flex",alignItems:"center"}}>
                                                            <Box sx={{marginRight:"10px"}}>
                                                                <CustomBtn text="" class="table__btn" icon={<Image  src="/icons/edit.svg" width={20} height={20} alt="threeDots" />} />  
                                                            </Box>
                                                             
                                                            <CustomBtn text="" class="table__btn" icon={<Image  src="/icons/trash.svg" width={20} height={20} alt="threeDots" />} />   
                                                        </Box>            
                                                    </TableCell>
                                                </StyledRow>
                                            ))
                                            : null
                                        }
                                        
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box sx={{display:"flex",justifyContent:"end",width:"100%"}}>
                                <Link  href={`/add-lesson/${moduleId}`} legacyBehavior >
                                        <a >
                                            <CustomBtn class="add__course--btn" text="">
                                                <Image style={{marginRight:"10px"}} width={20} height={20} src={`/icons/white-plus.svg`} alt="course"/>
                                                <CustomTypegraphy text="Yangi dars qo’shish" class="add__lesson--text"/>
                                            </CustomBtn>
                                        </a>
                                </Link>
                                </Box>
                           
                        </Grid>
                    </Grid>
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

export default Course
