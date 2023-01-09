import { Box,FormControl,InputLabel,MenuItem,Modal, Select } from '@mui/material'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomBtn from '../../src/Copmonents/CustomBtn'
import CustomTypegraphy from '../../src/Copmonents/CustomTypegraphy'
import Link from "next/link"
import { useRouter } from 'next/router'
import { getUser, user } from '../../src/Slices/get_user'
import CircularProgress from '@mui/material/CircularProgress';
import { courses, getCourses } from '../../src/Slices/get_courses'
import { AddCourseToUser } from '../../src/Slices/add_course_to_user'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    outline:"none",
    borderRadius:"5px"
  };

function User() {
    const SingleUser = useSelector(user)
    const router = useRouter()
    const dispatch = useDispatch()
    const get_user_status = useSelector((state) => state.get_user.status)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const courseStatus = useSelector((state) => state.get_courses.status)
    const coursesData = useSelector(courses)
  
    const [course, setCourse] = React.useState('');

    const handleChange = (event) => {
        setCourse(event.target.value);
    };


    


    useEffect(()=> {
        if(router.isReady){
            dispatch(getUser(router.query.id))
        }
       
    },[router.query.id])

    useEffect(()=> {
        if(courseStatus === "idle"){
            dispatch(getCourses())
        }
    },[courseStatus])

    function AddCourseHandler(e) {
        e.preventDefault()
        if(course){
            dispatch(
                AddCourseToUser(
                    {
                        user_id:router.query.id,
                        course_id:course
                    }
                )
            )
            setCourse('')
            handleClose( )
        }
    }

    if(get_user_status === "succeeded"){
        return (
            <Box>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <form onSubmit={AddCourseHandler}>
                            <FormControl sx={{marginBottom:"10px"}} fullWidth>
                                <InputLabel id="demo-simple-select-label">Kurslar</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={course}
                                    label="Kurs"
                                    onChange={handleChange}
                                >
                                    {
                                        coursesData?.map(item => (
                                            <MenuItem key={item.course_id} value={item.course_id}>{item.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <CustomBtn   text={"Qo'shish"} class="course__add" />
                        </form>
                      
                    </Box>
                </Modal>

                <Box sx={{background:"#fff",padding:"24px",boxShadow:" 0px 2px 2px rgba(0, 0, 0, 0.04)",borderRadius: "8px",marginBottom:"16px"}}>
                    <Box sx={{display:"flex", aligntems: "center",justifyContent: "space-between"}}>
                        <Box sx={{display:"flex",alignItems:"center"}}>
                            <CustomTypegraphy text={`${SingleUser?.first_name} ${SingleUser?.last_name}`} class="user_name" component="h2"></CustomTypegraphy>
                            <CustomTypegraphy text={`#${SingleUser?.user_id}`} class="user_id" component="h3"></CustomTypegraphy>
                        </Box>
                        <CustomBtn text="" class="user_dots" icon={<Image style={{transform: "rotate(90deg)"}}  src="/icons/DotsThree.svg" width={22} height={22} alt="threeDots"/>} />
                    </Box>
                </Box>
    
                <Box sx={{display:'flex',justifyContent: "space-between",marginBottom:"16px"}}>
                    <Box sx={{background:"#fff",borderRadius:"8px",padding:"24px 20px",boxShadow:" 0px 2px 2px rgba(0, 0, 0, 0.04)",width:"320px"}}>
                        <CustomTypegraphy text="Telefon raqam" class="user__sub--title" component="p"></CustomTypegraphy>
                        {
                            SingleUser ?  <CustomTypegraphy text={`+${SingleUser?.phone_number.slice(0,3)} (${SingleUser?.phone_number.slice(3,5)}) ${SingleUser?.phone_number.slice(5,8)}-${SingleUser?.phone_number.slice(8,10)}-${SingleUser?.phone_number.slice(10,12)}`} class="user__info" component="h3"></CustomTypegraphy> : null
                        }
                       
                    </Box>
                    <Box sx={{background:"#fff",borderRadius:"8px",padding:"24px 20px",boxShadow:" 0px 2px 2px rgba(0, 0, 0, 0.04)",width:"320px"}}>
                        <CustomTypegraphy text="Ism va Familiya" class="user__sub--title" component="p"></CustomTypegraphy>
                        <CustomTypegraphy text={`${SingleUser?.first_name} ${SingleUser?.last_name}`} class="user__info" component="h3"></CustomTypegraphy>
                    </Box>
                    <Box sx={{background:"#fff",borderRadius:"8px",padding:"24px 20px",boxShadow:" 0px 2px 2px rgba(0, 0, 0, 0.04)",width:"320px"}}>
                        <CustomTypegraphy text="Tug'ilgan Sana" class="user__sub--title" component="p"></CustomTypegraphy>
                        <CustomTypegraphy text="Ma’lumot kiritilmagan" class="user__info--empty" component="h3"></CustomTypegraphy>
                    </Box>
                    <Box sx={{background:"#fff",borderRadius:"8px",padding:"24px 20px",boxShadow:" 0px 2px 2px rgba(0, 0, 0, 0.04)",width:"320px"}}>
                        <CustomTypegraphy text="Jins" class="user__sub--title" component="p"></CustomTypegraphy>
                        <CustomTypegraphy text="Ma’lumot kiritilmagan" class="user__info--empty" component="h3"></CustomTypegraphy>
                    </Box>
                </Box>
                
                <Box sx={{background: "#fff",borderRadius:"12px",padding:"20px"}}>
                    {
                        <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>   
                            <CustomTypegraphy text="Kurslar" class="course__title" component="h3"></CustomTypegraphy>
                            <Box onClick={handleOpen}>
                                <CustomBtn  text={"Kurs qo'shish"} class="course__add--btn" />
                            </Box>
                            
                        </Box>
                    }

                     {
                        SingleUser.courses.map(item => (
                            <Box sx={{background:"#fff",border:"1.5px solid #d9d9d9",display:"flex",borderRadius:"10px",padding:"12px",marginBottom:"16px"}}>
                                <Box sx={{display:"flex",alignItems:"center"}}>
                                    <Image style={{borderRadius:"10px",objectFit:"cover",marginRight:"24px"}} src={`https://web.diziproedu.uz/uploads/images/${item.images[0].src}`} width={181} height={103} alt="course"></Image>
                                    <Box sx={{width:"265px",borderRight:"1px solid rgba(0, 0, 0, 0.1)",marginRight:"24px"}} >
                                        <CustomTypegraphy text={item.name} class="course__name" component="p"></CustomTypegraphy>
                                        <Box sx={{display:"flex",alignItems:"center",marginBottom:"8px"}}>
                                            <Image style={{marginRight:"3px"}} src={`/icons/clock.svg`} width={16} height={16} alt="clock"></Image>
                                            <CustomTypegraphy text={`${item.total_hours} soat`} class="course__time" component="p"></CustomTypegraphy>
                                            <Box sx={{margin:"0 6px"}}>
                                            •
                                            </Box>
                                            <CustomTypegraphy text={`${34} modul`} class="course__time" component="p"></CustomTypegraphy>
                                            <Box sx={{margin:"0 6px"}}>
                                            •
                                            </Box>
                                            <CustomTypegraphy text={`${item.total_lessons} dars`} class="course__time" component="p"></CustomTypegraphy>
                                        </Box>
                                        <Box sx={{display:"flex",alignItems:"center"}}>
                                            <Image style={{borderRadius:'50%',objectFit:"cover",marginRight:"4px"}} src="/icons/course.jpg" width={25} height={25} alt="avatar"></Image>
                                            <CustomTypegraphy text={"Andrei Neagoie"} class="course__user--name" component="h3"></CustomTypegraphy>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{display:"flex",flexDirection:"column",justifyContent: "center",width:"265px",marginRight:"24px",borderRight:"1px solid rgba(0, 0, 0, 0.1)"}}>
                                    <CustomTypegraphy text="To’lov turi" class="course__price--title" component="p"></CustomTypegraphy>
                                    <CustomTypegraphy text="Naqd" class="course__price--type" component="p"></CustomTypegraphy>
                                    <CustomTypegraphy text="To’lov raqami" class="course__price--title" component="p"></CustomTypegraphy>
                                    <Link href={"#"} legacyBehavior>
                                        <a >
                                            <CustomTypegraphy text="#1234542" class="course__price--number" component="p"></CustomTypegraphy>
                                        </a>
                                    </Link>
                                
                                </Box>
                                <Box sx={{display:"flex",flexDirection:"column",justifyContent: "center",width:"265px",marginRight:"24px",borderRight:"1px solid rgba(0, 0, 0, 0.1)"}}>
                                    <CustomTypegraphy text="Last activity" class="course__price--title" component="p"></CustomTypegraphy>
                                    <CustomTypegraphy text="14:17, 12.11.2022" class="course__price--type" component="p"></CustomTypegraphy>
                                    <CustomTypegraphy text="Sotib olingan" class="course__price--title" component="p"></CustomTypegraphy>
                                    <CustomTypegraphy text="14:17, 12.11.2022" class="course__price--type" component="p"></CustomTypegraphy>
                                </Box>
                                <Box sx={{display:"flex",flexDirection:"column",justifyContent: "center",width:"265px",marginRight:"24px"}}>
                                    <CustomTypegraphy text="Progress" class="course__price--title" component="p"></CustomTypegraphy>
                                    <Box sx={{marginBottom:"16px",display:"flex",alignItems:"center"}}>
                                        <CustomTypegraphy text="92%" class="course__progress" component="p"></CustomTypegraphy>
                                        <Box sx={{width:"120px",height:"6px",background:"#e8e8e8",borderRadius:"30px",position:"relative"}}>
                                            <Box sx={{width:"92%",height:"100%",position:'absolute',left:"0",top:"0",borderRadius:"30px",background:"#2dcc13"}} />
                                        </Box>
                                    </Box>
                                    <CustomTypegraphy text="Hozirgi dars" class="course__price--title" component="p"></CustomTypegraphy>
                                    <CustomTypegraphy text="11. Rendering jarayoni" class="course__price--type" component="p"></CustomTypegraphy>
                                </Box>
                            </Box>
                        ))
                     }
                    
                   
                   
                </Box>
            </Box>
        )
    }

    else{
        return(
            <Box sx={{height:"93vh",display:"flex",alignItems:"center", justifyContent:"center",overflow:"hidden"}}>
               <CircularProgress />
            </Box>
        )
    }

  
}

export default User
