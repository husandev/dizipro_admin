import { Box,CircularProgress,Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import CustomBtn from '../src/Copmonents/CustomBtn';
import CustomInput from '../src/Copmonents/CustomInput';
import CustomTypegraphy from '../src/Copmonents/CustomTypegraphy';
import Image from 'next/image'
import { useDispatch,useSelector } from 'react-redux';
import instance from '../axios';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';

function Login() {

    const [userName,setUserName] = useState('')
    const [surName,setLastName] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [slider,setSlider] = useState(1)
    const [checkPhoneNumber,setCheckPhoneNumber] = useState('')
    const [code,setCode] = useState()
    const [succes,setSucces] = useState(false)
    const [message,setMessage] = useState('')
    const [loading,setLoading] = useState(true)
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        let token = localStorage.getItem('token')
        console.log(token);
        if(token){
            router.push('/courses')
        }
    },[])

    function SignUpHandler(e) {
        e.preventDefault()
        const config = {
            onUploadProgress: (progressEvent) => setLoading(progressEvent?.event?.isTrusted)
          };

        if(surName && userName && phoneNumber){
            setLoading(false)
            instance.post('api/auth/signup',
                {
                    first_name:userName,
                    phone_number:phoneNumber,
                    last_name:surName
                },config
            )
           
            .then((response) => {
                setSucces(response.data.success);
                setSlider(0)
            })
            .catch((er) => {
                console.log(er);
                if(er.response?.data?.message === "This user already exists!" && !er.response.data.success){
                    toast.warning("Bu akkaunt raqami ro'yxatdan o'tilgan!")
                    setUserName('')
                    setPhoneNumber('')
                    setLastName('')
                }
            })

            
        }
        else{
            toast.error("Ma'lumotlarni kiriting!")
        }
    
    }

    function CheckCode(e) {
        e.preventDefault()
        if(code){
            instance.post('api/auth/code/confirm/user',
            {
                code,
                phone_number:phoneNumber,
            }
            )
            .then((response) => {
                console.log(response);
            })
            .catch((er) => {
                console.log(er);
                if(er.response?.data?.message === "Code isn't valid" && !er.response.data.success){
                    toast.error("Kiritgan kodingiz xato!")
                    setCode('')
                }
            })
        }
        
        else{
            toast.error("Kodni kiriting!")
        }
       
    }

    function ResendCode() {
        if(surName && userName && phoneNumber){
            
            instance.post('api/auth/signup',
                {
                    first_name:userName,
                    phone_number:phoneNumber,
                    last_name:surName
                }
            )
            .then((response) => {
                setSucces(response.data.success);
                toast.success("Boshqa kod jo'natildi")
            })
            .catch((er) => {
                console.log(er);
                setMessage(er.response.data.message);
                setSucces(er.response.data.success);
            })
        }
    }


    return (
        <Box>
            <Grid container spacing={2}>
                <ToastContainer />
                <Grid sx={{height:"102vh",borderRadius:"0px 64px 64px 0px",borderRight: "1px solid rgba(0, 0, 0, 0.16)",background:"#fff"}} item xs={6}>
                    
                    <Box sx={{padding:"24px 0 0  180px"}}>
                        <Image src="/icons/dizipro-logo.svg" width={128} height={36} alt="logo"/>
                    </Box>
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:'center',height:"94vh"}}>
                        <Box sx={{width:"400px",overflow:"hidden"}}>
                            <Box sx={{width:"1200px",display:"flex",transition:"all 0.4s ease",transform:`translateX(-${slider * 400}px)`}}>
                           
                                <Box sx={{width:"33.4%"}}>
                                    <CustomTypegraphy text="Kodni kiriting" class="login__title"/>
                                    <Box sx={{display:"flex",alignItems:'center',marginBottom:'26px'}}>
                                        <CustomTypegraphy text={`${phoneNumber} raqamiga SMS-kod yuborildi`} class="login__desc"/>
                                    </Box>
                                    <form onSubmit={CheckCode}>
                                        <CustomInput type={"number"} val={code} handleChange={setCode} label_text={"Kod"} placeholder="XXXXXX"/>
                                        <Box sx={{display:"flex",alignItems:'center',marginBottom:'26px'}}>
                                            <CustomTypegraphy text="Kod kelmadimi?" class="login__desc"/>
                                            <Box onClick={()=> ResendCode()}>
                                                <CustomTypegraphy  text="Boshqa kod jo'natish" class="login__link" />  
                                            </Box>
                                            
                                        </Box>
                                        <CustomBtn  class="login__btn" text="Davom etish"/>
                                    </form>
                                </Box>
                                <Box sx={{width:"33.4%"}}>
                                    <CustomTypegraphy text="Akkaunt yaratish" class="login__title"/>
                                    <Box sx={{display:"flex",alignItems:'center',marginBottom:'26px'}}>
                                        <CustomTypegraphy text="Akkauntingiz bormi?" class="login__desc"/>
                                        <Box onClick={()=> setSlider(2)}>
                                            <CustomTypegraphy  text="Kirish" class="login__link" />  
                                        </Box>
                                        
                                    </Box>
                                    <form onSubmit={SignUpHandler}>
                                        <Box sx={{display:"flex"}}>
                                            <Box sx={{width:"50%"}}>
                                                <CustomInput type={"text"} val={userName} handleChange={setUserName} label_text={"Ism"} placeholder="Ism"/>
                                            </Box>
                                            <Box sx={{width:"50%",paddingLeft:"10px"}}>
                                                <CustomInput type={"text"} val={surName} handleChange={setLastName} label_text={"Familya"} placeholder="Familya"/>
                                            </Box>
                                        </Box>
                                        <CustomInput type={"number"} val={phoneNumber} handleChange={setPhoneNumber} label_text={"Telefon raqam"} placeholder="+998"/>
                                        {
                                            loading ?  <CustomBtn class="login__btn" text="Akkaunt ochish"/> :  
                                            <CustomBtn class="login__btn--loader" text="" icon={<CircularProgress style={{width:"26px",height:"26px"}}/>} />
                                        }
                                       
                                    </form>
                                </Box>
                                <Box sx={{width:"33.4%"}}>
                                    <CustomTypegraphy text="Kirish" class="login__title"/>
                                    <Box sx={{display:"flex",alignItems:'center',marginBottom:'26px'}}>
                                        <CustomTypegraphy text="Akkauntingiz yo’qmi?" class="login__desc"/>
                                        <Box onClick={()=> setSlider(1)}>
                                            <CustomTypegraphy  text="Akkaunt yaratish" class="login__link" />  
                                        </Box>
                                    </Box>
                                    <form>
                                        <CustomInput type={"number"} val={checkPhoneNumber} handleChange={setCheckPhoneNumber} label_text={"Telefon raqam"} placeholder="+998"/>
                                        <CustomBtn class="login__btn" text="Davom etish"/>
                                    </form>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                
                </Grid>
                <Grid  item xs={6} sx={{display:'flex',alignItems:"center",justifyContent:"center"}}>
                    <Image src="/icons/login-bg.png" width={564} height={676} alt="login-bg"/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Login;
