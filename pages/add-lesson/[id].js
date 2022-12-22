import { Box, CircularProgress, Grid, } from "@mui/material"
import CustomBtn from "../../src/Copmonents/CustomBtn"
import CustomTypegraphy from "../../src/Copmonents/CustomTypegraphy"
import { useDispatch } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import { addModule } from "../../src/Slices/add_module"
import { useState } from "react";
import CustomInput from "../../src/Copmonents/CustomInput";
import { addLesson } from "../../src/Slices/add_lesson";
import { useRouter } from 'next/router'

function AddLesson() {
 const [moduleName,setModuleName] = useState('')
 const [desc,setDesc] = useState('')
 const [lessonIndex,setLessonIndex] = useState('')
 const [url,setUrl] = useState('')
 const [lessonLength,setLessonLength] = useState('')
 const router = useRouter()  
  const dispatch = useDispatch()

  function FormHandler(e) {
    e.preventDefault()
    if(moduleName && desc  && lessonIndex && url && lessonLength){
      dispatch(addLesson(
        {
          title:moduleName,
          body:desc,
          video_url:url,
          index:lessonIndex,
          module_id:router.query.id,
          seconds:lessonLength
        }
      ))
      setModuleName("")
      setDesc("")
      setUrl("")
      setLessonLength("")
      setLessonIndex("")
      toast.success("Module qo'shildi");
    }
    else{
      toast.error("Iltimos ma'lumotlarni kiriting!");
    }
  }
  // 820fc03e-cdba-4791-ab15-7e7f8dd6dcf2

  return (
    <Box>
        <ToastContainer pauseOnHover={false} closeOnClick={false} autoClose={4000} />
        <form  onSubmit={FormHandler} >
          <Grid  container spacing={2} >
            <Grid item xs={12}>
              <Box className="srcoll" sx={{background:"#fff",height:"700px",overflowY:"scroll",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.03)",borderRadius:"6px",padding:"32px"}}>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingBottom:"24px",borderBottom:"1px solid #e8e8e9",marginBottom:"28px"}}>
                  <CustomTypegraphy text="Darslik qo’shish" class="add__course--title"/>
                  <CustomBtn  text="Darslikni chiqarish" class="add__course--btn"/>
                </Box>  
                <Box sx={{display:"flex",width:"100%",flexWrap:"wrap"}}>
                    <CustomInput handleChange={setModuleName} val={moduleName} label_text={"Darslik nomi"} type={"text"} placeholder={"Darslik nomini kiriting"}/>
                    <CustomInput handleChange={setDesc} val={desc} label_text={"Tavsif"} type={"text"} placeholder={"Tavsif kiriting"}/>
                    <CustomInput handleChange={setLessonIndex} val={lessonIndex} label_text={"index"} type={"number"} placeholder={"index sonini kiriting"}/>
                    <CustomInput handleChange={setLessonLength} val={lessonLength} label_text={"Dars uzunligi"} type={"number"} placeholder={"Dars uzunligini kiriting"}/>
                    <CustomInput handleChange={setUrl} val={url} label_text={"Dars linki"} type={"text"} placeholder={"Dars linkini kiriting"}/>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
    </Box>
  )
  
}

export default AddLesson
