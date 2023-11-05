import { TextField } from "@mui/material";
import { Button } from "@mui/material";

export default function AddEditCourse( {course, isOpen} ){
    return(
        <>
        <form>
            <h1>Course</h1>
            <TextField label="Course Title"></TextField>
            <div>
                <Button onClick={() => {isOpen(false)}}> Cancel </Button>
            </div>
        </form>
        </>
    );
}