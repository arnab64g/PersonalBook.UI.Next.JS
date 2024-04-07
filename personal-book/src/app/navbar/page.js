"use client";

import { AppBar, Toolbar } from "@mui/material";
import Link from "next/link";
import { deleteToken, getUsername, isLoggedin } from '../tokenHandle/tokenHandle';
import { useRouter } from 'next/navigation';
 
export default function Navbar(){
    const value = isLoggedin();
    const router = useRouter();
    const name = getUsername();
    
    const logOut = async() =>{
        deleteToken();
        router.refresh();    
    }

    const goHome = () =>{
        router.replace("/");
    }

    return (
    <AppBar>
        <Toolbar >
            <span className="appname" onClick={goHome}> PersonalBook </span>
            { 
                value ? 
                <div>
                    <Link className='nav-item' href="/"> Home </Link>
                    <Link className='nav-item' href="/education/eduTab"> Education </Link>
                    <Link className='nav-item' href="/finance"> Expense </Link>
                </div> : null
            }   
            <span className="divider"></span>         
            <div>
            {
                value? 
                <div className='login-item'>
                    <Link className='nav-item' href="/user/login" onClick={logOut}> Log Out </Link>
                    <Link className='nav-item' href="/"> {name} </Link>
                </div> :
                <div className='login-item'>
                    <Link className="nav-item" href="/user/signup">Sign Up</Link>
                    <Link className='nav-item' href="/user/login" > Log In</Link>
                </div>
            }
            </div>
        </Toolbar>
    </AppBar>
    );
}
