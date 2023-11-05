import { Button } from "@mui/material";

export default function DeleteCourse({course, isOpen}) {
    return (<>
    <h1>Delete Course</h1>
    <form>
        <div className="field">
            <Button className="double" variant="outlined" onClick={() => {isOpen(false)}}> Cancel </Button>
            <label className="gap"></label>
            <Button className="double delete-button"> Delete </Button>
        </div>
    </form>
    </>)
}