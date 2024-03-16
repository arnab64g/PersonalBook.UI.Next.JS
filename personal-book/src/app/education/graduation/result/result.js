import { useEffect, useState } from "react";
import { IconButton, MenuItem, Button, Select, FormControl, InputLabel, Dialog, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import "./result.css";
import AddEditResult from "./addEditResults";
import { getResults } from "@/services/resultService";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { sortResults } from "@/app/tokenHandle/sortResults";

export default function Result() {
    const [resultsView, setResults] = useState([]);
    const [open, setIsOpen] = useState(false);
    const [final, setFinal] = useState({});
    const [finalResult, setFinalResult] = useState({});

    useEffect(() => {fetchComponent()}, []);

    const fetchComponent = async() => {
        const rawData = await getResults();
        const results = [];
        rawData.summary.forEach(element => {
            const sem = rawData.results.filter(x => x.semesterId == element.semId)[0];
            const result = rawData.results.filter(x => x.semesterId == element.semId);
            const summaries = rawData.summary.filter(x => x.semId == sem.semesterId)[0];
            const semData = {semester: sem, result: result, summary: summaries};
            results.push(semData);
        });
        const result = sortResults(results);
        setResults(result);
        console.log(result);
        const x = {total : rawData.totalPoints, credit: rawData.totalCredit};
        setFinal(x);
        if(final.credit > 0){
            setFinalResult({totalCredit : final.credit, cgpa : data.summary.totalPoints / data.summary.totalCredit});
        }
        else{
            setFinalResult({totalCredit : 0, cgpa : 0});
        }
        console.log("This: ", final.credit);
    }

    return (<>
        <h1>Result</h1>
        <FormControl className="select-semester">
            <InputLabel>Semester</InputLabel>
        <Select  label="Select">
            {
                resultsView.map(sem => (<MenuItem value={sem.semester.semesterId}> {sem.semester.semesterName} ({sem.semester.year})</MenuItem>))
            }
        </Select>
        </FormControl>

        <Button className="btns" size="large" variant="contained" onClick={()=> {setIsOpen(true)}}>Add Result</Button>
        <div className="final">
            <h4>Total Credit Earned: <i>{finalResult.totalCredit}</i> </h4>
            <h4> CGPA: <i>{ finalResult.cgpa }</i>  </h4>
        </div>
        {
            resultsView.map(data => (<>
                <h4>{data.semester.semesterName} ({data.semester.year})</h4>
                <Table className="table">
                    <TableHead>
                        <TableCell>Course Code</TableCell>
                        <TableCell>Course Title</TableCell>
                        <TableCell>Credit</TableCell>
                        <TableCell>Grade</TableCell>
                        <TableCell>Points</TableCell>
                        <TableCell></TableCell>
                    </TableHead>
                    <TableBody>
                        {
                            data.result.map(x => (
                                <TableRow>
                                    <TableCell> {x.courseCode}</TableCell>
                                    <TableCell> {x.courseTitle}</TableCell>
                                    <TableCell> {x.creditPoint}</TableCell>
                                    <TableCell> {x.gradeName}</TableCell>
                                    <TableCell> {x.points}</TableCell>
                                    <TableCell>
                                    <IconButton onClick={() => {}}> <EditIcon color="primary"></EditIcon> </IconButton>
                                    <IconButton onClick={() => {}} className="delete"> <DeleteIcon></DeleteIcon> </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <div className="final-sm">
                    <p> <b> Total Credit Earned: </b>  <i>{finalResult.totalCredit}</i> </p>
                    <p> <b> CGPA: </b> <i>{finalResult.cgpa}</i>  </p>
                </div>
            </>))
        }
        <Dialog open={open}>
            <AddEditResult data={1} isOpen={setIsOpen}></AddEditResult>
        </Dialog>
        </>);
}