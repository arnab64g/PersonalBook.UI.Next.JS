"use client";

import { Button, MenuItem, Select, TextField } from "@mui/material";

export default function AddEditGrade({grade, closeAction}) {
   console.log(grade);
    return (
    <div>
        <h1>{0}</h1>
        <h1>Add or Edit Grade</h1>
        <form>
            <TextField label="Grade Name" value={grade.gradeName}></TextField>
            <TextField label="Points" type="number" value={grade.points}></TextField>
            <TextField label="Minimum Number" type="number" value={grade.minNumber}></TextField>
            <TextField label="Maximum Number" type="number" value={grade.maxNumber}></TextField>
            <Select value={grade.scale}>
                <MenuItem value={4}> Scale 4.0 </MenuItem>
                <MenuItem value={5}> Scale 5.0 </MenuItem>
            </Select>
        </form>
        <Button onClick={() => closeAction(false)}> Cancel </Button>
        <Button> Save </Button>
    </div>);
}