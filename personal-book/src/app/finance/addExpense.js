import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Category, Icons } from "../tokenHandle/objects";
import { InputLabel, FormControl, Select, MenuItem, Button, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo/DemoContainer";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function AddEditExpense({data, isOpen}) {
    const icons = Icons;
    const categories = Category;
    
    return (<>
        <h1 className="field">Add or Edit Expense</h1>
        <div className="field">
            <FormControl className="single">
                <InputLabel>Select Category</InputLabel>
                <Select label="Select Cat">
                    { 
                        categories.map(x => (<MenuItem value={x.id}> <FontAwesomeIcon icon={icons[x.id-1]}></FontAwesomeIcon> {x.name} </MenuItem>))
                    }
                </Select>
            </FormControl>
        </div>
        <div className="field">
            <LocalizationProvider  dateAdapter={AdapterDayjs}>
                <DemoContainer className="field"  components={[]}>
                    <DatePicker className="double" label="Date"></DatePicker>
                    <TextField className="double" label="Amount" type="number"></TextField>
                </DemoContainer>
            </LocalizationProvider>
        </div>
        <div className="field">
            <TextField className="single" multiline rows={2} label="Description"></TextField>
        </div>
        
        <div className="field">
            <Button className="double" variant="outlined"  onClick={() => {console.log("Clicked"); isOpen(false);}}>Cancel</Button>
            <label className="gap"></label>
            <Button className="double" variant="contained"> Save </Button>
        </div>
    </>)
}