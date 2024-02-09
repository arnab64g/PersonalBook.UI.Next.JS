"use client";

import { getGrades } from "@/services/gradeService";
import { addSecondaryResult, updateSecondaryResult } from "@/services/secondaryResultService";
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
        const result = await getGrades();

        setGradeList(result.filter(x => x.scale == 5));
    }

    const saveResult = async () => {
        const res = {
            id : result.id,
            level : result.level,
            sl : sl,
            userId : result.userId,
            isOptional : isOpt,
            subject : subject,
            gradeId : grade
        }

        let resultNew = {};

        if (res.id == 0) {
            resultNew = await addSecondaryResult(res);
        }
        else{
            resultNew= await updateSecondaryResult(res);
        }

        resultNew = await resultNew.json();

        if (resultNew) {
            alert("Saved Successfully.");
            isOpen(false);
        }
        else{
            alert("Unable to Save");
        }
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
            <TextField label="Subject" className="double" required value={subject} onChange={(e) => {setSubject(e.target.value)}}></TextField>
        </div>
        <div className="field">
            <FormControl className="double">
                <InputLabel>Grade</InputLabel>
                <Select label="Grade" value={grade} onChange={(e) => {setGrade(e.target.value)}}>
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