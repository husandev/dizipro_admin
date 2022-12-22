import { Typography,styled } from '@mui/material'

const StyledTypography = styled(Typography)(
  ( theme ) => `

    &.MuiTypography-title{
      font-weight: 700;
      font-size: 24px;
      line-height: 29px;
      letter-spacing: -0.02em;
      color: #171a23;
      margin-bottom:24px;
    }

    &.MuiTypography-table__text{
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      text-transform: capitalize;
      color: #171a23;
      opacity: 0.75;
    }

    &.MuiTypography-user_name{
      font-weight: 700;
      font-size: 24px;
      line-height: 29px;
      letter-spacing: -0.02em;
      color: #171a23;
      margin-right:12px
    }

    &.MuiTypography-user_id{
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: -0.02em;
      color: #171a23;
      opacity: 0.8;
    }

    &.MuiTypography-user__sub--title{
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0.01em;
      color: #171a23;
      opacity: 0.6;
      margin-bottom:6px
    }

    &.MuiTypography-user__info{
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      letter-spacing: -0.02em;
      color: #171a23;
    }

    &.MuiTypography-user__info--empty{
      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
      letter-spacing: -0.02em;
      color: #ee245a;
    }

    &.MuiTypography-course__title{
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: -0.02em;=
      color: #171a23;
      margin-bottom:16px;
    }

    &.MuiTypography-course__time{
      font-weight: 500;
      font-size: 12px;
      line-height: 120%;
      color: rgba(0, 0, 0, 0.6);
    }

    &.MuiTypography-course__name{
      font-weight: 500;
      font-size: 18px;
      line-height: 30px;
      color: #000;
      margin-bottom:8px;
    }

    &.MuiTypography-course__user--name{
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
      color: rgba(0, 0, 0, 0.8);
    }

    &.MuiTypography-course__price--title{
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      letter-spacing: -0.02em;
      text-transform: uppercase;
      margin-bottom:4px;
      color: rgba(0, 0, 0, 0.6);
    }

    &.MuiTypography-course__price--type{
      font-weight: 500;
      font-size: 13px;
      line-height: 16px;
      margin-bottom:16px;
      color: #171a23;
    }

    &.MuiTypography-course__price--number{
      font-weight: 500;
      font-size: 13px;
      line-height: 16px;
      text-decoration-line: underline;
      color: #3399ff;
      
    }

    &.MuiTypography-course__progress{
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      letter-spacing: -0.02em;
      color: #171a23;
      margin-right:4px;
    }

    &.MuiTypography-course__desc{
      max-width:131px;
      font-weight: 400;
      font-size: 11px;
      line-height: 16px;
      color: #171A23;
      opacity: 0.75;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }

    &.MuiTypography-course__sub--title{
      max-width:131px;
      font-weight: bolder;
      font-size: 13px;
      line-height: 16px;
      color: #171A23;
      opacity: 0.75;
    }

    &.MuiTypography-btn__text{
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: -0.02em;
      color: #fff;
      margin-left:8px;
      text-transform: none !important; 
    }

    &.MuiTypography-add__course--title{
      font-weight: 700;
      font-size: 24px;
      line-height: 29px;
      letter-spacing: -0.02em;
      color: #171a23;
    }

    &.MuiTypography-upload__img--title{
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: -0.02em;
      color: #171a23;
      margin-bottom:20px
    }
    &.MuiTypography-upload__img--text{
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #171a23;
      opacity: 0.6;
      margin-top:14px
    }

    &.MuiTypography-course__sub--text{
      font-weight: 500;
      font-size: 22px;
      line-height: 27px;
      letter-spacing: -0.02em;
      color: #171A23;
    }

    &.MuiTypography-module__name{
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      text-transform: uppercase;
      color: rgba(0, 0, 0, 0.8);
      margin-left:10px
    }

    &.MuiTypography-module__lesson{
      ont-weight: 600;
      font-size: 14px;
      line-height: 17px;
      text-transform: uppercase;
      color: rgba(0, 0, 0, 0.4);
    }

    &.MuiTypography-add__module--text{
      font-weight: 500;
      font-size: 15px;
      line-height: 18px;
      text-align: center;
      letter-spacing: 0.01em;
      color: #171A23;
      margin-left: 20px
    }

    &.MuiTypography-login__title{
      font-weight: 600;
      font-size: 30px;
      line-height: 36px;
      letter-spacing: -0.02em;
      color: #141414;
      margin-bottom:12px;
    }

    &.MuiTypography-login__desc{
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      margin-right:8px;
      color: #303030;
    }

    &.MuiTypography-login__link{
      cursor:pointer;
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      color: #1d5bf9;
      border-bottom: 1.5px solid #b7cbfd;
    }

    &.MuiTypography-add__lesson--text{
      font-weight: 500;
      font-size: 15px;
      line-height: 18px;
      text-align: center;
      letter-spacing: 0.01em;
      color: #fff;
    }
`
);


function CustomTypegraphy(props) {
  return (
    <StyledTypography className={`MuiTypography-${props.class}`} variant={props.component} component={props.component}>
       {props.text}
    </StyledTypography>
  )
}

export default CustomTypegraphy
