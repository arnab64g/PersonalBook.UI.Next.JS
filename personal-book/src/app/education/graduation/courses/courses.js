import { getUserId } from "@/app/tokenHandle/tokenHandle";
import { Button, Dialog, IconButton, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddEditCourse from "./addEditCourse";
import DeleteCourse from "./delete";
import { sortByCourseCodeAsc, sortByCourseCodeDesc, sortByCourseTitleAsc, sortByCourseTitleDesc } from "@/app/tokenHandle/sortCourse";
import { getCourses } from "@/services/courseService";

export default function Courses() {
    const [courseList, setCourseList] = useState([]);
    const [sortOption, setSortOption] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [isDeletOpen, setIsDeleteOpen] = useState(false);
    const [course, setCourse] = useState({});

    useEffect(() => {fetchCourses()}, [isOpen, isDeletOpen]);

    const sortBy = (sortOption, result) => {
        let sorted = [];
        setSortOption(sortOption);
        switch(sortOption){
            case 1:
                sorted = sortByCourseCodeAsc(result);
                break;
            case 2:
                sorted = sortByCourseCodeDesc(result);
                break;
            case 3:
                sorted = sortByCourseTitleAsc(result);
                break;
            case 4:
                sorted = sortByCourseTitleDesc(result);
                break;
        }
        setCourseList(sorted);
    }

    const addEditCourse = async (id) =>{
        if (id == 0) {
            setCourse({
                id : 0,
                userId : getUserId(),
                courseCode : "",
                courseTitle : "",
                creditPoint : 0,
            });
        }
        else{
            setCourse(courseList.filter(x => x.id == id)[0]);
        }

        setIsOpen(true);
    }

    const fetchCourses = async () =>{
        const result = await getCourses();

        sortBy(sortOption, result);
    }

    const deleteCourse = async (id) =>{
        setCourse(courseList.filter(x => x.id == id)[0]);
        setIsDeleteOpen(true);
    }

    return(
        <>
        <h1 className="head">List of Courses</h1>
        <div className="options">
            <Select size="small" className="select options" value={sortOption} onChange={(e) => {sortBy(e.target.value, courseList)}}>
                <MenuItem value={1}> Course Code [A-Z] </MenuItem>
                <MenuItem value={2}> Course Code [Z-A] </MenuItem>
                <MenuItem value={3}> Course Title [A-Z] </MenuItem>
                <MenuItem value={4}> Course Title [Z-A] </MenuItem>
            </Select>
            <label className="gap"></label>
            <Button onClick={()=>{addEditCourse(0)}} variant="contained" className="options"> Add Course</Button>
        
        <Table className="course-table">
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
                        <IconButton onClick={() => {addEditCourse(x.id)}}> <EditIcon color="primary"></EditIcon> </IconButton>
                        <IconButton onClick={() => {deleteCourse(x.id)}} className="delete"> <DeleteIcon></DeleteIcon> </IconButton>
                    </TableCell>
                    </TableRow>))}
            </TableBody>
        </Table>
        <Dialog open={isOpen}>
            <AddEditCourse course={course} isOpen={setIsOpen}></AddEditCourse>
        </Dialog>
        <Dialog open={isDeletOpen}>
            <DeleteCourse course={course} isOpen={setIsDeleteOpen}></DeleteCourse>
        </Dialog>
        </div>
        </>
    );
}