import { getUserId } from "@/app/tokenHandle/tokenHandle";
import { IconButton, Button, Dialog, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import AddResult from "./addSecondaryResult";
import DeleteResult from "./deleteSecondaryResult";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getSecondaryResults } from "@/services/secondaryResultService";

export default function SecondaryResult(){
    const [choice, setChoice] = useState(10); 
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [result, setResult] = useState({});
    const [results, setResults] = useState([]);
    const [viewResults, setViewResults] = useState([]);

    useEffect(() => {fetchSecondaryResult()}, [isOpen, isDeleteOpen]);

    const fetchSecondaryResult = async () =>{
        let result = await getSecondaryResults();

        result.results = result.results.sort((a, b) => {
            if (a.sl > b.sl) {
                return 1;
            }
            else{
                return -1;
            }
        });

        setResults(result.results);
        setViewResults(result.results.filter(x => x.level == choice));
    }

    const addEditResult = (id) =>{
        let result = {};

        if (id == 0) {
            result = {
                id : 0,
                userId : getUserId(),
                isOptional : 0,
                level : choice,
                sl: 0,
                gradeId : null
            }
        }
        else{
            result = results.filter(x => x.id == id)[0];
        }

        setResult(result);
        setIsOpen(true);
    }

    const choiceChange = async (opt) =>{
        setChoice(opt);
        const result = results.filter(x => x.level == opt);

        setViewResults(result);
    }

    const deleteRes = async (id) =>{
        const result = results.filter(x => x.id == id)[0];
        setResult(result)
        setIsDeleteOpen(true);
    }

    return(<>
    <div className="secondary-opt">
        <Select  className="select" value={choice} onChange={(e) => {choiceChange(e.target.value)} }>
            <MenuItem value={10}>SSC</MenuItem>
            <MenuItem value={12}>HSC</MenuItem>
        </Select>
        <Button className="add-btn" variant="contained" onClick={() => {addEditResult(0)}}>Add Result</Button>
    </div>
    <Table className="table">
        <TableHead className="thead">
            <TableCell className="thead">Sl.</TableCell>
            <TableCell className="thead">Subject</TableCell>
            <TableCell className="thead">Grade</TableCell>
            <TableCell className="thead">Points</TableCell>
            <TableCell className="thead"></TableCell>
        </TableHead>
        <TableBody>
            {
                viewResults.map((re) => <TableRow>
                    <TableCell className="tbody"> {re.sl} </TableCell>
                    <TableCell className="tbody"> {re.subject} {re.isOptional ? "(Optuonal)" : ""} </TableCell>
                    <TableCell className="tbody"> {re.gradeName} </TableCell>
                    <TableCell className="tbody"> {re.isOptional ? re.points - 2 : re.points} </TableCell>
                    <TableCell className="tbody">
                        <IconButton onClick={() => {addEditResult(re.id)}}> <EditIcon color="primary"></EditIcon></IconButton>
                        <IconButton onClick={() => {deleteRes(re.id)}}> <DeleteIcon className="delete-icon-button"></DeleteIcon> </IconButton>
                    </TableCell>
                </TableRow>)
            }
        </TableBody>
    </Table>
    <Dialog open={isOpen}>
        <AddResult result={result} isOpen={setIsOpen}></AddResult>
    </Dialog>
    <Dialog open={isDeleteOpen}>
        <DeleteResult result={result} isOpen={setIsDeleteOpen}></DeleteResult>
    </Dialog>
    </>);
}