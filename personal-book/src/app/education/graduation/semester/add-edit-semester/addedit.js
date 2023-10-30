import { Month } from "@/app/tokenHandle/month";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import "./style.css"

export default function AddEditSemester({semester, isOpenDialog}) {
    const month = Month;
    console.log(month);
    const closeDialog = async () => {
        isOpenDialog(false);
    }
    return(
        <>
        <form>
        <h1> Semester </h1>
        <div className="field">
            <TextField  required label="Semester Name"></TextField>
        </div>
        <div className="field">
            <Select className="col" label="Month" placeholder="Select MOnth">
                {month.map(m => (<MenuItem value={m.id}> {m.name} </MenuItem>))}
            </Select>
            <label className="gap"></label>
            <TextField className="col" label="Year"></TextField>
        </div>
        <div className="field">
            <Button  className="col" variant="outlined" onClick={() => {closeDialog()}}> Cancel </Button>
            <label className="gap"></label>
            <Button className="col" variant="contained"> Save </Button>
        </div>
        </form>
        
        </>
    );
}