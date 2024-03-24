import { Category, Icons } from "../tokenHandle/objects";
import { InputLabel, FormControl, Select, MenuItem } from "@mui/material";

export default function AddEditExpense({data, isOpen}) {
    const icons = Icons;
    const categories = Category;
    return (<>
        <FormControl>
            <InputLabel>Select Category</InputLabel>
            <Select>
                { 
                    categories.map(x => (<MenuItem value={x.id}> {x.name} </MenuItem>))
                }
            </Select>
        </FormControl>
    </>)
}