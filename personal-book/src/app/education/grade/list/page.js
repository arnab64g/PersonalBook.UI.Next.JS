"use client";

import { isAdmin } from "@/app/tokenHandle/tokenHandle";
import { Button, Dialog, IconButton, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import AddEditGrade from "../add-edit-geade/add-edit-grade";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteGrade from "./delete";
import { getGrades } from "@/services/gradeService";

export default function GradeList() {
    const isaAdmin  = isAdmin();
    const [grades, setGrades] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [grade, setGrade] = useState({});
    const [scale, setScale] = useState(4);
    const [listView, selectListView] = useState([]);

    useEffect(()=>{fetchGrades()}, [isOpen, isDeleteOpen]);

    const addEditGrade = async(id) =>{
        let grd = {};

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
        setScale(event.target.value);
        const filtered = grades.filter(x => x.scale == event.target.value);
        selectListView(filtered);
    }

    const deleteGrade = async (id) => {
        const del = grades.filter(x => x.id == id)[0];

        setGrade(del);
        setIsDeleteOpen(true);
    }

    const fetchGrades = async() => {
        const result =await getGrades();

        setGrades(result);
        const filtered = result.filter(x => x.scale == scale);
        selectListView(filtered);
    }

    return (
        <div className="cont">
            <h1>List of Grades</h1>
            <div className="select-opt">
                <Select className="scale-filter" value={scale} onChange={selectScale}>
                    <MenuItem value={4}> Scale 4.0 </MenuItem>
                    <MenuItem value={5}> Scale 5.0 </MenuItem>
                </Select>
                {
                    isaAdmin ? <Button className="add-btn-grd" variant="contained" onClick={() => {addEditGrade(0)} }>Add Grade</Button> : null 
                }
            </div>
            
            <Table className="grade-table">
                <TableHead className="thead">
                    <TableCell className="thead">Grade</TableCell>
                    <TableCell className="thead">Points</TableCell>
                    <TableCell className="thead">Numbers</TableCell>
                    {
                        isaAdmin ? <TableCell className="thead"> </TableCell> : null
                    }
                </TableHead>
                <TableBody>
                    { listView.map( grade => (<TableRow>
                            <TableCell className="tbody"> {grade.gradeName}</TableCell>
                            <TableCell className="tbody"> {grade.points} </TableCell>
                            <TableCell className="tbody"> {grade.minNumber} - {grade.maxNumber} </TableCell>
                            {isaAdmin ?
                            <TableCell className="tbody">
                                <IconButton aria-label="edit" onClick={() => {addEditGrade(grade.id)}}> <EditIcon color="primary"></EditIcon>  </IconButton> 
                                <IconButton aria-label="delete" className="delete-icon-button" onClick={() => {deleteGrade(grade.id)}}> <DeleteIcon  ></DeleteIcon>  </IconButton>
                            </TableCell> : null}
                        </TableRow> ))}
                </TableBody>
            </Table>
            <Dialog open = {isDeleteOpen}>
                <DeleteGrade grade={grade} isOpen={setIsDeleteOpen}></DeleteGrade>
            </Dialog>
            <Dialog open={isOpen} >
                <AddEditGrade grade={grade} closeAction={setIsOpen}></AddEditGrade>
            </Dialog>
        </div>
    );
}