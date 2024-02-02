import { getToken, getUserId } from "@/app/tokenHandle/tokenHandle";
import { useEffect, useState } from "react";
import { MenuItem, Button, Select, FormControl, InputLabel, Dialog, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import "./result.css";
import AddEditResult from "./addEditResults";

export default function Result() {
    const [resultsView, setResults] = useState([]);
    const [open, setIsOpen] = useState(false);

    useEffect(() => {fetchComponent()}, []);

    const fetchComponent = async() => {
        const userId  = getUserId();
        const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
                    'authorization' : `bearer ${getToken()}` }
        };
        const res = await fetch(`http://localhost:7108/api/Result?id=${userId}`, requestOptions);
        const rawData = await res.json();
        const results = [];
        rawData.summary.forEach(element => {
            const sem = rawData.results.filter(x => x.semesterId == element.semId)[0];
            const result = rawData.results.filter(x => x.semesterId == element.semId);
            const semData = {semester: sem, result: result};
            console.log(sem);
            results.push(semData);
        });
        console.log(results);
        setResults(results);
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
        {
            resultsView.map(data => (<>
            <div>
                <h3>{data.semester.semesterName} ({data.semester.year})</h3>
            </div>
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
                                        <Button>Edit</Button>
                                        <Button>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </>))
        }
        <Dialog open={open}>
            <AddEditResult data={1} isOpen={setIsOpen}></AddEditResult>
        </Dialog>
        </>);
}