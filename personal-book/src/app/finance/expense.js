import { Select, MenuItem, FormControl, InputLabel, Button, Dialog } from "@mui/material";
import "./finance.css";
import { useState } from "react";
import { Category, Icons } from "../tokenHandle/objects";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddEditExpense from "./addExpense";

export default function Expense() {
    const [filter, setFilter] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [fromDate, setFormDate] = useState((new Date()).toISOString());
    const [toDate, setToDate] = useState();
    const categories = Category;
    const selectCategory = (e) => {
        setFilter(e);
    }
    const icons = Icons;
    

    return (<>
    <div className="filter">
        <FormControl>
            <InputLabel>Select Categories </InputLabel>
            <Select label="Select Cate" multiple className="cat-select" value={filter} onChange={ (e) => {selectCategory(e.target.value)}}>
                {categories.map((cat) => (<MenuItem value={cat.id}> <FontAwesomeIcon icon={icons[cat.id-1]}></FontAwesomeIcon> {cat.name}</MenuItem>))}
            </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={[]}>
                <FormControl className="opt">
                    <InputLabel>Sort by</InputLabel>
                    <Select label="Sort">
                        <MenuItem> Date [New - Old]</MenuItem>
                        <MenuItem> Date [Old - New]</MenuItem>
                        <MenuItem> Amount [Low - High] </MenuItem>
                        <MenuItem> Amount [High - Low] </MenuItem>
                        <MenuItem> Order by Category </MenuItem>
                    </Select>
                </FormControl>
                <DatePicker label="From Date"></DatePicker>
                <DatePicker label="To Date"></DatePicker>
                <Button onClick={() => { setIsOpen(true);}} variant="contained">Add</Button>
            </DemoContainer>
        </LocalizationProvider>
        <Button variant="contained" onClick={()=> {console.log("hex");}} >Hexa</Button>
    </div>
    <Dialog open={isOpen}>
        <AddEditExpense></AddEditExpense>
    </Dialog>
    </>)
}