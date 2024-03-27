import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Category, Icons } from "../tokenHandle/objects";
import {Button} from '@mui/material'
import { deleteExpenseAsync } from "@/services/expenseService";

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
    <div className="field">
        <h3 className="single">Are you sure you want to delete this record?</h3>
        
    </div>
    <div className="field">
        <FontAwesomeIcon icon={icons[data.category - 1]}></FontAwesomeIcon>
        <label className="single"> {categories[data.category].name}</label>
    </div>
    <div className="field">
        <label> Amount : {data.amount}</label>
    </div>
    <div className="field">
        <label> Date : {new Date(data.date).toDateString() } </label>
    </div>
    <div className="field">
        <Button variant="outlined" onClick={() => {isOpen(false)}} className="double">Cancel</Button>
        <label className="gap"></label>
        <Button onClick={() => {deleteExpense()}} variant="contained" className="double delete-button">Delete</Button>
    </div>
    </>);
}