import { Box,Button,FormControl,InputLabel,MenuItem,Modal, Select } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomBtn from '../../src/Copmonents/CustomBtn'
import CustomTypegraphy from '../../src/Copmonents/CustomTypegraphy'
import Link from "next/link"
import { useRouter } from 'next/router'
import { getUser, user } from '../../src/Slices/get_user'
import CircularProgress from '@mui/material/CircularProgress';
import { courses, getCourses } from '../../src/Slices/get_courses'
import { AddCourseToUser } from '../../src/Slices/add_course_to_user'
import { deleteCourse } from '../../src/Slices/delete_course'
import { getCourse,course } from '../../src/Slices/get_course'
import instance from '../../axios'
import EditIcon from '@mui/icons-material/Edit';
import CustomInput from '../../src/Copmonents/CustomInput'
import { updateUser } from '../../src/Slices/update_user'
import { blockUnblock, blockUser } from '../../src/Slices/block_user'
import { unBlockUser } from '../../src/Slices/unblock_user'
import { deleteUser } from '../../src/Slices/delete_user'

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

const editModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    outline:"none",
    borderRadius:"5px"
}

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
    const [refresh,setRefresh] = useState(true)
    const [oneCourse, setOneCourse] = React.useState('');
    const deleteCourseStatus = useSelector((state) => state.delete_course.status)
    const addCourseStatus = useSelector((state) => state.add_course_to_user.status)
    const blockStatus = useSelector((state) => state.block_user.status)
    const unblockStatus = useSelector((state) => state.unblock_user.status)
    const [editModal,setEditModal] = useState(false)
    const [userName,setUserName] = useState('')
    const [surName,setSurName] = useState('')
    const [phoneNumberOrEmail,setPhoneNumberOrEmail] = useState('')
    const [gender,setGender] = useState('')
    const EMAIL_REGEX = new RegExp("^[a-zA-Z][-_.a-zA-Z0-9]{5,29}@g(oogle)?mail.com$");
    const regexBase = '(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})?[-. )]*(\\d{3})[-. ]*(\\d{4,5})(?: *x(\\d+))?';
    const phoneRegex = new RegExp('\\s*' + regexBase + '\\s*', 'g');
    const handleChange = (event) => {
        setOneCourse(event.target.value);
    };
    

    useEffect(()=> {
        if(router.isReady){
            dispatch(getUser(router.query.id))
        }
    },[router.query.id,addCourseStatus,deleteCourseStatus,unblockStatus,blockStatus])

    useEffect(()=> {
        if(courseStatus === "idle"){
            dispatch(getCourses())
        }
        
    },[courseStatus])

    function removeCourse(id) {
        setRefresh(!refresh)
        dispatch(deleteCourse({user_id:router.query.id, course_id:id}))
    }

    function AddCourseHandler(e) {
        e.preventDefault()
        setRefresh(!refresh)
        if(oneCourse){
            dispatch(
                AddCourseToUser(
                    {
                        user_id:router.query.id,
                        course_id:oneCourse
                    }
                )
            )
            setOneCourse('')
            handleClose( )
            
        }
    }

    function EditGender(val) {
        setGender(val)
    }


    function UpdateUser() {
        if(userName || surName || phoneNumberOrEmail || gender){
            
            if(!phoneRegex.test(phoneNumberOrEmail)){
                dispatch(updateUser(
                    {
                        id:router.query.id,
                        body:{
                            first_name:userName ? userName : SingleUser.first_name,
                            last_name:surName ? surName : SingleUser.last_name,
                            email:phoneNumberOrEmail ? phoneNumberOrEmail : SingleUser.email,
                            gender:gender ? gender : SingleUser.gender
                        }
                    }
                ))
            }
            else{
                dispatch(updateUser(
                    {
                        id:router.query.id,
                        body:{
                            first_name:userName ? userName : SingleUser.first_name,
                            last_name:surName ? surName : SingleUser.last_name,
                            phone_number:phoneNumberOrEmail ? phoneNumberOrEmail : SingleUser.phone_number,
                            gender:gender ? gender : SingleUser.gender
                        }
                    }
                ))
            }
            setSurName("")
            setUserName("")
            setPhoneNumberOrEmail("")
            setGender("")
            setEditModal(false)
        }
    }

    function UpdateUserBlock(status) {
        if(status){
            dispatch(blockUser(router.query.id))
        }
        else{
            dispatch(unBlockUser(router.query.id))
        }
        setRefresh(!refresh)
    }
    
    function DeleteUser() {
        dispatch(deleteUser(router.query.id))
        router.push('/users')
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
                                    value={oneCourse}
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
                <Modal
                    open={editModal}
                    onClose={() => setEditModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={editModalStyle}>
                        <form onSubmit={UpdateUser} >
                       
                            <Box sx={{display:"flex",flexFlow:"wrap"}}>
                                <Box sx={{width:"50%"}}>
                                    <CustomInput placeholder={"Ism kiriting"} type={"text"} label_text={"Ism"} handleChange={setUserName} val={userName}/>
                                </Box>
                                <Box sx={{width:"50%"}}>
                                    <CustomInput placeholder={"Familya kiriting"} type={"text"} label_text={"Familya"} handleChange={setSurName} val={surName}/>
                                </Box>
                                <Box sx={{width:"50%"}}>
                                    <CustomInput placeholder={"Telefon raqam yoki email kiriting"} type={"text"} label_text={"Telefon raqam yoki email"} handleChange={setPhoneNumberOrEmail} val={phoneNumberOrEmail}/>
                                </Box>  
                                <Box sx={{width:"50%"}}>
                                <label style={{marginBottom:"10px",display:"block"}} >Jinsni tanlang</label>
                                    <FormControl fullWidth size='small'>
                                        <InputLabel id="demo-simple-select-label">Jins</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={gender}
                                            label="Jins"
                                            onChange={(e)=> EditGender(e.target.value)}
                                        >
                                          <MenuItem  value="m" >Erkak</MenuItem>
                                          <MenuItem  value="f" >Ayol</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box> 
                                
                            </Box>
                            <Box sx={{display:"flex",justifyContent:'space-between'}}>
                                <CustomBtn   text={"O'zgartirish"} class="course__add" />
                            </Box>
                            
                        </form>
                      
                    </Box>
                </Modal>

                <Box sx={{background:"#fff",padding:"24px",boxShadow:" 0px 2px 2px rgba(0, 0, 0, 0.04)",borderRadius: "8px",marginBottom:"16px"}}>
                    <Box sx={{display:"flex", aligntems: "center",justifyContent: "space-between"}}>
                        <Box sx={{display:"flex",alignItems:"center"}}>
                            <CustomTypegraphy text={`${SingleUser?.first_name} ${SingleUser?.last_name}`} class="user_name" component="h2"></CustomTypegraphy>
                            <CustomTypegraphy text={`#${SingleUser?.user_id}`} class="user_id" component="h3"></CustomTypegraphy>
                        </Box>
                        <Box sx={{display:'flex',alignItems:"center"}}>
                            <Box  sx={{marginRight:"10px"}}>
                                <Button sx={{marginRight:'10px'}} variant="outlined" color="error" onClick={DeleteUser} >
                                    O'chirish
                                </Button>
                                {
                                    SingleUser?.is_blocked ? 
                                        <Button variant="outlined" onClick={()=> UpdateUserBlock(false)}  >
                                            Blokdan chiqarish
                                        </Button>
                                    :   
                                        <Button variant="outlined" color="error" onClick={()=> UpdateUserBlock(true)} >
                                            Bloklash
                                        </Button>
                                }
                        
                              
                            </Box>
                            <Box onClick={()=> setEditModal(true)}>
                                <CustomBtn text="" class="user_dots" icon={<EditIcon />} />
                            </Box>
                        </Box>
                        
                        
                    </Box>
                </Box>
    
                <Box sx={{display:'flex',justifyContent: "space-between",marginBottom:"16px"}}>
                    <Box sx={{background:"#fff",borderRadius:"8px",padding:"24px 20px",boxShadow:" 0px 2px 2px rgba(0, 0, 0, 0.04)",width:"320px"}}>
                        <CustomTypegraphy text="Telefon raqam" class="user__sub--title" component="p"></CustomTypegraphy>
                        {
                            SingleUser ?  <CustomTypegraphy text={`${SingleUser?.phone_number}`} class="user__info" component="h3"></CustomTypegraphy> : null
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
                        SingleUser?.courses?.map(item => (
                            <Box key={item.id} sx={{background:"#fff",border:"1.5px solid #d9d9d9",display:"flex",borderRadius:"10px",padding:"12px",marginBottom:"16px"}}>
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
                                    <Box onClick={()=> removeCourse(item.id)}>
                                        <CustomBtn  text={"Kurs O'chirish"} class="course__remove--btn" />
                                    </Box>
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
