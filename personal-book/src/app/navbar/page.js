"use client";

import './page.css'
import { AppBar, Toolbar } from "@mui/material";
import Link from "next/link";
import { deleteToken, isLoggedin } from '../tokenHandle/tokenHandle';
import { useRouter } from 'next/navigation';

const Navbar = () =>{
    let value = isLoggedin();
    const router = useRouter();

    const logOut = async() =>{
        deleteToken();
        router.refresh();
    }

    return (
    <AppBar>
        <Toolbar className='test'>
            <div>
                <Link className='nav-item' href="/"> Home </Link>
                <Link className='nav0item' href="/education/eduTab"> Education </Link>
                <Link className='nav-item' href="/user/test"> Test </Link>
            </div>
            <span ></span>
            {
                value? 
                <div className='login-item'>
                    <Link className='nav-item' href="/" onClick={logOut}> Log Out </Link>
                </div> :
                <div className='login-item'>
                    <Link className="nav-item" href="/user/signup">Sign Up</Link>
                    <Link className='nav-item' href="/user/login"> Log In</Link>
                    
                </div>
            }
            
        </Toolbar>
    </AppBar>
    );
}

module.exports = Navbar