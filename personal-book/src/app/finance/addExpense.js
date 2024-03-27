import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Category, Icons } from "../tokenHandle/objects";
import { InputLabel, FormControl, Select, MenuItem, Button, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo/DemoContainer";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import dayjs from "dayjs";
import { addExpenseAsync, updateExpenseAsync } from "@/services/expenseService";

export default function AddEditExpense({data, isOpen}) {
    const [category, setCategory] = useState(data.category);
    const [date, setDate] = useState(data.date);
    const [amount, setAmount] = useState(data.amount);
    const [description, setDescription] = useState(data.description);
    const icons = Icons;
    const categories = Category;
    const saveChange = async () => {
        let dateOnly = new Date(date);
        dateOnly.setHours(0);
        dateOnly.setMinutes(0);
        dateOnly.setSeconds(0);
        
        if (!data.id) {
            const expense = {
                userId : "", 
                category : category,
                date : dateOnly,
                amount : amount,
                description : description
            }
            const result = await addExpenseAsync(expense);
            if (result) {
                alert("Saved Successfully");
                isOpen(false);
            }
            else{
                alert("Unable to Save");
            }
        }
        else{
            const expense = {
                id : data.id,
                userId : data.userId,
                category : category,
                date : dateOnly,
                amount : amount,
                description : description
            }
            const result = await updateExpenseAsync(expense);

            if (result) {
                alert("Updated Successfully");
                isOpen(false);
            }
            else{
                alert("Update Failed.");
            }
        }
    } 

    return (<>
        <h1 className="field">Add or Edit Expense</h1>
        <div className="field">
            <FormControl className="single">
                <InputLabel>Select Category</InputLabel>
                <Select label="Select Cat" value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                    { 
                        categories.map(x => (<MenuItem value={x.id} disabled={!x.id}> <FontAwesomeIcon icon={icons[x.id-1]}></FontAwesomeIcon> {x.name} </MenuItem>))
                    }
                </Select>
            </FormControl>
        </div>
        <div className="field">
            <LocalizationProvider  dateAdapter={AdapterDayjs}>
                <DemoContainer className="field"  components={[]}>
                    <DatePicker  onChange={(e) => { setDate(dayjs(e).toISOString())}} defaultValue={dayjs(date)} className="double" label="Date"></DatePicker>
                    <TextField onChange={(e) => {setAmount(e.target.value)}} value={amount} className="double" label="Amount" type="number"></TextField>
                </DemoContainer>
            </LocalizationProvider>
        </div>
        <div className="field">
            <TextField onChange={(e) => {setDescription(e.target.value)}} value={description} className="single" multiline rows={2} label="Description"></TextField>
        </div>
        <div className="field">
            <Button className="double" variant="outlined"  onClick={() => {console.log("Clicked"); isOpen(false);}}>Cancel</Button>
            <label className="gap"></label>
            <Button className="double" variant="contained" onClick={() => {saveChange()}}> Save </Button>
        </div>
    </>)
}