"use client";

import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { addGrade, updateGrade } from "@/services/gradeService";
import "./style.css";

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

            let res = {};

            if (grd.id == 0 ) {
                res = await addGrade(grd);
            }
            else{
                res = await updateGrade(grd);
            }
            console.log(res);
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
        <form className="add-edit">
            <h1 >Add or Edit Grade</h1>
            <TextField className="grade" label="Grade Name" id="gradeName" name="gradeName" value={gradeName}
                onChange={(gn) => {setGradeName(gn.target.value)}} required error={errors.gradeName}>
            </TextField>
            <TextField className="point"  label="Points" type="number" id="points" name="points" value={points}
                onChange={(p) => setPoints(p.target.value)} error={errors.points}>    
            </TextField>
            <TextField className="min" label="Minimum Number" type="number" value={minNumber}
                onChange={(e) => setMinNumber(e.target.value)}>
            </TextField>    
            <TextField className="max" label="Maximum Number" type="number" value={maxNumber}
                onChange={(e) => setMaxNumber(e.target.value)}>
            </TextField>
            <Select className="scale" value={scale} onChange={(e) => setScale(e.target.value)}>
                <MenuItem value={4}> Scale 4.0 </MenuItem>
                <MenuItem value={5}> Scale 5.0 </MenuItem>
            </Select>
            <Button className="cancel-button" variant="outlined" type='button' onClick={() => closeAction(false)}> Cancel </Button>    
            <Button className="save-button"  variant="contained" type='button' onClick={() => {addEditsGrade()}} > Save </Button>
        </form>
    </div>);
}