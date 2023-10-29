import { Button } from "@mui/material";

export default function AddEditSemester({isOpenDialog}) {
    const closeDialog = async () => {
        isOpenDialog(false);
    }
    return(
        <>
        <h1> Semester </h1>
        <div>
            <Button variant="outlined" onClick={() => {closeDialog()}}> Cancel </Button>
            <Button variant="contained"> Save </Button>
        </div>
        </>
    );
}