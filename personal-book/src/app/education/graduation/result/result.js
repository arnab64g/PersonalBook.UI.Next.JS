import { useEffect, useState } from "react";
import { IconButton, MenuItem, Button, Select, FormControl, InputLabel, Dialog, Table, TableBody, TableCell, 
    TableHead, TableRow } from "@mui/material";
import "./result.css";
import AddEditResult from "./addEditResults";
import { getResults } from "@/services/resultService";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { sortResults } from "@/app/tokenHandle/sortResults";
import { filterSemesterResult } from "@/app/tokenHandle/result";
import Delete from "./deleteResult";

export default function Result() {
    const [resultsView, setResultView] = useState([]);
    const [results, setResults] = useState([]);
    const [open, setIsOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [finalResult, setFinalResult] = useState({});
    const [result, setResult] = useState({id : 0});
    const [data, setRawData] = useState([]);
    useEffect(() => {fetchComponent()}, [open, deleteOpen]);

    const fetchComponent = async() => {
        const rawData = await getResults();
        const results = [];
        
        setRawData(rawData.results);
        rawData.summary.forEach(element => {
            const sem = rawData.results.filter(x => x.semesterId == element.semId)[0];
            const result = rawData.results.filter(x => x.semesterId == element.semId);
            const summaries = rawData.summary.filter(x => x.semId == sem.semesterId)[0];
            const semData = {semester: sem, result: result, summary: summaries};
            results.push(semData);
        });
        const result = sortResults(results);
        setResultView(result);
        setResults(result);
        
        if(rawData.totalCredit){
            setFinalResult({totalCredit : rawData.totalCredit, cgpa : Math.round(rawData.totalPoints * 100 / rawData.totalCredit)/100});
        }
        else{
            setFinalResult({totalCredit : 0, cgpa : 0});
        }
    }

    const semesterSelected = (e, results) => {
        if (e.target.value == 0) {
            setResultView(results);
        }
        else{
            const list = filterSemesterResult(e.target.value, results);
            setResultView(list);
        }
    }

    const updateResult = (id) =>{
        const res = data.filter(x => x.id == id)[0];
        setResult({id : id, course: res.courseId, grade : res.gradeId, semester: res.semesterId});
        setIsOpen(true);
    }

    const deleteResult = (id) => {
        const res = data.filter(x => x.id == id)[0];
        setResult({id : res.id, courseCode : res.courseCode, courseTitle : res.courseTitle, grade : res.gradeName})
        setDeleteOpen(true);
    }

    return (<>
        <h1>Grdduation Result</h1>
        <div className="container-res">
            <FormControl className="sem-filter">
                <InputLabel>Semester</InputLabel>
                <Select  label="Select" onChange={(e) => {semesterSelected(e, results)}}>
                    <MenuItem value={0}>All Semester</MenuItem>
                    {
                        results.map(sem => (<MenuItem value={sem.semester.semesterId}> {sem.semester.semesterName} ({sem.semester.year})</MenuItem>))
                    }
                </Select>
            </FormControl>
            <Button className="add-btn-res" variant="contained" onClick={()=> {setResult({id : 0}); setIsOpen(true)}}>Add Result</Button>
        </div>
        <div className="final">
            <h4>Total Credit Earned: <i>{finalResult.totalCredit}</i> </h4>
            <h4> CGPA: <i>{ finalResult.cgpa }</i>  </h4>
        </div>
        {
            resultsView.map(data => (<>
                <h4>{data.semester.semesterName} ({data.semester.year})</h4>
                <Table className="table">
                    <TableHead>
                        <TableCell className="thead">Course Code</TableCell>
                        <TableCell className="thead">Course Title</TableCell>
                        <TableCell className="thead">Credit</TableCell>
                        <TableCell className="thead">Grade</TableCell>
                        <TableCell className="thead">Points</TableCell>
                        <TableCell className="thead"></TableCell>
                    </TableHead>
                    <TableBody>
                        {
                            data.result.map(x => (
                                <TableRow>
                                    <TableCell className="tbody"> {x.courseCode}</TableCell>
                                    <TableCell className="tbody"> {x.courseTitle}</TableCell>
                                    <TableCell className="tbody"> {x.creditPoint}</TableCell>
                                    <TableCell className="tbody"> {x.gradeName}</TableCell>
                                    <TableCell className="tbody"> {x.points}</TableCell>
                                    <TableCell className="tbody">
                                        <IconButton onClick={() => {updateResult(x.id)}}> <EditIcon color="primary"></EditIcon> </IconButton>
                                        <IconButton onClick={() => {deleteResult(x.id)}} className="delete-icon-button"> <DeleteIcon></DeleteIcon> </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <div className="final-sm">
                    <p> <b> Total Credit Earned: </b>  <i>{data.summary.totalCredit}</i> </p>
                    <p> <b> CGPA: </b> <i>{Math.round(data.summary.totalPoints * 100 / data.summary.totalCredit)/ 100}</i>  </p>
                </div>
            </>))
        }
        <Dialog open={open}>
            <AddEditResult data={result} isOpen={setIsOpen}></AddEditResult>
        </Dialog>
        <Dialog open={deleteOpen} >
            <Delete data={result} isOpen={setDeleteOpen}></Delete>
        </Dialog>
        </>);
}