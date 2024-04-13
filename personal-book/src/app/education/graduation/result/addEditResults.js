import { getCourses } from "@/services/courseService";
import { getGrades } from "@/services/gradeService";
import { getSemester } from "@/services/semesterService";
import {Button, Select, FormControl, InputLabel, MenuItem} from "@mui/material";
import { useState, useEffect } from "react";
import "./result.css";
import { addResultAsync, updateResultAsync } from "@/services/resultService";

export default function AddEditResult({data, isOpen}) {
    const [courseList, setCourseList] = useState([]);
    const [semesterList, setSemesterList] = useState([]);
    const [gradeList, setGradeList] = useState([]);
    const [course, setCourse] = useState(0);
    const [semester, setSemester] = useState(0);
    const [grade, setGrade] = useState(0);

    useEffect(() => { fetchData(); }, []);

    const fetchData = async function name() {
        const gList = (await getGrades()).filter(x => x.scale == 4);
        setGradeList(gList);
        const sList = await getSemester();
        setSemesterList(sList);
        const cList = await getCourses();
        setCourseList(cList);
        if (data.id) {
            setCourse(data.course);
            setGrade(data.grade);
            setSemester(data.semester);
        }
        console.log("Passed", data);
        
    }

    const saveChange = async () =>{
        const result = {
            id: data.id,
            semesterId : semester,
            courseId : course,
            gradeId : grade
        };

        if (data.id == 0) {
            const res = await addResultAsync(result);
            
            if (res) {
                alert("Saved Successfully");
                isOpen(false);
            }
            else{
                alert("Unable to save.");
            }
        }
        else{
            const res = await updateResultAsync(result);

            if (res) {
                alert("Updated Successfully.");
                isOpen(false);
            }
            else{
                alert("Unable to Update.");
            }
        }
    }

    return(<>
    <div className="add-edit-res">
        <h2>Add or Edit Results</h2>
        <FormControl className='course'>
            <InputLabel>Course</InputLabel>
            <Select label="Course" value={course} onChange={(e) => {setCourse(e.target.value) }}>
                <MenuItem disabled value={0}> Select Coourse </MenuItem>
                {
                    courseList.map(c => (<MenuItem value={c.id}>   {c.courseCode}</MenuItem>))
                }
            </Select>
        </FormControl>
        <FormControl className="semester">
            <InputLabel>Semester</InputLabel>
            <Select label="Semester" value={semester} onChange={(e) => {setSemester(e.target.value)}} >
                <MenuItem disabled value={0}> Select Semester </MenuItem>
                {
                    semesterList.map(sem => (<MenuItem value={sem.id}>{sem.semesterName} ({sem.year}) </MenuItem>))
                }
            </Select>
        </FormControl>
        <FormControl className="grade-add-edit">
            <InputLabel>Grade</InputLabel>
            <Select label="Grade" value={grade} onChange={(e) => {setGrade(e.target.value)}}>
                <MenuItem value={0}> Select Grade </MenuItem>
                {
                    gradeList.map(g=>(<MenuItem value={g.id}>{g.gradeName}</MenuItem>))
                }
                <MenuItem></MenuItem>
            </Select>
        </FormControl>
        <Button variant="outlined" className="cancel-button" onClick={() => {isOpen(false)}}>Close</Button>
        <Button className="save-button" variant="contained" onClick={() => {saveChange()}}>Save</Button>
    </div>
    </>)
}