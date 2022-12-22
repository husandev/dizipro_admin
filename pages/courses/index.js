import { Box, styled,TableRow,Table,Tabs ,tabsClasses,Tab ,TextField ,TableContainer ,Paper,TableHead ,TableCell ,TableBody, CircularProgress   } from '@mui/material'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import instance from '../../axios';
import CustomBtn from '../../src/Copmonents/CustomBtn';
import CustomPagination from '../../src/Copmonents/CustomPagination';
import CustomTypegraphy from '../../src/Copmonents/CustomTypegraphy'
import { courses, getCourses } from '../../src/Slices/get_courses';


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



function Courses() {
    const router = useRouter()
    const [value, setValue] = useState(0);
    const coursesData = useSelector(courses);
    const coursesStatus = useSelector((state) => state.get_courses.status);
    const dispatch = useDispatch()
    const handleChange = (event, newValue) => {
        setValue(newValue);
       
    };

    useEffect(()=> {
        if(coursesStatus === "idle"){
            dispatch(getCourses())
        }
    },[coursesStatus])

    if(coursesStatus === 'succeeded'){
        return (
            <Box>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <CustomTypegraphy component="h3" class="title" text="Video darsliklar"/>
                    <Link href={"/add-course"} legacyBehavior>
                        <a>
                            <CustomBtn text=""  class="add__course">
                                <Image  src="/icons/white-plus.svg" width={15} height={15} alt="threeDots"/>
                                <CustomTypegraphy component="h3" class="btn__text" text="Yangi bo’lim qo’shish"/>
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
                                        <TableCell  sx={{borderRadius:"6px 0 0 6px"}}><CustomTypegraphy className="table__text" variant={"span"} text={"MUQOVA"} /></TableCell>
                                        <TableCell  ><CustomTypegraphy className="table__text" variant={"span"} text={"NOMI"} /></TableCell>
                                        <TableCell  ><CustomTypegraphy className="table__text" variant={"span"} text={"TAVSIF"} /></TableCell>
                                        <TableCell  ><CustomTypegraphy className="table__text" variant={"span"} text={"ID"} /></TableCell>
                                        <TableCell  ><CustomTypegraphy className="table__text" variant={"span"} text={"M / D"} /></TableCell>
                                        <TableCell sx={{borderRadius:"0 6px 6px 0"}} ><CustomTypegraphy className="table__text" variant={"span"} text={"UZUNLIK"} /></TableCell>
                                        <TableCell sx={{borderRadius:"0 6px 6px 0"}} ><CustomTypegraphy className="table__text" variant={"span"} text={"O'QITUVCHI"} /></TableCell>
                                        <TableCell sx={{borderRadius:"0 6px 6px 0"}} ><CustomTypegraphy className="table__text" variant={"span"} text={"LAST EDIT"} /></TableCell>
                                        <TableCell sx={{borderRadius:"0 6px 6px 0"}} ><CustomTypegraphy className="table__text" variant={"span"} text={"HARAKATLAR"} /></TableCell>
                                    </StyledRow>
                                </TableHead>
                                <TableBody >
                                    {
                                        coursesData?.map((item,i) => (
                                            <StyledRow
                                                onClick={()=> router.push(`course/${item.course_id}`)}
                                                key={i}
                                            > 
                                                <TableCell className='rowBorderStart'   >
                                                    <Image style={{objectFit:"cover",borderRadius:"10px"}} src={`https://web.diziproedu.uz/uploads/images/${item.images[0].src}`} width={123} height={70} alt="cover" />
                                                </TableCell>
                                                <TableCell className='rowBorderMiddle'  component="th" scope="row">
                                                    <CustomTypegraphy class="course__sub--title" variant={"p"} text={item.name} />
                                                </TableCell>
                                                <TableCell className='rowBorderMiddle' >
                                                    <CustomTypegraphy class="course__desc" variant={"p"} text={item.description} />
                                                </TableCell>
                                                <TableCell className='rowBorderMiddle' >
                                                    <CustomTypegraphy class="course__desc" variant={"p"} text={`#${item.course_id}`} />
                                                </TableCell>
                                                <TableCell className='rowBorderMiddle' >
                                                    <CustomTypegraphy class="course__desc" variant={"p"} text={`${item.course_modules.length >= 1 ? item.course_modules.length : 0} / ${item.total_lessons}`} />
                                                </TableCell>
                                                <TableCell className='rowBorderMiddle' >
                                                    <CustomTypegraphy class="course__desc" variant={"p"} text={`${item.total_hours} soat`} />
                                                </TableCell>
                                                <TableCell className='rowBorderMiddle' >
                                                    <Box sx={{display:"flex",alignItems:"center"}}>
                                                        <Image style={{objectFit:"cover",marginRight:"4px"}} src={`https://web.diziproedu.uz/uploads/images/${item?.course_authors[0]?.authors[0]?.users[0]?.image_src}`} width={20} height={20} alt="account"/>
                                                        <CustomTypegraphy  class="course__desc" variant={"p"} text={`${item?.course_authors[0]?.authors[0]?.users[0]?.last_name} ${item?.course_authors[0]?.authors[0]?.users[0]?.first_name}`} />
                                                    </Box>
                                                </TableCell>
                                                <TableCell className='rowBorderMiddle' >
                                                    <CustomTypegraphy  class="course__desc" variant={"p"} text={`14:17, 12.11.2022`} />
                                                </TableCell>
                                                <TableCell className='rowBorderEnd' >
                                                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                                        <CustomBtn text="" class="table__btn" icon={<Image  src="/icons/plus.svg" width={20} height={20} alt="threeDots"/>} />   
                                                        <CustomBtn text="" class="table__btn" icon={<Image  src="/icons/edit.svg" width={20} height={20} alt="threeDots" />} />   
                                                        <CustomBtn text="" class="table__btn" icon={<Image  src="/icons/trash.svg" width={20} height={20} alt="threeDots" />} />   
                                                    </Box>
                                                                                
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

export default Courses