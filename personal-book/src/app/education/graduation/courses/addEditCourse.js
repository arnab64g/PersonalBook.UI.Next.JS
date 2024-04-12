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
        <form className="add-course-form">
            <h2> Add or Edit Course</h2>
            <TextField error={error.courseTitle} value={courseTitle} required className="ctitle" label="Course Title"
                onChange={(e)=>{setcourseTitle(e.target.value)}}>
            </TextField>
            <TextField error={error.courseCode} value={courseCode} label="Course Code" required className="ccode"
                onChange={(e) => {setCourseCode(e.target.value)}}>
            </TextField>
            <TextField error={error.creditPoint} value={creditPoint} label="Credit Hour" required type="number" 
                onChange={(e)=>{setCreditPoint(e.target.value)}} className="chour">
            </TextField>
            <Button variant="outlined" className="cancel-button" onClick={() => {isOpen(false)}}> Cancel </Button>
            <Button variant="contained" onClick={saveChange} className="save-button">Save</Button>
        </form>
        </>
    );
}