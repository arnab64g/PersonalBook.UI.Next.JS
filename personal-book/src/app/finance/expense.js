import { Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import "./finance.css";
import { useState } from "react";
import { Category } from "../tokenHandle/objects";
import {faHome, faBus, faBurger, faTools, faReceipt, faHospital, faShirt, faShoppingCart, 
    faPerson, faSchool, faVideo, faMoneyBill} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Expense() {
    const [filter, setFilter] = useState([]);
    const [fromDate, setFormDate] = useState((new Date()).toISOString());
    const [toDate, setToDate] = useState();
    const categories = Category;
    const selectCategory = (e) => {
        setFilter(e);
    }
    const icons = [faHome, faBus, faBurger, faTools, faReceipt, faHospital, faShirt, 
        faShoppingCart, faPerson, faSchool, faVideo, faMoneyBill];
    

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
                <Button variant="contained">Add Expense</Button>
            </DemoContainer>
        </LocalizationProvider>
    </div>
    <div>
        
        
        
    </div>
    </>)
}