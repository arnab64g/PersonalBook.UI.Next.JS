import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Category, Icons } from "../tokenHandle/objects";
import {Button} from '@mui/material'
import { deleteExpenseAsync } from "@/services/expenseService";
import "./finance.css";

export default function DeleteExpense({data, isOpen}){
    const categories = Category;
    const icons = Icons;

    const deleteExpense = async () =>{
        const result = await deleteExpenseAsync(data.id);
        if (result) {
            alert("Deleted Successfully.");
            isOpen(false);
        }
        else{
            alert("Unable to delete.");
        }
    }

    return (<>
    <div className="del-exp">
        <h3>Are you sure you want to delete this record?</h3>
        <p><FontAwesomeIcon icon={icons[data.category - 1]}> </FontAwesomeIcon> {categories[data.category].name} </p>
        <p>  Amount : {data.amount} </p>
        <p> Date : {new Date(data.date).toDateString()} </p>
        <Button variant="outlined" onClick={() => {isOpen(false)}} className="cancel-button">Cancel</Button>
        <Button onClick={() => {deleteExpense()}} variant="contained" className="delete-button">Delete</Button>
    </div>
    </>);
}