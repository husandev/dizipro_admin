import { Box } from '@mui/system';
import React from 'react'
import { styled } from '@mui/system';

const StyledInput = styled("input")`
  width:100%;
  background: #fff;
  border: 2px solid #e8e8e9;
  border-radius: 8px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  color: #171a23;
  padding:10px 16px;
  transition:all 0.4s ease;

  
  &:focus{
    outline:none;
    border-color:#6600e9;
  }
`

function CustomInput({placeholder,type,label_text,handleChange,val}) {


  return (
    <Box sx={{marginBottom:"30px",paddingRight:"10px",width:"100%"}}>
      <label style={{marginBottom:"10px",display:"block"}} htmlFor={placeholder}>{label_text}</label>
      <StyledInput  value={val} onChange={(e)=> handleChange(e.target.value)} id={placeholder} type={type} placeholder={placeholder}/>
     
    </Box>
    
  )
}

export default CustomInput;
