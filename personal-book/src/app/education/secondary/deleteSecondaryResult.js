import { getToken } from "@/app/tokenHandle/tokenHandle";
import { deleteSecondaryResult } from "@/services/secondaryResultService";
import { Button } from "@mui/material";

export default function DeleteResult({result, isOpen}) {
    const deleteRes = async () => {
        const result1 = await deleteSecondaryResult(result.id)

        if (result1) {
            alert("Deleted successed");
        }
        else{
            alert("Unable to delete.")
        }

        isOpen(false);
    }

    return(<>
    <h1 className="head">Are you sure you want to delete this?</h1>
    <table className="delete-table">
        <tr>
            <td> {result.sl}. </td>
            <td> {result.subject} </td>
        </tr>
        <tr>
            <td> {result.gradeName} </td>
            <td> {result.points} </td>
        </tr>
    </table>
    <div className="field">
        <Button className="double" variant="outlined" onClick={() => {isOpen(false)}}> Cancel</Button>
        <label className="gap"></label>
        <Button variant="contained" className="double delete-button" onClick={deleteRes}> Delete</Button>
    </div>
    </>);
}