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
            console.log(resultNew);
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
    
    <form className="add-edit">
        <div>
            {
                level == 10 ? <h1 className="head">SSC Result</h1> : <h1 className="head">HSC Result</h1>
            }
            <TextField label="Sl" className="sl" required type="number" value={sl}
            onChange={(e) => {setSl(e.target.value)}}></TextField>
            <TextField label="Subject" className="subject" required value={subject} onChange={(e) => {setSubject(e.target.value)}}></TextField>
            <div className="g-o">
                <FormControl className="grade">
                    <InputLabel>Grade</InputLabel>
                    <Select label="Grade" value={grade} onChange={(e) => {setGrade(e.target.value)}}>
                        {
                            gradeList.map(grade => (<MenuItem value={grade.id}> {grade.gradeName} </MenuItem>))
                        }
                    </Select>
                </FormControl>
                <div className="optional">
                    <Checkbox checked={isOpt} onChange={() => {
                    if (isOpt) {
                        setIsOpt(0);
                    }
                    else{
                        setIsOpt(1)
                    }}}></Checkbox><label>Is Optional</label>

                </div>
            </div>
            <Button variant="outlined" className="cancel-button" onClick={() => {isOpen(false)}}>Cancel</Button>
            <Button variant="contained" className="save-button" onClick={saveResult}>Save</Button>
        </div>
    </form>
    </>);
}