import { Button } from "@mui/material";
import "./style.css";
import { Month } from "@/app/tokenHandle/month";

export default function DeleteSemester({semester, isOpenDialog}) {
    const month = Month;
    return(<>
        <div className="dialog">
            <h2> Are you sure you want ro delete this semester? </h2>
            <div>
                <table>
                    <tr>
                        <td>Semester Name: </td>
                        <td> {semester.semesterName} </td>
                    </tr>
                    <tr>
                        <td>Month Begain:</td>
                        <td> {month[semester.monthBng-1].name} </td>
                    </tr>
                    <tr>
                        <td>Year:</td>
                        <td> {semester.year} </td>
                    </tr>
                </table>
            </div>
            <div>
                <Button  variant="outlined" className="col" onClick={() => {isOpenDialog(false)}}> Cancel </Button>
                <label className="gap"></label>
                <Button variant="contained" className="col"> Delete </Button>
            </div>
        </div>
    </>);
}