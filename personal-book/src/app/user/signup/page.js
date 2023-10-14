"use client"

import React, {useState, useEffect} from "react";
import { TextField, Button } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.css';
import './page.css';
import Toast from "toastr";
import { useRouter } from 'next/navigation'

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
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form_values)
            };
    
            const res = await fetch('http://localhost:7108/api/User', requestOptions);
            const result = await res.json();
            
            if (!result.successed) {
                Toast.error(result.errors, "Error");
            }
            else{
                Toast.success("User created successfully", "Successed");
                router.replace("/user/login");
            }
        }
    }

    return (
    <div>
        <form className='center' onSubmit={registerUser} method="post">
            <h1 className='field'>Sign Up</h1>
            <div className='field'>
                <TextField id='firstName' name='firstName' className='name' label="First Name"
                onChange={(e) => setFirstName(e.target.value)} 
                error={errors.firstName}>
                </TextField>
                <label className='gap'></label>
                <TextField id='lastName' name='lastName' className='name'  label="Last Name"
                onChange={(e) => {setLastName(e.target.value)}}
                error={errors.lastName}>
                </TextField>
            </div>
            <TextField id='email' name="email" className='field' label="Email"
            onChange={(e) => {setEmail(e.target.value)}}
            error={errors.email}
            ></TextField>
            <TextField id='username' name="username" className='field' label="Username"
            onChange={(e) => {setUsername(e.target.value)}}
            error={errors.username}>  </TextField>
            <TextField id='phoneNumber' name="phoneNumber" className='field' label="Phone"
            onChange={(e) => {setPhone(e.target.value)}}
            error={errors.phoneNumber}
            ></TextField>
            <TextField id='address' name="address" className='field' label="Address" multiline minRows={2}>  </TextField>
            <TextField id='password' name="password" className='field' type='password' label="Password"
            onChange={(e) => {setPassword(e.target.value)}}
            error={errors.password}
            ></TextField>
            <Button type='submit' className='field' variant='contained'> Register </Button>
        </form>
    </div>
    );
}
