import { Button } from "@mui/material";
import "./course.css";
import { getToken } from "@/app/tokenHandle/tokenHandle";

export default function DeleteCourse({course, isOpen}) {
    console.log(course);
    const deleteCourse = async () =>{
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' ,
                        'authorization' : `bearer ${getToken()}`},
        };

        const res = await fetch(`http://localhost:7108/api/Course?id=${course.id}`, requestOptions);
        const result = await res.json()

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
                <td>
                    <td>Credit Hour:</td>
                    <td> {course.creditPoint} </td>
                </td>
            </table>
            <Button className="double" variant="outlined" onClick={() => {isOpen(false)}}> Cancel </Button>
            <label className="gap"></label>
            <Button className="double delete-button" onClick={deleteCourse}> Delete </Button>
        </div>
    </form>
    </>)
}