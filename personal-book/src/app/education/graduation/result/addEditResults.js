import { getCourses } from "@/services/courseService";
import { getGrades } from "@/services/gradeService";
import { getSemester } from "@/services/semesterService";
import {Button, Select, FormControl, InputLabel, MenuItem} from "@mui/material";
import { useState, useEffect } from "react";
import "./result.css";

export default function AddEditResult({data, isOpen}) {
    const [courseList, setCourseList] = useState([]);
    const [semesterList, setSemesterList] = useState([]);
    const [gradeList, setGradeList] = useState([]);
    const [result, setResult] = useState({course : 0, grade: 0, semester: 0});

    useEffect(() => { fetchData(); }, []);

    const fetchData = async function name() {
        const gradeList = (await getGrades()).filter(x => x.scale == 4);
        setGradeList(gradeList);
        const semesterList = await getSemester();
        setSemesterList(semesterList);
        const courseList = await getCourses();
        setCourseList(courseList);
        if (data.id) {
            setResult(data);
        }
        console.log("Passed", data);
        
    }
    return(<>
    <h1>Add or Edit Results</h1>
    <FormControl className='select-opt'>
        <InputLabel>Course</InputLabel>
        <Select label="Course" value={result.course}>
            <MenuItem disabled value={0}> Select Coourse </MenuItem>
            {
                courseList.map(c => (<MenuItem value={c.id}>  {c.courseCode}</MenuItem>))
            }
        </Select>
    </FormControl>
    <FormControl className="select-opt">
        <InputLabel>Semester</InputLabel>
        <Select label="Semester" value={result.semester}>
            <MenuItem disabled value={0}> Select Semester </MenuItem>
            {
                semesterList.map(sem => (<MenuItem value={sem.id}>{sem.semesterName} ({sem.year}) </MenuItem>))
            }
        </Select>
    </FormControl>
    <FormControl className="select-opt">
        <InputLabel>Grade</InputLabel>
        <Select label="Grade" value={result.grade}>
            <MenuItem value={0}> Select Grade </MenuItem>
            {
                gradeList.map(g=>(<MenuItem value={g.id}>{g.gradeName}</MenuItem>))
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