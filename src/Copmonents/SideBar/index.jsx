import { styled,Box,List,ListItem  } from '@mui/material'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Icons from '../../../public/icons/Icons';

const SiderBarWrapperStyled = styled(Box)(
    ( theme ) => `
        padding:18px;
        background:#fff;
        position: fixed;
        width:auto;
        height:100vh;
        box-shadow: 0px 4px 6px rgba(214, 214, 214, 0.8);
        display:flex;
        flex-direction: column;
        justify-content: space-between;
  `
);

const SiderBarItemStyled = styled(ListItem)(
    ( theme ) => `
        padding:8px;
        border-radius: 12px;
        margin-bottom:20px;
        cursor:pointer;

        &.MuiListItem-active{
            box-shadow: 0px 2px 20px rgba(1, 96, 90, 0.1);

         

            path{
                stroke:#01605a;
            }
        }

        svg{
            width: 28px;
            height: 28px;
        }

        path{
            stroke:#74767b;
        }
  `
);


function SideBar() {
    const [active,setActive] = useState(1)
    const router = useRouter()
    console.log(router.pathname);
    useEffect(()=> {
        if(router.pathname === "/users" || router.pathname === "/user/[id]"){
            setActive(4)
        }
        else if(router.pathname === "/"){
            setActive(1)
        }
        else if(router.pathname === "/courses" || router.pathname === "/add-course" || router.pathname === "/course/[id]"){
            setActive(7)
        }
    },[])


    function SideBarItemHandler(el) {
        setActive(el.id)
        router.push(el.link)
    }

    return (
        <SiderBarWrapperStyled>
            <Link href={"/"} legacyBehavior>
                <a >
                    <Image src="/icons/logo.svg" width={40} height={40} alt="logo"/>
                </a>
            </Link>
            <List>
                {
                    Icons.map(el => (
                        <SiderBarItemStyled onClick={()=> SideBarItemHandler(el)} className={active === el.id ? "MuiListItem-active" : ""}  key={el.id}>
                            {el.element}
                        </SiderBarItemStyled>
                    ))
                }
               
            </List>

            <Link href={"/"} legacyBehavior>
                <a >
                    <Image src="/icons/account.png" width={40} height={40} alt="logo"/>
                </a>
            </Link>
        </SiderBarWrapperStyled>
    )
}

export default SideBar
