"use client";

import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getToken } from "@/app/tokenHandle/tokenHandle";

export default function AddEditGrade({grade, closeAction}) {
    const [gradeName, setGradeName] = useState(grade.gradeName);
    const [points, setPoints] = useState(grade.points);
    const [maxNumber, setMaxNumber] = useState(grade.maxNumber);
    const [minNumber, setMinNumber] = useState(grade.minNumber);
    const [scale, setScale] = useState(grade.scale);
    const [errors, setErrors] = useState({});
    const [isValid, setValidaty] = useState(true);

    const addEditsGrade = async () =>{
        if (isValid) {
            const grd = {
                id : grade.id,
                gradeName : gradeName,
                points : points,
                maxNumber : maxNumber,
                minNumber : minNumber,
                scale : scale
            }

            let requestOptions = {};
            
            if (grd.id == 0 ) {
                requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' ,
                                'authorization' : `bearer ${getToken()}` },
                    body: JSON.stringify(grd)                
                };
            }
            else{
                requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' ,
                                'authorization' : `bearer ${getToken()}`},
                    body: JSON.stringify(grd)
                };
            }

            const res = await fetch('http://localhost:7108/api/Grade', requestOptions);
           
            const result = await res.json();

            
            
            if (result) {
                alert("Saved Successfully");
                closeAction(false);
            }
            else{
                alert("Save failed");
            }
        }
        
    }

    useEffect(() => {validateForm()}, [gradeName, points]);

    const validateForm = () =>{
        let errors = {};

        if (!gradeName) {
            errors.gradeName = true;
        }

        setErrors(errors);
        setValidaty(Object.keys(errors).length === 0);
    }

    return (
    <div>
        <h1 className="head">Add or Edit Grade</h1>
        <form>
            <div className="field">
                <TextField className="double" label="Grade Name" id="gradeName" name="gradeName" value={gradeName}
                onChange={(gn) => {setGradeName(gn.target.value)}} required error={errors.gradeName}></TextField>
                <label className="gap"></label>
                <TextField className="double"  label="Points" type="number" id="points" name="points" value={points}
                onChange={(p) => setPoints(p.target.value)} error={errors.points}></TextField>
            </div>
            <div className="field">
                <TextField className="triple" label="Minimum Number" type="number" value={minNumber}
                onChange={(e) => setMinNumber(e.target.value)}></TextField>
                <label className="gap"></label>
                <TextField className="triple" label="Maximum Number" type="number" value={maxNumber}
                onChange={(e) => setMaxNumber(e.target.value)}></TextField>
                <label className="gap"></label>
                <Select className="triple" value={scale} onChange={(e) => setScale(e.target.value)}>
                    <MenuItem value={4}> Scale 4.0 </MenuItem>
                    <MenuItem value={5}> Scale 5.0 </MenuItem>
                </Select>
            </div>
            <div className="field">
                <Button className="double" variant="outlined" type='button' onClick={() => closeAction(false)}> Cancel </Button>
                <label className="gap"></label>
                <Button className="double"  variant="contained" type='button' onClick={() => {addEditsGrade()}} > Save </Button>
            </div>
        </form>
    </div>);
}