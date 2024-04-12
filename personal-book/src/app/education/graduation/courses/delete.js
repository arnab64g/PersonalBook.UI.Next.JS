import { Button } from "@mui/material";
import "./course.css";
import { deleteCourseS } from "@/services/courseService";

export default function DeleteCourse({course, isOpen}) {
    const deleteCourse = async () =>{
        const result = await deleteCourseS(course.id);

        if (result) {
            alert("Deleted successfully.");
            isOpen(false);
        }
        else{
            alert("Unable to delete.");
        }
    }

    return (<>
    <div className="del-pop">
        <h3>Are you sure you want to delete this course?</h3>
        <p> {course.courseTitle} </p>
        <p> Course Code: {course.courseCode} </p>
        <p> Credit: {course.creditPoint} </p>
        <Button className="cancel-button" variant="outlined"
            onClick={() => {isOpen(false)}}> Cancel
        </Button>
        <Button className="delete-button" onClick={deleteCourse}> Delete 
        </Button>
    </div>
    </>)
}