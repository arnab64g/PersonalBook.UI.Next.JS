"use client";

import { Month } from "@/app/tokenHandle/month";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { addSemester, editSemester } from "@/services/semesterService";

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

            let res = {};

            if (semester.id == 0) {
                res = await addSemester(semester);
            }
            else{
                res = await editSemester(semester);
            }

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
        <form className="sem-form">
            <h1> Semester </h1>
        <div className="field">
            <TextField className="single" value={semesterName} onChange={(e)=> {setSemesterName(e.target.value)}} error={errors.semesterName} required label="Semester Name"></TextField>
        </div>
        <div className="field">
            <Select value={monthBng} onChange={(e) => {setMonthBng(e.target.value)}} className="double" label="Month" >
                {month.map(m => (<MenuItem value={m.id}> {m.name} </MenuItem>))}
            </Select>
            <label className="gap"></label>
            <TextField value={year} type="number" onChange={(e) => {setYear(e.target.value);}} className="double" label="Year"></TextField>
        </div>
        <div className="field">
            <Button className="double" variant="outlined" onClick={() => {closeDialog()}}> Cancel </Button>
            <label className="gap"></label>
            <Button className="double" variant="contained" onClick={saveChange}> Save </Button>
        </div>
        </form>
        </>
    );
}