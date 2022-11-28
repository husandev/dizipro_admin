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

`
);


function CustomBtn(props) {
    return (
        <StyledBtn className={`MuiButton-${props.class}`} variant="contained" >
            {props.text}
            {props.icon}
        </StyledBtn>
    )
}

export default CustomBtn
