"use client";

import React, {useState, useEffect} from "react";
import { TextField, Button } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import "./style.css"
import { signUpUser } from "@/services/userService";

export default function Signup(){
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        validateForm();
    }, [firstName, lastName, username, email, phoneNumber, password]);

    const validateForm = () => {
        let errors = {};

        if (!firstName) {
            errors.firstName = true;
        }

        if (!lastName) {
            errors.lastName = true;
        }

        if (!username) {
            errors.username = true;
        }

        if (!email) {
            errors.email = true;
        }

        if (!phoneNumber) {
            errors.phoneNumber = true;
        }

        if (!password || password.length < 6) {
            errors.password = true;
        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };

    const registerUser = async (event) => {
        event.preventDefault();
        var formData = new FormData(event.target);
        const form_values = Object.fromEntries(formData);

        if (isFormValid) {
            const result = await signUpUser(form_values);

            if (!result.successed) {
                toast.error(String(result.errors), {position:'top-right'});
            }
            else{
                toast.success("User created successfully", {position:'top-right'});
                router.replace("/user/login");
            }
        }
    }

    return (
    <div>
        <form className='signup-form' onSubmit={registerUser} method="post">
            <h1 className='field'>Sign Up</h1>
            <TextField required id='firstName' name='firstName' className='first-name' label="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                error={errors.firstName}>
            </TextField>
            <TextField required id='lastName' name='lastName' className='last-name'  label="Last Name"
                onChange={(e) => {setLastName(e.target.value)}}
                error={errors.lastName}>
            </TextField>
            <TextField id='email' className="email" name="email" label="Email"
                onChange={(e) => {setEmail(e.target.value)}}
                error={errors.email}
            ></TextField>
            <TextField id='username' name="username" className='username' label="Username"
                onChange={(e) => {setUsername(e.target.value)}}
            error={errors.username}>  </TextField>
            <TextField id='phoneNumber' name="phoneNumber" className='phone' label="Phone"
                onChange={(e) => {setPhone(e.target.value)}}
                error={errors.phoneNumber}
            ></TextField>
            <TextField id='address' name="address" className='address' label="Address" multiline minRows={2}>  </TextField>
            <TextField id='password' name="password" className='password' type='password' label="Password"
                onChange={(e) => {setPassword(e.target.value)}}
                error={errors.password}
            ></TextField>
            <Button type='submit' className='submit' variant='contained'> Register </Button>
        </form>
        <ToastContainer></ToastContainer>
    </div>
    );
}
