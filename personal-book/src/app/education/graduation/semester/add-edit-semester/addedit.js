"use client";

import { Month } from "@/app/tokenHandle/month";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import "./style.css"
import { useEffect, useState } from "react";
import { getToken } from "@/app/tokenHandle/tokenHandle";

export default function AddEditSemester({semester, isOpenDialog}) {
    const month = Month;

    const closeDialog = async () => {
        isOpenDialog(false);
    }
    
    const [semesterName, setSemesterName] = useState(semester.semesterName);
    const [monthBng, setMonthBng] = useState(semester.monthBng);
    const [year, setYear] = useState(semester.year);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {validateForm();}, [semesterName]);

    const validateForm = () => {
        let errors = {};

        if (!semesterName) {
            errors.semesterName = true;
        }

        setErrors(errors);
        setIsValid(Object.keys(errors).length === 0);
    }

    const saveChange = async () => {
        if (isValid) {
            semester.semesterName = semesterName;
            semester.monthBng = monthBng;
            semester.year = year;

            let requestOptions = {};
            
            if (semester.id == 0) {
                requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' ,
                                'authorization' : `bearer ${getToken()}` },
                    body: JSON.stringify(semester)                
                };
            }
            else{
                requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' ,
                                'authorization' : `bearer ${getToken()}` },
                    body: JSON.stringify(semester)                
                };
            }
            const res = await fetch('http://localhost:7108/api/Semester', requestOptions);
            if (res) {
                alert("Saved Successfully.");
                isOpenDialog(false);
            }
            else{
                alert("Unable to save");
            }
        }
    }

    return(
        <>
        <form>
            <h1> Semester </h1>
        <div className="field">
            <TextField value={semesterName} onChange={(e)=> {setSemesterName(e.target.value)}} error={errors.semesterName} required label="Semester Name"></TextField>
        </div>
        <div className="field">
            <Select value={monthBng} onChange={(e) => {setMonthBng(e.target.value)}} className="col" label="Month" placeholder="Select MOnth">
                {month.map(m => (<MenuItem value={m.id}> {m.name} </MenuItem>))}
            </Select>
            <label className="gap"></label>
            <TextField value={year} type="number" onChange={(e) => {setYear(e.target.value);}} className="col" label="Year"></TextField>
        </div>
        <div className="field">
            <Button  className="col" variant="outlined" onClick={() => {closeDialog()}}> Cancel </Button>
            <label className="gap"></label>
            <Button className="col" variant="contained" onClick={saveChange}> Save </Button>
        </div>
        </form>
        </>
    );
}