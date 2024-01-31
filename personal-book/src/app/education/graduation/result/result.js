import { getToken, getUserId } from "@/app/tokenHandle/tokenHandle";
import { useEffect, useState } from "react";
import { MenuItem, Button, Select, FormControl, InputLabel } from "@mui/material";
import "./result.css";

export default function Result() {
    const [results, setResults] = useState([]);

    useEffect(() => {fetchComponent()}, []);

    const fetchComponent = async() => {
        const userId  = getUserId();
        const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,
                    'authorization' : `bearer ${getToken()}` }
        };
        const res = await fetch(`http://localhost:7108/api/Result?id=${userId}`, requestOptions);
        const rawData = await res.json();
        rawData.summary.forEach(element => {
            const sem = rawData.results.filter(x => x.semesterId == element.semId)[0];
            const result = rawData.results.filter(x => x.semesterId == element.semId);
            const semData = {semseter: sem, result: result};
            results.push(semData);
        });

        setResults(results);
    }
    
    
    
    return (<>
        <h1>Result</h1>
        <FormControl className="select-semester">
            <InputLabel>Semester</InputLabel>
        <Select  label="Select">
            <MenuItem>Semester 1</MenuItem>
        </Select>
        </FormControl>
        
        <Button variant="contained">Add Result</Button>
        </>);
} 