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
    <div className="del-cont">
        <h3 >Are you sure you want to delete this?</h3>
        <p> {result.sl} {result.subject}</p>
        <p> Grade : {result.gradeName}({result.points}) </p>
        <Button className="cancel-button" variant="outlined" onClick={() => {isOpen(false)}}> Cancel</Button>
        <Button variant="contained" className="delete-button" onClick={deleteRes}> Delete</Button>
    </div>
    </>);
}