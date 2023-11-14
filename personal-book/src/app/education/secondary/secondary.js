import { getToken, getUserId } from "@/app/tokenHandle/tokenHandle";
import { Button, Dialog, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import AddResult from "./addSecondaryResult";
import DeleteResult from "./deleteSecondaryResult";

export default function SecondaryResult(){
    const [choice, setChoice] = useState(10); 
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [result, setResult] = useState({});

    useEffect(() => {fetchSecondaryResult()}, []);

    const fetchSecondaryResult = async () =>{
        const userId = getUserId();
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,
                        'authorization' : `bearer ${getToken()}` }
        };
        const res = await fetch(`http://localhost:7108/api/SecondaryResult?id=${userId}`, requestOptions);
        const result = await res.json();
        console.log(result);
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
                gradeId : 0
            }
            setResult(result);
            setIsOpen(true);
        }
    } 

    const choiceChange = async (opt) =>{
        setChoice(opt);
    }

    return(<>
    <div>
        <Select value={choice} size="small" onChange={(e) => {choiceChange(e.target.value)} }>
            <MenuItem value={10}>SSC</MenuItem>
            <MenuItem value={12}>HSC</MenuItem>
        </Select>
        <label className="gap"></label>
        <Button variant="contained" onClick={() => {addEditResult(0)}}>Add Result</Button>
    </div>
    <Dialog open={isOpen}>
        <AddResult result={result} isOpen={setIsOpen}></AddResult>
    </Dialog>
    <Dialog open={isDeleteOpen}>
        <DeleteResult></DeleteResult>
    </Dialog>
    </>);
}