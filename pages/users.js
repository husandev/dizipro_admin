import { Box,Tabs,tabsClasses,Tab,TextField,TableContainer,Paper ,Table,TableHead,styled,TableRow,TableCell,TableBody } from "@mui/material"
import { useEffect, useState } from "react";
import CustomTypegraphy from "../src/Copmonents/CustomTypegraphy"
import CustomBtn from "../src/Copmonents/CustomBtn"
import Image from "next/image";
import { useRouter } from "next/router";
import CustomPagination from "../src/Copmonents/CustomPagination";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, users } from "../src/Slices/get_users";
import CircularProgress from '@mui/material/CircularProgress';
import { searchedUser, searchUser } from "../src/Slices/search_user";

const tabsWrapperStyle = {
    background:"#fff",
    paddingRight:"32px",
    borderRadius:"12px 12px 0px 0px",
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
    marginBottom:"3px"
}

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


function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabsData = [
    {
        id:1,
        text:"Barcha",
    },
    {
        id:2,
        text:"Bloklangan",
    },
    {
        id:3,
        text:"Saqlangan",
    },
]

function Users() {
    const [value, setValue] = useState(0);
    const router = useRouter()
    const usersStatus = useSelector(state => state.get_users.status)
    const dispatch = useDispatch()
    const usersData = useSelector(users)
    const [searched,setSearched] = useState('')
    const SearchedUsersData = useSelector(searchedUser)
    
    const StyledUserName = styled(Box)(
        ( theme ) => `
            border-radius:50%;
            width:36px;
            height:36px;
            font-size:25px;
            color:#fff;
            display:flex;
            align-items: center;
            justify-content: center;
            margin-right:8px;
    `
    );

    function searchHandler(val) {
        dispatch(searchUser(val))
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(()=> {
        if(usersStatus === "idle"){
            dispatch(getUsers())
        }
    },[usersStatus])

    if(usersStatus === "succeeded"){
        return (
            <Box>
                <CustomTypegraphy component="h3" class="title" text="Foydalanuvchilar"/>
    
                <Box >
                    <Box sx={{  borderColor: 'divider' }}>
                        <Box sx={tabsWrapperStyle}>
                            <Tabs   sx={{
                                [`& .${tabsClasses.indicator}`]: {
                                    backgroundColor:"#01605a"
                                },
                            }} value={value} onChange={handleChange} aria-label="basic tabs example">
                                {
                                    TabsData.map(item => (
                                        <Tab sx={{padding:"21px 32px"}}  key={item.id} label={<CustomTypegraphy text={item.text} variant="span" className="tab__text" />} {...a11yProps(item.id)} />
                                    ))
                                }
                                
                    
                            </Tabs>
                            <Box
                                component="form"
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    sx={{width:"300px"}}
                                    label="ID/Xaridor bo’yicha qidiring..."
                                    id="outlined-size-small"
                                    size="small"
                                    onChange={(e)=> {searchHandler(e.target.value);setSearched(e.target.value)}}
                                />
                            </Box>
                        </Box>
                        <TableContainer sx={{boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.03)",padding:"24px 34px"}} component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <StyledRow sx={{background:"#f6f6f6",borderColor:'transparent !important'}}>
                                        <TableCell  sx={{borderRadius:"6px 0 0 6px"}}><CustomTypegraphy className="table__text" variant={"span"} text={"Foydalanuvchi"} /></TableCell>
                                        <TableCell  ><CustomTypegraphy className="table__text" variant={"span"} text={"#ID"} /></TableCell>
                                        <TableCell  ><CustomTypegraphy className="table__text" variant={"span"} text={"Qoshilgan"} /></TableCell>
                                        <TableCell  ><CustomTypegraphy className="table__text" variant={"span"} text={"Sarflagan"} /></TableCell>
                                        <TableCell  ><CustomTypegraphy className="table__text" variant={"span"} text={"Tel.raqam"} /></TableCell>
                                        <TableCell sx={{borderRadius:"0 6px 6px 0"}} ><CustomTypegraphy className="table__text" variant={"span"} text={"Buyurtmalari"} /></TableCell>
                                    </StyledRow>
                                </TableHead>
                                <TableBody >
                                    {
                                        searched ?
                                        SearchedUsersData?.data?.map((item,i) => (
                                            <StyledRow
                                                onClick={()=> router.push(`user/${item.user_id}`)}
                                                key={item.user_id}
                                            > 
                                                <TableCell className='rowBorderStart'  sx={{display:"flex",alignItems:"center"}} >
                                                    <StyledUserName sx={(i + 1) % 2 === 0 ? {background:"#738dbf "} : {background:"#ab73bf"} } >{item.first_name.slice(0,1)}</StyledUserName>
                                                    <CustomTypegraphy className="table__id" variant={"span"} text={`${item.first_name} ${item.last_name}`} />
                                                </TableCell>
                                                <TableCell className='rowBorderMiddle'  component="th" scope="row">
                                                    <CustomTypegraphy className="table__id" variant={"span"} text={`#${item.user_id}`} />
                                                </TableCell>
                                                <TableCell className='rowBorderMiddle' >{item.created_at.slice(0,10)}</TableCell>
                                                <TableCell className='rowBorderMiddle' >548 000 UZS</TableCell>
                                                <TableCell className='rowBorderMiddle' >+{item.phone_number}</TableCell>
                                                <TableCell className='rowBorderEnd' >
                                                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                                        <CustomTypegraphy className="table__text" variant={"span"} text={`2 ta`} />
                                                        <CustomBtn text="" class="table__dots--btn" icon={<Image  src="/icons/DotsThree.svg" width={10} height={14} alt="threeDots"/>} />   
                                                    </Box>
                                                                               
                                                </TableCell>
                                        </StyledRow>
                                        )) :
                                        usersData?.data?.data?.map((item,i) => (
                                            <StyledRow
                                                onClick={()=> router.push(`user/${item.user_id}`)}
                                                key={item.user_id}
                                                
                                            > 
                                                <TableCell className='rowBorderStart'  sx={{display:"flex",alignItems:"center"}} >
                                                    <StyledUserName sx={(i + 1) % 2 === 0 ? {background:"#738dbf "} : {background:"#ab73bf"} } >{item.first_name.slice(0,1)}</StyledUserName>
                                                    <CustomTypegraphy className="table__id" variant={"span"} text={`${item.first_name} ${item.last_name}`} />
                                                </TableCell>
                                                <TableCell className='rowBorderMiddle'  component="th" scope="row">
                                                    <CustomTypegraphy className="table__id" variant={"span"} text={`#${item.user_id}`} />
                                                </TableCell>
                                                <TableCell className='rowBorderMiddle' >{item.created_at.slice(0,10)}</TableCell>
                                                <TableCell className='rowBorderMiddle' >548 000 UZS</TableCell>
                                                <TableCell className='rowBorderMiddle' >+{item.phone_number}</TableCell>
                                                <TableCell className='rowBorderEnd' >
                                                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                                        <CustomTypegraphy className="table__text" variant={"span"} text={`2 ta`} />
                                                        <CustomBtn text="" class="table__dots--btn" icon={<Image  src="/icons/DotsThree.svg" width={10} height={14} alt="threeDots"/>} />   
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

export default Users
