import { getCourses } from "@/services/courseService";
import { getGrades } from "@/services/gradeService";
import { getSemester } from "@/services/semesterService";
import {Button, Select, FormControl, InputLabel, MenuItem} from "@mui/material";
import { useState, useEffect } from "react";
import "./result.css";

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
        const semesterList = await getSemester();
        console.log(semesterList);
        setSemesters(semesterList);
        const courseList = await getCourses();
        setCourses(courseList);
    }
    return(<>
    <h1>Add or Edit Results</h1>
    <FormControl className='select-opt'>
        <InputLabel>Course</InputLabel>
        <Select label="Course">
            {
                courses.map(c => (<MenuItem value={c.id}>{c.courseCode}</MenuItem>))
            }
        </Select>
    </FormControl>
    <FormControl className="select-opt">
        <InputLabel>Semester</InputLabel>
        <Select label="Semester">
            {
                semesters.map(sem => (<MenuItem value={sem.id}>{sem.semesterName} ({sem.year}) </MenuItem>))
            }
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
    <div className="select-opt">
        <Button variant="outlined" className="double" onClick={() => {isOpen(false)}}>Close</Button>
        <label className="gap"></label>
        <Button className="double" variant="contained">Save</Button>
    </div>
    </>)
}