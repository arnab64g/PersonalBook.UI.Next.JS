"use client";

import { getToken } from "@/app/tokenHandle/tokenHandle";
import { Select, TextField, Checkbox, Button, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useEffect, useState } from "react";

export default function AddResult({result, isOpen}) {
    const level = result.level;
    const [sl, setSl] = useState(result.sl);
    const [subject, setSubject] = useState(result.subject);
    const [grade, setGrade] = useState(result.gradeId);
    const [gradeList, setGradeList] = useState([]);
    const [isOpt, setIsOpt] = useState(result.isOptional);
    useEffect(() => {fetchGradeList()}, []);
    useEffect(() => {}, []);

    const fetchGradeList = async () =>{
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,
                        'authorization' : `bearer ${getToken()}` }
        };

        const res = await fetch('http://localhost:7108/api/Grade', requestOptions);
        const result = await res.json();

        setGradeList(result.filter(x => x.scale == 5));
    }

    const saveResult = async () => {
        console.log("jhkhkhk");
        const res = {
            id : result.id,
            level : result.level,
            sl : sl,
            userId : result.userId,
            isOptional : isOpt
        }
        console.log(isOpt);
        console.log(res);
    }
    
    return(<>
    {
        level == 10 ? <h1 className="head">SSC Result</h1> : <h1 className="head">HSC Result</h1>
    }
    <form>
        <div className="field">
            <TextField label="Sl" className="double" required type="number" value={sl}
            onChange={(e) => {setSl(e.target.value)}}></TextField>
            <label className="gap"></label>
            <TextField label="Subject" className="double" required value={subject}></TextField>
        </div>
        <div className="field">
            <FormControl className="double">
                <InputLabel>Grade</InputLabel>
                <Select label="Grade" value={grade}>
                    {
                        gradeList.map(grade => (<MenuItem value={grade.id}> {grade.gradeName} </MenuItem>))
                    }
                </Select>
            </FormControl>
            <Checkbox checked={isOpt} onChange={() => {
            if (isOpt) {
                setIsOpt(0);
            }
            else{
                setIsOpt(1)
            }}}></Checkbox><label>Is Optional</label>

        </div>
        <div className="field">
            <Button variant="outlined" className="double" onClick={() => {isOpen(false)}}>Cancel</Button>
            <label className="gap"></label>
            <Button variant="contained" className="double" onClick={saveResult}>Save</Button>
        </div>    
    </form>
    </>);
}