import { Box,Grid } from "@mui/material"
import CustomBtn from "../../src/Copmonents/CustomBtn"
import CustomInput  from "../../src/Copmonents/CustomInput"
import CustomTypegraphy from "../../src/Copmonents/CustomTypegraphy"
import {  useState } from "react"
import { useDispatch } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import { addModule } from "../../src/Slices/add_module"
import { useRouter } from 'next/router'

function AddModule() {
 const [moduleName,setModuleName] = useState('')
 const [desc,setDesc] = useState('')
 const [lessonCount,setLessonCount] = useState('')
 const [courseIndex,setCourseIndex] = useState('')
 const router = useRouter()
  const dispatch = useDispatch()

  function FormHandler(e) {
    e.preventDefault()
    if(moduleName && desc && lessonCount && courseIndex && router.query.id){
      dispatch(addModule(
        {
          title:moduleName,
          description:desc,
          lessons_count:lessonCount,
          course_id:router.query.id,
          index:courseIndex
        }
      ))
      setModuleName("")
      setDesc("")
      setLessonCount("")
      toast.success("Module qo'shildi");
    }
    else{
      toast.error("Iltimos ma'lumotlarni kiriting!");
    }
  }


  return (
    <Box>
        <ToastContainer pauseOnHover={false} closeOnClick={false} autoClose={4000} />
        <form  onSubmit={FormHandler} >
          <Grid  container spacing={2} >
            <Grid item xs={12}>
              <Box className="srcoll" sx={{background:"#fff",height:"700px",overflowY:"scroll",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.03)",borderRadius:"6px",padding:"32px"}}>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingBottom:"24px",borderBottom:"1px solid #e8e8e9",marginBottom:"28px"}}>
                  <CustomTypegraphy text="Module qo’shish" class="add__course--title"/>
                  <CustomBtn  text="Moduleni chiqarish" class="add__course--btn"/>
                </Box>  
                <Box sx={{display:"flex",width:"100%",flexWrap:"wrap"}}>
                    <CustomInput handleChange={setModuleName} val={moduleName} label_text={"Module nomi"} type={"text"} placeholder={"Module nomini kiriting"}/>
                    <CustomInput handleChange={setDesc} val={desc} label_text={"Tavsif"} type={"text"} placeholder={"Tavsif kiriting"}/>
                    <CustomInput handleChange={setLessonCount} val={lessonCount} label_text={"Darslar soni"} type={"number"} placeholder={"Darslar sonini kiriting"}/>
                    <CustomInput handleChange={setCourseIndex} val={courseIndex} label_text={"Tartib raqam"} type={"number"} placeholder={"Tartib raqamni kiriting"}/>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
    </Box>
  )
  
}

export default AddModule
