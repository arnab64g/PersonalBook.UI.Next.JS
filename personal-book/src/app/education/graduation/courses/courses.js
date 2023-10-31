import { getToken, getUserId } from "@/app/tokenHandle/tokenHandle";
import { Button, Dialog, IconButton, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "./style.css";
import AddEditCourse from "./addEditCourse";

export function Courses() {
    const [courseList, setCourseList] = useState([]);
    const [sortOption, setSortOption] = useState(1);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {fetchCourses()}, []);
    
    const fetchCourses = async () =>{
        const userId = getUserId();
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,
                        'authorization' : `bearer ${getToken()}` }
        };
        const res = await fetch(`http://localhost:7108/api/Course?id=${userId}`, requestOptions);
        const result = await res.json();
        console.log(result);
        setCourseList(result);
    }

    return(
        <>
        <h1>List of Courses</h1>
        <div className="option">
            <Select size="small" className="select option" value={sortOption}>
                <MenuItem value={1}> Course Code [A-Z] </MenuItem>
                <MenuItem value={2}> Course Code [Z-A] </MenuItem>
                <MenuItem value={3}> Course Title [A-Z] </MenuItem>
                <MenuItem value={4}> Course Title [Z-A] </MenuItem>
            </Select>
            <span className="gap"></span>
            <Button onClick={()=>{setIsOpen(true)}} variant="contained"> Add Course</Button>
        </div>
        <Table>
            <TableHead>
                <TableCell className="thead">Course Code</TableCell>
                <TableCell className="thead">Course Title</TableCell>
                <TableCell className="thead">Credit Hour</TableCell>
                <TableCell className="thead"> </TableCell>
            </TableHead>
            <TableBody>
                {courseList.map( x => (<TableRow>
                    <TableCell className="tbody"> {x.courseCode} </TableCell>
                    <TableCell className="tbody"> {x.courseTitle} </TableCell> 
                    <TableCell className="tbody"> {x.creditPoint} </TableCell>
                    <TableCell className="tbody">
                        <IconButton> <EditIcon color="primary"></EditIcon> </IconButton>
                        <IconButton className="delete"> <DeleteIcon></DeleteIcon> </IconButton>
                    </TableCell>
                    </TableRow>))}
            </TableBody>
        </Table>
        <Dialog open={isOpen}>
            <AddEditCourse></AddEditCourse>
        </Dialog>
        </>
    );
}