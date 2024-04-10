import { Button } from "@mui/material";
import { Month } from "@/app/tokenHandle/month";
import { deleteSemesterS } from "@/services/semesterService";

export default function DeleteSemester({semester, isOpenDialog}) {
    const month = Month;
    const deleteSemester =  async () =>{
        const result = await deleteSemesterS(semester.id);

        if (result) {
            alert("Semester deleted successfully.");
            isOpenDialog(false);
        }
        else{
            alert("Unable to delete.")
        }
    }

    return(<>
        <div className="delete-container">
            <h3 className="head"> Are you sure you want ro delete this semester? </h3>
            <p> {semester.semesterName} </p>
            <p> {month[semester.monthBng-1].name} {semester.year} </p>
            <Button  variant="outlined" className="cancel-button" onClick={() => {isOpenDialog(false)}}> Cancel </Button>
            <Button variant="contained" className="double delete-button" onClick={deleteSemester}> Delete </Button>

        </div>
    </>);
}