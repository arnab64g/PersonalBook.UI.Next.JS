"use client";

import { getToken, isAdmin } from "@/app/tokenHandle/tokenHandle";
import { Button, Dialog, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import AddEditGrade from "../add-edit-geade/add-edit-grade";

export default function GradeList() {
    const isaAdmin  = isAdmin();
    const [grades, setGrades] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [grade, setGrade] = useState({});
    const [scale, setScale] = useState(4);
    const [listView, selectListView] = useState([]);

    useEffect(()=>{fetchGrades()}, []);

    const addEditGrade = async(id) =>{
        let grd;
        if (id == 0) {
            grd = {
                id : 0,
                gradeName : "",
                scale : scale,
                points : 0,
                maxNumber : 0,
                minNumber : 0
            }
        }
        else{
            grd = grades.filter(x => x.id == id)[0];
        }
        
        setGrade(grd);
        setIsOpen(true);
    }

    const selectScale = async (event) => {
        console.log(event.target.value);
        setScale(event.target.value);
        const filtered = grades.filter(x => x.scale == event.target.value);
        selectListView(filtered);
    } 

    const fetchGrades = async() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,
                        'authorization' : `bearer ${getToken()}` }
        };

        const res = await fetch('http://localhost:7108/api/Grade', requestOptions);
        const result = await res.json();

        setGrades(result);
        const filtered = result.filter(x => x.scale == scale);
        selectListView(filtered);
        console.log(filtered);
    }
    
    return (
        <div>
            <Button variant="contained" onClick={() => {addEditGrade(0)} }>Add Grade</Button>
            <Select value={scale} onChange={selectScale}>
                <MenuItem value={4}> Scale 4.0 </MenuItem>
                <MenuItem value={5}> Scale 5.0 </MenuItem>
            </Select>
            <Dialog open={isOpen} >
                <AddEditGrade grade={grade} closeAction={setIsOpen}></AddEditGrade>
            </Dialog>
            <Table>
                <TableHead>
                    <TableCell>Grade</TableCell>
                    <TableCell>Points</TableCell>
                    <TableCell> Numbers </TableCell>
                </TableHead>
                <TableBody>
                    { listView.map( grade => (<TableRow>
                            <TableCell> {grade.gradeName}</TableCell>
                            <TableCell> {grade.points} </TableCell>
                            <TableCell> {grade.minNumber} - {grade.maxNumber} </TableCell>
                            {isaAdmin ? 
                            <TableCell>
                                <Button onClick={() => {addEditGrade(grade.id)}}>Edit</Button> 
                                <Button>Delete</Button>
                            </TableCell> : null}
                        </TableRow> ))}
                </TableBody>
            </Table>
        </div>
    );
}