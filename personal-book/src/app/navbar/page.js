"use client";

import { AppBar, Box, Divider, IconButton, ListItem, ListItemButton, Toolbar } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Link from "next/link";
import { deleteToken, getUsername, isLoggedin } from '../tokenHandle/tokenHandle';
import { useRouter } from 'next/navigation';
import "../navbar/nav.css";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";

export default function Navbar(){
    const value = isLoggedin();
    const router = useRouter();
    const name = getUsername();
    const [open, setOpen] = useState(false);
    
    const logOut =() =>{
        deleteToken();
        setOpen(false)
        router.replace("/user/login");
        router.refresh();    
    }

    const goHome = () =>{
        setOpen(false);
        router.replace("/");
    }

    const goExp = () =>{
        router.replace('/finance')
    }

    const goEdu = () =>{
        router.replace('/education/eduTab');
      }
    
    return (
        <>
            <AppBar>
                <Toolbar >
                    <IconButton sx={{ color: '#fff' }} onClick={() => setOpen(true)}> <MenuIcon></MenuIcon> </IconButton>
                    <span className="appname" onClick={goHome}> PersonalBook </span>
                    {
                        value ? <Link className='nav-item' href="/"> {name} </Link> : null
                    }
                </Toolbar>
            </AppBar>
            <Drawer open={open} onClose={() => setOpen(false)} >
                <Box className="box">
                { 
                    value ? 
                    <div>
                        <ListItem className="nav-item">  
                            <ListItemButton href="/" onClick={() => {setOpen(false)}} color="primary"> Home </ListItemButton>
                        </ListItem>
                        <ListItem className='nav-item'>
                            <ListItemButton onClick={() => {setOpen(false); goEdu()}} > Education </ListItemButton>
                        </ListItem>
                        <ListItem className="nav-item">
                            <ListItemButton onClick={() => {setOpen(false); goExp()}} > Expense </ListItemButton>
                        </ListItem>
                    </div> : null
                }
                <Divider></Divider>
                <div>
                {
                    value? 
                    <div >
                        <ListItem className="nav-item">
                            <ListItemButton onClick={() => {setOpen(false); logOut()}}> Log Out </ListItemButton>
                        </ListItem>
                    </div> :
                    <div className='login-item d-div'>
                        <ListItem className="nav-item">
                            <ListItemButton onClick={() => {setOpen(false)}}  href="/user/signup">Sign Up</ListItemButton>
                        </ListItem>
                        <ListItem className="nav-item">
                            <ListItemButton onClick={() => {setOpen(false)}}  href="/user/login"> Log In </ListItemButton>
                        </ListItem>
                    </div>
                }
                </div>
                </Box>
            </Drawer>
        </>
    );
}
