"use client";

import { getToken } from "@/app/tokenHandle/tokenHandle";
import { Select, TextField, Checkbox, Button, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";

export default function AddResult({result, isOpen}) {
    const level = result.level;
    const [sl, setSl] = useState(result.sl);
    const [subject, setSubject] = useState(result.subject);
    const [grade, setGrade] = useState(result.gradeId);
    const [gradeList, setGradeList] = useState([]);
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
            <Select className="double" label="Grade">
                {
                    gradeList.map(grade => (<MenuItem value={grade.id}> {grade.gradeName} </MenuItem>))
                }
            </Select>
            <Checkbox ></Checkbox><label>Is Optional</label>
        </div>
        <div className="field">
            <Button variant="outlined" className="double" onClick={() => {isOpen(false)}}>Cancel</Button>
            <Button variant="contained" className="double">Save</Button>
        </div>
        
    </form>
    </>);
}