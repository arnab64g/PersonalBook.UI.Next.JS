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
    <h1 className="head">Delete Course</h1>
    <form className="del-f">
        <div className="field">
            <table className="delete-table">
                <tr>
                    <td>Course Code: </td>
                    <td>{course.courseCode}</td>
                </tr>
                <tr>
                    <td>Course Title:</td>
                    <td> {course.courseTitle} </td>
                </tr>
                <tr>
                    <td>Credit Hour:</td>
                    <td> {course.creditPoint} </td>
                </tr>
            </table>
            <Button className="double" 
            onClick={() => {isOpen(false)}}> Cancel </Button>
            <label className="gap"></label>
            <Button className="double delete-button" onClick={deleteCourse}> Delete </Button>
        </div>
    </form>
    </>)
}