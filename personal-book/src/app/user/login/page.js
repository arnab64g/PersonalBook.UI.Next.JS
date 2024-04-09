"use client";

import { TextField, Button, Box, FormControl } from '@mui/material';
import React, {useState, useEffect} from "react";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";
import { setToken } from '@/app/tokenHandle/tokenHandle';
import { loginUserService } from '@/services/userService';

export default function Login(){
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");
    const [isFormValid, setIsFormValid] = useState("");

    useEffect(() => {validateForm();}, [username, password]);

    const validateForm = () => {
        let errors = {};

        if (!username) {
            errors.username = true;
        }

        if(!password){
            errors.password = true;
        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0); 
    }

    const loginUser = async (event) =>{
        event.preventDefault();
        const data = event.target;
        const formData = new FormData(data);
        const formValues = Object.fromEntries(formData);
        if (isFormValid) {
            const result = await loginUserService(formValues);
            if (!result.successed) {
                toast.error(result.message, {position:'top-right'});
            }
            else{
                toast.success('Log in successfully', {position:'top-right'});
                setToken(result.token);
                router.replace("/");
                router.refresh();
            }
        }
    }

    return (
        <>
        <form className='login-form' onSubmit={loginUser} method="post">
            <h1>Log in</h1>
            <Box>
                <TextField  className='username' label="Username" id="username" name="username"
                    onChange={(e) => (setUsername(e.target.value)) }
                    error={errors.username}> 
                </TextField>
                <TextField className='password' label="Password" type='password' id="password" name='password'
                    onChange={(e) => {setPassword(e.target.value)}}
                    error={errors.password}> 
                </TextField>
            </Box>
            
            <Button type='submit' className='login' variant='contained'>Log in</Button>
        </form>
        <ToastContainer></ToastContainer>
        </>
    );
}
