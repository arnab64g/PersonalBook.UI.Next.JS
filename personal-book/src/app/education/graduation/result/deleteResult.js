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
        <h1 className="head">Delete Result</h1>
        <form className="del-f">
            <table className="delete-table">
                <tr>
                    <td>{data.courseTitle}</td>
                </tr>
                <tr>
                    <td> {data.courseCode} </td>
                    <td> {data.grade} </td>
                </tr>
            </table>
            <div className="select-opt">
                <Button className="double" onClick={() => { isOpen(false) }} variant="outlined"> Cancel </Button>
                <label className="gap"></label>
                <Button className="double delete-button" variant="contained" onClick={() => {deleteResult()}}> Delete </Button>
            </div>
        </form>
    </>)
}