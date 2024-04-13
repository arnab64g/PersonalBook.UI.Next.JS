import { deleteResultS } from "@/services/resultService";
import { Button } from "@mui/material";

export default function Delete({data, isOpen}) {
    const deleteResult = async () => {
        const res = deleteResultS(data.id);
        if (res) {
            alert("Deleted Successfully");
            isOpen(false);
        }
        else{
            alert("Failed to delete.");
        }
    }
    return(<>
    <div className="delete-res">
        <h3 >Are you sure you want to delete this result?</h3>
        <p> {data.courseTitle} </p>
        <p> Course Code: {data.courseCode} </p>
        <p> Grade: {data.grade} </p>
        <Button className="cancel-button" onClick={() => { isOpen(false) }} variant="outlined"> Cancel </Button>
        <Button className="delete-button" variant="contained" onClick={() => {deleteResult()}}> Delete </Button>
    </div>
    </>)
}