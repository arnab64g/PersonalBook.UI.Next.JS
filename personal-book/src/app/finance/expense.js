"use client";

import { Select, MenuItem, FormControl, InputLabel, IconButton, Button, Dialog, Table, TableHead, 
    TableBody, TableRow, TableCell } from "@mui/material";
import "./finance.css";
import { useEffect, useState } from "react";
import { Category, Icons } from "../tokenHandle/objects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddEditExpense from "./addExpense";
import { getExpensesAsync } from "@/services/expenseService";
import DeleteExpense from "./deleteExpense";
import {orderByCategory, sortByAmountHigh_Low, sortByAmountLow_High, sortByDateNew_Old, sortByDateOld_New} 
            from "../tokenHandle/sortExpense";
import dayjs from "dayjs";
import { dateOnly } from "../tokenHandle/dateOnly";

export default function Expense() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [fromDate, setFormDate] = useState();
    const [toDate, setToDate] = useState();
    const [filterCategories, setFilterCategories] = useState([]);
    const [expenseList, setExpenseList] = useState([]);
    const [expenseListView, setExpenseListView] = useState([]);
    const [expense, setExpense] = useState({});
    const [sortOpt, setSortOpt] = useState(1);     
    const categories = Category;
    const icons = Icons;

    useEffect(() => {fetchExpenses()}, [isOpen, isDeleteOpen]);

    const filterExpenses = (expenses, fromDate, toDate, categories) =>  {
        let filtered = expenses;
        const cset = new Set(categories);
        
        if (cset.size != 0) {
          filtered = filtered.filter(e => cset.has(Number(e.category)));
        }
       
        if (fromDate) {
            fromDate = dateOnly(fromDate);
            fromDate = new Date(fromDate);
            filtered = filtered.filter(e => (new Date(e.date)).getTime() >= fromDate.getTime());
        }
        
        if (toDate) {
            toDate = dateOnly(toDate);
            toDate = new Date(toDate);
            filtered = filtered.filter(e => (new Date(e.date)).getTime() <= toDate.getTime());
        }

        return filtered;
      }

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
        setExpenseList(sortedList);
        const filtered = filterExpenses(sortedList, fromDate, toDate, filterCategories);
        setExpenseListView(filtered);
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
        <FormControl className="category-filter">
            <InputLabel>Select Categories </InputLabel>
            <Select label="Select Cate" multiple className="cat-select" value={filterCategories} onChange={ (e) => {setFilterCategories(e.target.value); 
                setExpenseListView(filterExpenses(expenseList, fromDate, toDate, e.target.value))}}>
                {categories.map((cat, index) => (<MenuItem value={cat.id} key={index}> <FontAwesomeIcon icon={icons[cat.id-1]}></FontAwesomeIcon> {cat.name}</MenuItem>))}
            </Select>
        </FormControl>
        <LocalizationProvider  dateAdapter={AdapterDayjs}>
            <DemoContainer components={[]}>
                <FormControl className="sort">
                    <InputLabel>Sort by</InputLabel>
                    <Select label="Sort" value={sortOpt} onChange={(e)=>{setSortOpt(e.target.value); sortExpense(expenseList, e.target.value)}}>
                        <MenuItem value={1}> Date [New - Old]</MenuItem>
                        <MenuItem value={2}> Date [Old - New]</MenuItem>
                        <MenuItem value={3}> Amount [Low - High] </MenuItem>
                        <MenuItem value={4}> Amount [High - Low] </MenuItem>
                        <MenuItem value={5}> Order by Category </MenuItem>
                    </Select>
                </FormControl>
                <DatePicker className="date" label="From Date" onChange={(e) => {setFormDate(dayjs(e).toISOString()); setExpenseListView(filterExpenses(expenseList, dayjs(e).toISOString(), toDate, filterCategories))}}></DatePicker>
                <DatePicker className="date" label="To Date" onChange={(e) => {setToDate(dayjs(e).toISOString()); setExpenseListView(filterExpenses(expenseList, fromDate, dayjs(e).toISOString(), filterCategories))}}></DatePicker>
                <Button className="add-btn" onClick={() => { setExpense({id : 0, userId : "", category : 0, data : (new Date()).toISOString(), amount : 0, description : ""}) ; setIsOpen(true);}} variant="contained">Add</Button>
            </DemoContainer>
        </LocalizationProvider>
    </div>
    <Table className="table-expense">
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
                expenseListView.map( (x) => (<TableRow  className="tbody">
                    <TableCell> <FontAwesomeIcon icon={icons[x.category - 1]}></FontAwesomeIcon> </TableCell>
                    <TableCell> {categories[x.category].name} </TableCell>
                    <TableCell> {(new Date( x.date)).toDateString()} </TableCell>
                    <TableCell> {x.amount} </TableCell>
                    <TableCell> {x.description} </TableCell>
                    <TableCell> 
                        <IconButton onClick={() => {updateExpense(x.id)}} color="primary"> <EditIcon></EditIcon> </IconButton>
                        <IconButton onClick={() => {deleteExpense(x.id)}} className="delete-icon-button"> <DeleteIcon></DeleteIcon> </IconButton>
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