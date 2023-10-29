import { Month } from "@/app/tokenHandle/month";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import "./style.css"

export default function AddEditSemester({isOpenDialog}) {
    const month = Month;
    console.log(month);
    const closeDialog = async () => {
        isOpenDialog(false);
    }
    return(
        <>
        <h1> Semester </h1>
        <div className="row">
            <TextField className="col1" required label="Semester Name"></TextField>
        </div>
        <div className="row">
            <Select className="col" label="Month">
                {month.map(m => (<MenuItem value={m.id}> {m.name} </MenuItem>))}
            </Select>
            <TextField className="col" label="Year"></TextField>
        </div>
        <div>
            <Button variant="outlined" onClick={() => {closeDialog()}}> Cancel </Button>
            <Button variant="contained"> Save </Button>
        </div>
        </>
    );
}