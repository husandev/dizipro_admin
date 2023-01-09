import { styled,Button  } from '@mui/material'

const StyledBtn = styled(Button)(
  ( theme ) => `

    &.MuiButton-table__dots--btn{
        min-width: auto;
        padding:0;
        background:transparent;
        box-shadow:none
    }

    &.MuiButton-user_dots{
        position: relative;
        min-width: auto;
        padding:4px;
        box-shadow:none;
        background:none;

        &::before{
            content:"";
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: #171a23;
            opacity: 0.05;
            border-radius: 10px;
        }
    }

    &.MuiButton-table__btn{
        width: 32px;
        min-width: 32px;
        height: 32px;        
        border: 1px solid rgba(23, 26, 35, 0.15);
        border-radius: 8px;
        padding:0;
        background:transparent;
        box-shadow: none;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.4s ease;

      

        &:hover{
            opacity:0.7
        }
    }

    &.MuiButton-add__course{
        margin-bottom:24px
    }

    &.MuiButton-add__course{
        padding:10px 33px;  
        background: #01605a;
        border: 1.5px solid #01605a;
        transition: all 0.4s ease;
        border-radius: 8px;

        &:hover{
            opacity: 0.8
        }
    }

    &.MuiButton-add__course--btn{
        background: #01605a;
        border: 1.5px solid #01605a;
        border-radius: 8px;
        padding:10px 32px;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: -0.02em;
        color: #fff;
        text-transform: inherit;
       
    }

    &.MuiButton-add__course--disabled{
        background: #01605a;
        border: 1.5px solid #01605a;
        border-radius: 8px;
        padding:10px 32px;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: -0.02em;
        color: #fff;
        text-transform: inherit;
        opacity:0.2;
        pointer-events: none
    } 
    
    &.MuiButton-add__module{
        width:100%;
        padding: 12px 20px;
        background: rgba(23, 26, 35, 0.08);
        border-radius: 10px;
        box-shadow:none;
        display:flex;
        align-items: center;
        margin-top:12px;
        text-transform: none;
    }

    &.MuiButton-login__btn{
        width:100%;
        padding:14px 0;
        text-transform: inherit;
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #fff;
        background: #6600e9;
        border-radius: 12px;
        box-shadow:none;
        transition: all 0.4s ease;

        &:hover{
            opacity:0.6
        }
    }

    &.MuiButton-login__btn--loader{
        width:100%;
        padding:12px 0;
        text-transform: inherit;
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #fff;
        background: #ddccf3;
        border-radius: 12px;
        box-shadow:none;
        transition: all 0.4s ease;
        pointer-events:none
    }

    &.MuiButton-course__add--btn{
        background: #01605a;
        border: 1.5px solid #01605a;
        border-radius: 8px;
        padding:10px 32px;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: -0.02em;
        color: #fff;
        text-transform: inherit;
    }

    &.MuiButton-course__add{
        width:100%;
        background: #01605a;
        border: 1.5px solid #01605a;
        border-radius: 8px;
        padding:10px 32px;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: -0.02em;
        color: #fff;
        text-transform: inherit;
    }
`
);
 

function CustomBtn(props) {
    return (
        <StyledBtn type='submit' className={`MuiButton-${props.class}`} variant="contained" >
            {props.text}
            {props.icon}
            {props.children}
        </StyledBtn>
    )
}

export default CustomBtn
