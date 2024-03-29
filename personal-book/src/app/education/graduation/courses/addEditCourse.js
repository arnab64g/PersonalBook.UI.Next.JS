import { addCourse, updateCourse } from "@/services/courseService";
import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function AddEditCourse( {course, isOpen} ){
    const [courseCode, setCourseCode] = useState(course.courseCode);
    const [courseTitle, setcourseTitle] = useState(course.courseTitle);
    const [creditPoint, setCreditPoint] = useState(course.creditPoint);
    const [error, setError] = useState({});

    useEffect(() => {isValid()}, [courseCode, courseTitle, creditPoint]);

    const isValid = () =>{
        let errors = {};

        if (!courseCode) {
            errors.courseCode = true;
        }
        if (!courseTitle) {
            errors.courseTitle = true;
        }
        if (creditPoint == 0) {
            errors.creditPoint = true;
        }

        setError(errors);
    }

    const saveChange = async () => {
        course.courseCode = courseCode;
        course.courseTitle = courseTitle;
        course.creditPoint = creditPoint;
        let result = {};
        if (course.id == 0) {
            result = await addCourse(course);
        }
        else{
            result = await updateCourse(course);
        }

        if (result) {
            alert("Save Changed.");
            isOpen(false);
        }
        else{
            alert("Unable to save.");
        }
    }

    return(
        <>
        <form>
            <h1 className="head"> Course</h1>
            <div className="field">
                <TextField error={error.courseTitle} value={courseTitle} required className="single" label="Course Title"
                onChange={(e)=>{setcourseTitle(e.target.value)}}></TextField>
            </div>
            <div className="field">
                <TextField error={error.courseCode} value={courseCode} label="Course Code" required className="double"
                onChange={(e) => {setCourseCode(e.target.value)}}></TextField>
                <label className="gap"></label>
                <TextField error={error.creditPoint} value={creditPoint} label="Credit Hour" required type="number" 
                onChange={(e)=>{setCreditPoint(e.target.value)}} className="double"></TextField>
            </div>
            <div className="field">
                <Button variant="outlined" className="double" onClick={() => {isOpen(false)}}> Cancel </Button>
                <label className="gap"></label>
                <Button variant="contained" onClick={saveChange} className="double">Save</Button>
            </div>
        </form>
        </>
    );
}