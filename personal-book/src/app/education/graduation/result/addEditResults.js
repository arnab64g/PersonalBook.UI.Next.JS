import {Button} from "@mui/material";

export default function AddEditResult({data, isOpen}) {
    return(<>
    <h1>Add or Edit Results</h1>
    <Button onClick={() => {isOpen(false)}}>Close</Button>
    <Button variant="contained">Save</Button>
    </>)
}