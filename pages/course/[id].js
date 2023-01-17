import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomBtn from '../../src/Copmonents/CustomBtn'
import CustomTypegraphy from '../../src/Copmonents/CustomTypegraphy'
import { course, getCourse } from '../../src/Slices/get_course'
import {Box, CircularProgress, Grid, List, ListItem ,TableContainer,Paper ,Table,TableHead,styled,TableRow,TableCell,TableBody, Modal, Button, Typography } from "@mui/material"
import { getModules, modules } from '../../src/Slices/get_modules'
import { getModule, module } from '../../src/Slices/get_module'
import Link from 'next/link'
import { deleteLesson } from '../../src/Slices/delete_lesson'
import { deleteModule } from '../../src/Slices/delete_module'
import CustomInput from '../../src/Copmonents/CustomInput'
import { updateLesson } from '../../src/Slices/update_lesson'
import { getLesson, lesson } from '../../src/Slices/get_lesson'


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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    outline:"none",
    boxShadow: 24,
    p: 2,
    borderRadius:"5px",
  };

  const updateModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    outline:"none",
    boxShadow: 24,
    p: 2,
    borderRadius:"5px",
  };



function Course() {

    const courseData = useSelector(course)
    const courseStatus = useSelector((state) => state.get_course.status)
    const modulesStatus = useSelector((state) => state.get_modules.status)
    const Module = useSelector((state) => state.get_module)
    const [moduleId,setModuleId] = useState('')
    const [active,setActive] = useState(1)
    const dispatch = useDispatch()
    const lessonData = useSelector(lesson)
    const router = useRouter()
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [lessonId,setLessonId] = useState('')
    const [moduleName,setModuleName] = useState('')
    const [moduleDesc,setModuleDesc] = useState('')
    const [moduleIndex,setModuleIndex] = useState('')
    const [moduleLength,setModuleLength] = useState('')
    const [moduleLink,setModuleLink] = useState('')
    const [updateLessonId,setUpdateLessonId] = useState('')
    const [updateModal,setUpdateModal] = useState(false)
    const CloseUpdateModal = () => {
        setUpdateModal(false);
        setModuleLink('')
        setModuleLength('')
        setModuleIndex('')
        setModuleDesc('')
        setModuleName('')
    }
    const OpenUpdateModal = () => setUpdateModal(true);
    
    useEffect(() => {
        if(router.isReady){
    
            dispatch(getCourse(router.query.id))
            // router.reload(router.pathname)
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
        dispatch(getModule(courseData?.modules[0]?.id))
        setModuleId(courseData?.modules[0]?.id)
    },[courseData])

    function ModuleHandler(item,id) {
        setActive(id)
        setModuleId(item.id)
        console.log(item,"course");
        dispatch(getModule(item.id))
    }

    function DeleteHandler() {
        if(lessonId){
            dispatch(deleteLesson(lessonId))
            setLessonId('')
        }
        else if(moduleId){
            dispatch(deleteModule(moduleId))
            setModuleId('')
        }
        handleClose()
    }

    function handleOpen() {
        setOpen(true)
    }

    
  
    function formHandler(e) {
        e.preventDefault()
        dispatch(updateLesson(
            {
                id:updateLessonId,
                body:{
                    title:moduleName ? moduleName : lessonData.title,
                    body:moduleDesc ? moduleDesc : lessonData.body,
                    video_url:moduleLink ? moduleLink : lessonData.video_url,
                    index:moduleIndex ? moduleIndex.toString() : lessonData.index.toString(),
                    module_id:lessonData?.module_id,
                    seconds:moduleLength ? moduleLength.toString() : lessonData.seconds.toString()
                }
               
            }
        ))
        CloseUpdateModal()
    }

    if(courseStatus === "succeeded"){
        return (
            <Box>
                <Box sx={{boxShadow:"0px 2px 2px rgba(0, 0, 0, 0.04)",borderRadius:"8px",background:"#fff",padding:"24px"}}>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                       
                        <Box sx={style}>
                            <Box sx={{display:"flex",justifyContent:'space-between'}}>
                                <Button onClick={handleClose} variant="outlined">Orqaga</Button>
                                <Button onClick={()=> DeleteHandler()} variant="outlined" color="error">O'chirish</Button>
                            </Box>
                           
                        </Box>
                    </Modal>
                    <Modal
                        open={updateModal}
                        onClose={CloseUpdateModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                       <Box>
                            <Box sx={updateModalStyle}>
                                <form onSubmit={formHandler}>
                                    <Box sx={{display:"flex",flexFlow:"wrap"}}>
                                        <Box sx={{width:"50%"}}>
                                            <CustomInput handleChange={setModuleName} val={moduleName} label_text={"Darslik nomi"} type={"text"} placeholder={"Darslik nomini kiriting"}/>
                                        </Box>
                                        <Box sx={{width:"50%"}}>
                                            <CustomInput handleChange={setModuleDesc} val={moduleDesc} label_text={"Tavsif"} type={"text"} placeholder={"Tavsif kiriting"}/>
                                        </Box>
                                        <Box sx={{width:"50%"}}>
                                            <CustomInput handleChange={setModuleIndex} val={moduleIndex} label_text={"Index"} type={"text"} placeholder={"Index kiriting"}/>
                                        </Box>
                                        <Box sx={{width:"50%"}}>
                                            <CustomInput handleChange={setModuleLength} val={moduleLength} label_text={"Dars uzunligi"} type={"text"} placeholder={"Dars uzunligini kiriting"}/>
                                        </Box>
                                        <Box sx={{width:"50%"}}>
                                            <CustomInput handleChange={setModuleLink} val={moduleLink} label_text={"Dars linki"} type={"text"} placeholder={"Dars linkini kiriting"}/>
                                        </Box>
                                    </Box>
                                    <Box sx={{display:"flex",justifyContent:'space-between'}}>
                                        <Box onClick={CloseUpdateModal} sx={{width:"100%",marginRight:"5px",}}>
                                            <CustomBtn class="add__module" text="">
                                                <CustomTypegraphy text="Orqaga" class="add__module--text"/>
                                            </CustomBtn>
                                        </Box>
                                        <Box sx={{width:"100%",marginLeft:"5px",display:"flex",alignItems:"flex-end",justifyContent:"flex-end"}}>
                                            <CustomBtn class="update__lesson" text="">
                                                <CustomTypegraphy text="O'zgartirish" class="add__lesson--text"/>
                                            </CustomBtn>
                                        </Box>
                                    
                                    
                                    </Box>
                                </form>
                         
                                
                            </Box> 
                            
                       </Box>
                       
                    </Modal>
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
                                            {/* <CustomTypegraphy text="7" class="module__lesson"/> */}
                                            <Box onClick={()=>{handleOpen();setModuleId(item.id)}}>
                                                <CustomBtn text="" class="table__btn" icon={<Image  src="/icons/trash.svg" width={20} height={20} alt="threeDots" />} />   
                                            </Box>
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
                                                        <CustomTypegraphy className="table__id" variant={"span"} text={`${item?.index}`} />
                                                    </TableCell>
                                                    <TableCell className='rowBorderMiddle' >{item?.seconds}</TableCell>
                                                    <TableCell className='rowBorderMiddle' >548 000 UZS</TableCell>
                                                    <TableCell className='rowBorderEnd' >
                                                        <Box sx={{display:"flex",alignItems:"center"}}>
                                                            <Box onClick={()=>{OpenUpdateModal();setUpdateLessonId(item.id);dispatch(getLesson(item.id))}} sx={{marginRight:"10px"}}>
                                                                <CustomBtn text="" class="table__btn" icon={<Image  src="/icons/edit.svg" width={20} height={20} alt="threeDots" />} />  
                                                            </Box>
                                                             <Box onClick={()=>{handleOpen();setLessonId(item.id)}}>
                                                                <CustomBtn text="" class="table__btn" icon={<Image  src="/icons/trash.svg" width={20} height={20} alt="threeDots" />} />   
                                                             </Box>
                                                        </Box>            
                                                    </TableCell>
                                                </StyledRow>
                                            ))
                                            : null
                                        }
                                        
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {
                                moduleId !== undefined ?       <Box sx={{display:"flex",justifyContent:"end",width:"100%"}}>
                                <Link  href={`/add-lesson/${moduleId}`} legacyBehavior >
                                        <a >
                                            <CustomBtn class="add__course--btn" text="">
                                                <Image style={{marginRight:"10px"}} width={20} height={20} src={`/icons/white-plus.svg`} alt="course"/>
                                                <CustomTypegraphy text="Yangi dars qo’shish" class="add__lesson--text"/>
                                            </CustomBtn>
                                        </a>
                                </Link>
                                </Box> : null
                            }
                      
                           
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
