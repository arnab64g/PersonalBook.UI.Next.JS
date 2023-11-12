"use client";

import { TextField, Button } from '@mui/material';
import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setToken } from '@/app/tokenHandle/tokenHandle';
import "./style.css"

const Login = () =>{
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
        const data = event.target;
        const formData = new FormData(data);
        const formValues = Object.fromEntries(formData);

        if (isFormValid) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formValues)
            };
            const res = await fetch('http://localhost:7108/api/User/login', requestOptions);
            const result = await res.json();

            if (!result.successed) {
                toast.error(result.message, {position:'top-right'});
            }
            else{
                toast.success('Log in successfully', {position:'top-right'});
                setToken(result.token);
                router.refresh();
                router.replace("/");
            }
        }
    }

    return (
        <>
        <form className='login-form center' onSubmit={loginUser} method="post">
            <h1 className='head'>Log in</h1> 
            <div className='field'>
                <TextField className='single' label="Username" id="username" name="username"
                onChange={(e) => (setUsername(e.target.value)) }
                error={errors.username}> </TextField>
            </div>
            <div className='field'>
                <TextField className='single' label="Password" type='password' id="password" name='password'
                onChange={(e) => {setPassword(e.target.value)}}
                error={errors.password}> </TextField>
            </div>
            <div className='field'>
            <Button type='submit' className='single' variant='contained'>Log in</Button>
            </div>
        </form>
        <ToastContainer></ToastContainer>
        </>
    );
}

export default Login;