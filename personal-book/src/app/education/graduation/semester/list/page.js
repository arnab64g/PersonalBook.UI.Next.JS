"use client";

import { Month } from "@/app/tokenHandle/month";
import { getUserId } from "@/app/tokenHandle/tokenHandle";
import { Button, Dialog, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddEditSemester from "../add-edit-semester/addedit";
import DeleteSemester from "./deleteSemester";
import "./semester.css";
import { getSemester } from "@/services/semesterService";
import { sortSemester } from "@/app/tokenHandle/sortSemester";

export default function SemesterList(){
    const [semesterList, setSemesterList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [semester, setSemester] = useState({});
    const month = Month;

    const addEdit = async (id) => {
        if (id == 0) {
            const newSemester = {
                id:0,
                userId : getUserId(),
                semesterName : "",
                monthBng : new Date().getMonth(),
                year : new Date().getFullYear()
            };
            setSemester(newSemester);
        }
        else{
            const selectedSemester = semesterList.filter(x => x.id == id)[0];
            setSemester(selectedSemester);
        }
        setIsOpen(true);
    }

    useEffect(() => {fetchSemester()}, [isOpen, isDeleteOpen]);

    const fetchSemester = async () =>{
        const result = await getSemester();
        const sorted = sortSemester(result);
        setSemesterList(sorted);
    }

    const deleteSemester = async (id) =>{
        const sem = semesterList.filter(x => x.id == id)[0];
        setSemester(sem);
        setIsDeleteOpen(true);
    }

    return(<>
    <h1>Semester List</h1>
    <div className="cont">
    <Button  variant="contained" className="options" onClick={() => {addEdit(0)}}> Add Semester </Button>
    <Table className="semester-table">
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
                                                    <IconButton onClick={() => {addEdit(sem.id)}}><EditIcon color="primary"></EditIcon></IconButton> 
                                                    <IconButton onClick={() => { deleteSemester(sem.id)}} className="delete"> <DeleteIcon></DeleteIcon></IconButton>
                                                </TableCell>
                                            </TableRow>))
            }
        </TableBody>
    </Table>
    </div>
    <Dialog open={isOpen} >
        <AddEditSemester semester={semester} isOpenDialog={setIsOpen}></AddEditSemester>
    </Dialog>
    <Dialog open={isDeleteOpen}>
        <DeleteSemester semester={semester} isOpenDialog={setIsDeleteOpen}></DeleteSemester>
    </Dialog>
    </>)
}