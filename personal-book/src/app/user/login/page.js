"use client";

import { TextField, Button } from '@mui/material';
import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './page.css';
import { useRouter } from 'next/navigation';
import Toast from 'toastr';
import { setToken } from '@/app/tokenHandle/tokenHandle';

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
                Toast.error(result.message, "Failed");
            }
            else{
                Toast.success('Log in successfully','Successed');
                setToken(result.token);
                router.refresh();
                router.replace("/");
            }
        }
    }

    return (
        <form className='center' onSubmit={loginUser} method="post">
            <h1>Log in</h1> 
            <TextField className='field' label="Username" id="username" name="username"
            onChange={(e) => (setUsername(e.target.value)) }
            error={errors.username}> </TextField>
            <TextField className='field' label="Password" type='password' id="password" name='password'
            onChange={(e) => {setPassword(e.target.value)}}
            error={errors.password}> </TextField>
            <Button type='submit' className='field' variant='contained'>Log in</Button>
        </form>
    );
}

export default Login;