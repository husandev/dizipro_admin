import { Box, Chip, CircularProgress, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material"
import CustomBtn from "../src/Copmonents/CustomBtn"
import CustomInput, { StyledInput } from "../src/Copmonents/CustomInput"
import CustomTypegraphy from "../src/Copmonents/CustomTypegraphy"
import Image from 'next/image'
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addCourses } from "../src/Slices/add_course"
import { styled } from '@mui/system';
import { categories, getCategories } from "../src/Slices/get_categories"
import { authors, getAuthors } from "../src/Slices/get_authors"
import { getModules, modules } from "../src/Slices/get_modules"
import { useTheme } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function addCourse() {
  const [courseName,setCourseName] = useState("")
  const [description,setDescription] = useState("")
  const [lessonHour,setLessonHour] = useState("")
  const [lessonCount,setLessonCount] = useState("")
  const [categoriesVal,setCategoriesVal] = useState("")
  const [price,setPrice] = useState('')
  const CategoryStatus = useSelector((state) => state.get_categories.status)
  const AuthorsStatus = useSelector((state) => state.get_authors.status)
  const ModulesStatus = useSelector((state) => state.get_modules.status)
  const ModulesData = useSelector(modules)
  const AuthorsData = useSelector(authors)
  const categoriesData = useSelector(categories)
  const [img,setImg] = useState("")
  const dispatch = useDispatch()
  const [authorsVal,setAuthorsVal] = useState([])
  const [modulesVal,setModulesVal] = useState([])
  const theme = useTheme();
  const formRef = useRef();
  const [url,setUrl] = useState('')


  useEffect(() => {
    if(CategoryStatus === "idle"){
      dispatch(getCategories())
    }
    else if(AuthorsStatus === "idle"){
      dispatch(getAuthors())
    }

    else if(ModulesStatus === "idle"){
      dispatch(getModules())
    }
  },[CategoryStatus,AuthorsStatus,ModulesStatus])


  function FormHandler(e) {
    e.preventDefault()

    if(courseName && description && lessonHour && img && lessonCount && modulesVal.length >= 1 && authorsVal.length >= 1 && categoriesVal && price){
      let formData = new FormData();
      console.log(img);
      formData.append("images", img)
      formData.append("name", courseName)
      formData.append("description", description)
      formData.append("total_hours", lessonHour)
      formData.append("total_lessons", lessonCount)
      formData.append("modules", JSON.stringify(modulesVal))
      formData.append("authors", JSON.stringify(authorsVal))
      formData.append("category_id", categoriesVal)
      formData.append("price", price)


      dispatch(addCourses(
        formData
        // {
        //   description: description,
        //   name: courseName ,
        //   image : formData,
        //   total_hours : lessonHour,
        //   total_lessons : lessonCount,
        //   modules:[modulesVal],
        //   authors:[authorsVal],
        //   price: "2323",
        //   category_id: categoriesVal
        // }
      ))
        
      setCourseName("")
      setDescription("")
      setLessonHour("")
      setLessonCount("")
      setCategoriesVal("")
      setPrice("")
      setAuthorsVal([])
      setModulesVal([])
      setUrl("")
      toast.success("Sizning kursingiz muvaffaqiyatli qo'shildi!");
    }
    else{
      toast.error("Iltimos ma'lumotlarni kiriting!");
    }
  }

  function FileReader(img) {
    setImg(img)
    const updateUrl = URL.createObjectURL(img);
    setUrl(updateUrl)
  
  }


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    console.log(value);
    setModulesVal(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  
  const AuthorsChange = (event) => {
    const {
      target: { value },
    } = event;
    setAuthorsVal(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  if(CategoryStatus === "succeeded" && AuthorsStatus === "succeeded" && ModulesStatus === "succeeded"){
    return (
      <Box>
          <ToastContainer pauseOnHover={false} closeOnClick={false} autoClose={4000} />
          <form ref={formRef} onSubmit={FormHandler} >
            <Grid  container spacing={2} >
              <Grid item xs={8}>
                <Box className="srcoll" sx={{background:"#fff",height:"700px",overflowY:"scroll",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.03)",borderRadius:"6px",padding:"32px"}}>
                  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingBottom:"24px",borderBottom:"1px solid #e8e8e9",marginBottom:"28px"}}>
                    <CustomTypegraphy text="Kurs qo’shish" class="add__course--title"/>
                    <CustomBtn  text="Kursni chiqarish" class="add__course--btn"/>
                  </Box>  
                  <Box sx={{display:"flex",width:"100%",flexWrap:"wrap"}}>
                      <CustomInput handleChange={setCourseName} val={courseName} label_text={"Bo’lim nomi"} type={"text"} placeholder={"Bo’lim nomini kiriting"}/>
                      <CustomInput handleChange={setDescription} val={description} label_text={"Tavsif"} type={"text"} placeholder={"Tavsif kiriting"}/>
                      <CustomInput handleChange={setLessonHour} val={lessonHour} label_text={"Dars uzunligi"} type={"number"} placeholder={"Dars uzunligini kiriting"}/>
                      <CustomInput handleChange={setLessonCount} val={lessonCount} label_text={"Darslar soni"} type={"number"} placeholder={"Darslar sonini kiriting"}/>
                      <CustomInput handleChange={setPrice} val={price} label_text={"Kurs narxi"} type={"number"} placeholder={"Kurs narxini kiriting"}/>
                      <FormControl size="small" sx={{width:"100%",marginBottom:"30px"}} >
                        <label style={{marginBottom:"10px",display:"block"}} >Kategoriyalar</label>
                        <Select
                          value={categoriesVal}
                          onChange={(e)=> setCategoriesVal(e.target.value)}
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}
                          sx={{borderRadius:"8px"}}
                        >
                          <MenuItem sx={{display:"none"}} value="">Kategoriyani tanlang</MenuItem>
                          {
                            categoriesData?.map(item => (
                              <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                            ))
                          }
                        
                        </Select>
                      </FormControl>
                      <FormControl size="small" sx={{width:"100%",marginBottom:"30px"}}>
                        <InputLabel id="demo-multiple-chip-label" sx={{background:"#fff"}}>O'qituchilar</InputLabel>
                        <Select
                          labelId="demo-multiple-chip-label"
                          id="demo-multiple-chip"
                          multiple
                          value={authorsVal}
                          onChange={AuthorsChange}
                          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                AuthorsData.map(item => {
                                  if(item.id === value){
                                    return(
                                      <Chip key={value} label={item.users[0].first_name} />
                                    )
                                  }
                                })
                                
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                          sx={{borderRadius:"8px !important"}}
                        >
                          {AuthorsData?.map((item) => (
                            <MenuItem
                              key={item.id}
                              value={item.id}
                              style={getStyles(item.id, modulesVal, theme)}
                            >
                              {item.users[0].first_name}
                            </MenuItem>
                          ))}
                          
                        </Select>
                      </FormControl>
                      <FormControl size="small" sx={{width:"100%"}}>
                        <InputLabel id="demo-multiple-chip-label" sx={{background:"#fff"}}>Bo'limlar</InputLabel>
                        <Select
                          labelId="demo-multiple-chip-label"
                          id="demo-multiple-chip"
                          multiple
                          value={modulesVal}
                          onChange={handleChange}
                          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                ModulesData.map(item => {
                                  if(item.id === value){
                                    return(
                                      <Chip key={value} label={item.title} />
                                    )
                                  }
                                })
                                
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                          sx={{borderRadius:"8px !important"}}
                        >
                          {ModulesData?.map((item) => (
                            <MenuItem
                              key={item.id}
                              value={item.id}
                              style={getStyles(item.id, modulesVal, theme)}
                            >
                              {item.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {/* <CustomInput label_text={"O'qituchi"} type={"text"} placeholder={"O'qituvchinig to'liq ismini kiriting"}/> */}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{background:"#fff",marginBottom:"16px", boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.03)",borderRadius:"6px",padding:"32px"}}>
                  <CustomTypegraphy text="Muqova" class="upload__img--title"/>
                  <label style={{cursor:`pointer`,border:"1.5px dashed #c2c2c2",width:"100%",height:"121px",display: "flex",alignItems:"center",justifyContent:"center",borderRadius: "12px"}} htmlFor="cover">
                    <Box sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                      <Image style={{poition:"absolute"}} src={"/icons/upload.svg"} width={36} height={36} alt="upload"/>
                      <CustomTypegraphy text="Drag and drop or click to upload" class="upload__img--text"/>
                    </Box>
                    
                  </label>
                  <input  onChange={(e)=> FileReader(e.target.files[0])} style={{display:"none"}} id="cover" type="file" />
                  
                  {
                    url ? <img style={{width:"100%",height:"300px",objectFit:"cover",marginTop:"20px",borderRadius:"10px"}} src={url} alt="course" /> : null
                  }
                </Box>
              </Grid>
            </Grid>
          </form>
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

export default addCourse
