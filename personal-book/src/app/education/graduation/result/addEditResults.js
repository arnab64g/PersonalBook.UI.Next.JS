import { getGrades } from "@/services/gradeService";
import {Button, Select, FormControl, InputLabel, MenuItem} from "@mui/material";
import { useState, useEffect } from "react";

export default function AddEditResult({data, isOpen}) {
    const [courses, setCourses] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async function name() {
        const gradeList = (await getGrades()).filter(x => x.scale == 4);
        setGrades(gradeList);
    }
    return(<>
    <h1>Add or Edit Results</h1>
    <FormControl className='select-opt'>
        <InputLabel>Course</InputLabel>
        <Select label="Course">
            <MenuItem></MenuItem>
        </Select>
    </FormControl>
    <FormControl className="select-opt">
        <InputLabel>Semester</InputLabel>
        <Select label="Semester">
            <MenuItem></MenuItem>
        </Select>
    </FormControl>
    <FormControl className="select-opt">
        <InputLabel>Grade</InputLabel>
        <Select label="Grade">
            {
                grades.map(g=>(<MenuItem value={g.id}>{g.gradeName}</MenuItem>))
            }
            <MenuItem></MenuItem>
        </Select>
    </FormControl>
    <div>
        <Button className="double" onClick={() => {isOpen(false)}}>Close</Button>
        <label className="gap"></label>
        <Button className="double" variant="contained">Save</Button>
    </div>
    </>)
}