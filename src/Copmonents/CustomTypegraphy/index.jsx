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
