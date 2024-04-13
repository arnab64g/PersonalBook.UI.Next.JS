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
import { dateOnly } from "../tokenHandle/dateOnly";

export default function AddEditExpense({data, isOpen}) {
    const [category, setCategory] = useState(data.category);
    const [date, setDate] = useState(data.date);
    const [amount, setAmount] = useState(data.amount);
    const [description, setDescription] = useState(data.description);
    const icons = Icons;
    const categories = Category;
    const saveChange = async () => {
        
        if (!data.id) {
            const expense = {
                userId : "", 
                category : category,
                date : dateOnly(date),
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
                date : dateOnly(date),
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
        <div className="add-exp-form">
            <h2> Add or Edit Expense</h2>
            <FormControl className="cat-select">
                <InputLabel>Select Category</InputLabel>
                <Select label="Select Cat" value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                    { 
                        categories.map(x => (<MenuItem value={x.id} disabled={!x.id}> <FontAwesomeIcon icon={icons[x.id-1]}></FontAwesomeIcon> {x.name} </MenuItem>))
                    }
                </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer  components={[]}>
                    <DatePicker className="exp-date"  onChange={(e) => { setDate(dayjs(e).toISOString())}} defaultValue={dayjs(date)} label="Date"></DatePicker>
                    <TextField className="amount" onChange={(e) => {setAmount(e.target.value)}} value={amount} label="Amount" type="number"></TextField>
                </DemoContainer>
            </LocalizationProvider>
            
            <TextField onChange={(e) => {setDescription(e.target.value)}} value={description} className="desc" multiline rows={2} label="Description"></TextField>
            <Button className="cancel-button" variant="outlined"  onClick={() => {console.log("Clicked"); isOpen(false);}}>Cancel</Button>
            <Button className="save-button" variant="contained" onClick={() => {saveChange()}}> Save </Button>
        </div>
    </>)
}