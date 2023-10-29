"use client";

import { Month } from "@/app/tokenHandle/month";
import { getToken, getUserId } from "@/app/tokenHandle/tokenHandle";
import { Button, Dialog, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import "./style.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddEditSemester from "../add-edit-semester/addedit";

export default function SemesterList(){
    const [semesterList, setSemesterList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const month = Month;
    const addEdit = async () => {
        console.log("IOpen");
        setIsOpen(true);
    }
    useEffect(() => {fetchSemester();}, isOpen);
    const fetchSemester = async () =>{
        const userId = getUserId();
        console.log(getToken( ));
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,
                        'authorization' : `bearer ${getToken()}` }
        };
        console.log("UserId: ", userId);
        const res = await fetch(`http://localhost:7108/api/Semester?id=${userId}`, requestOptions);
        const result = await res.json();
        console.log(result);
        console.log("Now");
        setSemesterList(result);
    }
    
    return(<>
    <h1>Semester List</h1>
    <Button variant="contained" onClick={addEdit}>Add Semester</Button>

    <Table className="table">
        <TableHead className="thead">
            <TableCell className="thead">Semester Name</TableCell>
            <TableCell className="thead">Month Started</TableCell>
            <TableCell className="thead">Year</TableCell>
            <TableCell className="thead"></TableCell>
        </TableHead>
        <TableBody className="tbody">
            {
                semesterList.map((sem) => ( <TableRow className="tbody">
                                                <TableCell className="tbody">{sem.semesterName}</TableCell>
                                                <TableCell className="tbody"> {month[sem.monthBng - 1].name }</TableCell>
                                                <TableCell className="tbody">{sem.year}</TableCell>
                                                <TableCell className="tbody"> 
                                                    <IconButton><EditIcon color="primary"></EditIcon></IconButton> 
                                                    <IconButton className="delete"> <DeleteIcon></DeleteIcon></IconButton>
                                                </TableCell>
                                            </TableRow>))
            }
        </TableBody>
    </Table>
    <Dialog open={isOpen} >
        <AddEditSemester isOpenDialog={setIsOpen}></AddEditSemester>
    </Dialog>
    </>)
}