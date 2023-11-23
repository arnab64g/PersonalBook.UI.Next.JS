import { Button } from "@mui/material";

export default function DeleteResult({result, isOpen}) {
    return(<>
    <h1 className="head">Are you sure you want to delete this?</h1>
    <table className="delete-table">
        <tr>
            <td> {result.sl}. </td>
            <td> {result.subject} </td>
        </tr>
        <tr>
            <td> {result.gradeName} </td>
            <td>{result.points}</td>
        </tr>
    </table>
    <div className="field">
        <Button className="double" variant="outlined" onClick={() => {isOpen(false)}}> Cancel</Button>
        <label className="gap"></label>
        <Button variant="contained" className="double delete-button"> Delete</Button>
    </div>
    </>);
}