import { Select, MenuItem, FormControl, InputLabel, IconButton, Button, Dialog, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import "./finance.css";
import { useEffect, useState } from "react";
import { Category, Icons } from "../tokenHandle/objects";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddEditExpense from "./addExpense";
import { getExpensesAsync } from "@/services/expenseService";
import DeleteExpense from "./deleteExpense";
import {orderByCategory, sortByAmountHigh_Low, sortByAmountLow_High, sortByDateNew_Old, sortByDateOld_New} from "../tokenHandle/sortExpense";

export default function Expense() {
    const [filter, setFilter] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [fromDate, setFormDate] = useState((new Date()).toISOString());
    const [toDate, setToDate] = useState();
    const [expenseList, setExpenseList] = useState([]);
    const [expense, setExpense] = useState({});
    const [sortOpt, setSortOpt] = useState(1);

    const categories = Category;
    const selectCategory = (e) => {
        setFilter(e);
    }
    const icons = Icons;
    useEffect(() => {fetchExpenses()}, [isOpen, isDeleteOpen]);

    const sortExpense = (list, opt) =>{
        let sortedList = [];
        switch (opt) {
            case 1:
                sortedList = sortByDateNew_Old(list);
                break;
            case 2: 
                sortedList = sortByDateOld_New(list);
                break;
            case 3:
                sortedList = sortByAmountLow_High(list);
                break;
            case 4:
                sortedList = sortByAmountHigh_Low(list);
                break;
            case 5:
                sortedList = orderByCategory(list);
                break;
        }
        setExpenseList(list);
    }

    const fetchExpenses = async () => {
        const expList = await getExpensesAsync();
        sortExpense(expList, sortOpt);

    }

    const deleteExpense = (id) => {
        const exp = expenseList.filter(x => x.id == id)[0];
        setExpense(exp);
        setIsDeleteOpen(true)
    }

    const updateExpense = (id) => {
        const exp = expenseList.filter(x => x.id == id)[0];
        setExpense(exp);
        setIsOpen(true)
    }

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
                    <Select label="Sort" value={sortOpt} onChange={(e)=>{setSortOpt(e.target.value); sortExpense(expenseList, e.target.value)}}>
                        <MenuItem value={1}> Date [New - Old]</MenuItem>
                        <MenuItem value={2}> Date [Old - New]</MenuItem>
                        <MenuItem value={3}> Amount [Low - High] </MenuItem>
                        <MenuItem value={4}> Amount [High - Low] </MenuItem>
                        <MenuItem value={5}> Order by Category </MenuItem>
                    </Select>
                </FormControl>
                <DatePicker label="From Date" ></DatePicker>
                <DatePicker label="To Date"></DatePicker>
                <Button onClick={() => { setExpense({id : 0, userId : "", category : 0, data : new Date(), amount : 0, description : ""}) ; setIsOpen(true);}} variant="contained">Add</Button>
            </DemoContainer>
        </LocalizationProvider>
    </div>
    <Table className="table">
        <TableHead className="thead">
            <TableCell ></TableCell>
            <TableCell > Category </TableCell>
            <TableCell > Date </TableCell>
            <TableCell > Amount </TableCell>
            <TableCell > Description </TableCell>
            <TableCell ></TableCell>
        </TableHead>
        <TableBody>
            {
                expenseList.map( x => (<TableRow className="tbody">
                    <TableCell> <FontAwesomeIcon icon={icons[x.category - 1]}></FontAwesomeIcon> </TableCell>
                    <TableCell> {categories[x.category].name} </TableCell>
                    <TableCell> {(new Date( x.date)).toDateString()} </TableCell>
                    <TableCell> {x.amount} </TableCell>
                    <TableCell> {x.description} </TableCell>
                    <TableCell> 
                        <IconButton onClick={() => {updateExpense(x.id)}} color="primary"> <EditIcon></EditIcon> </IconButton>
                        <IconButton onClick={() => {deleteExpense(x.id)}} className="delete"> <DeleteIcon></DeleteIcon> </IconButton>
                    </TableCell>
                </TableRow>))
            }
        </TableBody>
    </Table>
    <Dialog open={isOpen} >
        <AddEditExpense data={expense} isOpen={setIsOpen}></AddEditExpense>
    </Dialog>
    <Dialog open={isDeleteOpen}>
        <DeleteExpense data={expense} isOpen={setIsDeleteOpen}> </DeleteExpense>
    </Dialog>
    </>)
}