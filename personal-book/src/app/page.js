"use client";

import styles from './page.module.css'
import { Button} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { deleteToken, isLoggedin } from './tokenHandle/tokenHandle';
import { useRouter } from 'next/navigation';
import SchoolIcon from '@mui/icons-material/School';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
 
export default function Home() {
  let value = isLoggedin();
  const router = useRouter();
  
  const goLogIn = () =>{
    router.replace("/user/login");
  }

  const goSignUp = () =>{
    router.replace("/user/signup");
  }

  const logOut = () => {
    deleteToken();
    router.refresh();
    router.replace("/user/login");
  }

  return (
    <main className={styles.main}>
        {
          value ? 
          <div>
            <Button variant='outlined' className='card'> 
              <MonetizationOnIcon></MonetizationOnIcon>
              Finance 
            </Button>
            <Button variant='outlined' className='card'>
              <SchoolIcon></SchoolIcon>
              Education 
            </Button>
            <Button variant='outlined' className='card' onClick={logOut}> 
              <LogoutIcon></LogoutIcon>
              LogOut 
            </Button>
          </div> : 
          <div>
              <Button variant='outlined' className='card' onClick={goSignUp}>
                <AccountCircleIcon></AccountCircleIcon>
                Sign Up
              </Button>
              <Button variant="outlined" className='card' onClick={goLogIn}>
                <LoginIcon></LoginIcon>
                Log In
              </Button>
          </div>
        }
        
    </main>
  )
}
