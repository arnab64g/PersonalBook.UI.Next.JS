import { getToken, getUserId } from "@/app/tokenHandle/tokenHandle";
import { Button, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

export default function SecondaryResult(){
    const [choice, setChoice] = useState(1);

    useEffect(() => {fetchSecondaryResult()}, []);

    const fetchSecondaryResult = async () =>{
        const userId = getUserId();
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,
                        'authorization' : `bearer ${getToken()}` }
        };
        const res = await fetch(`http://localhost:7108/api/SecondaryResult?id=${userId}`, requestOptions);
        const result = await res.json();
        console.log(result);
    }

    const choiceChange = async (opt) =>{
        setChoice(opt);
    }

    return(<>
    <div>
        <Select value={choice} size="small" onChange={(e) => {choiceChange(e.target.value)} }>
            <MenuItem value={1}>SSC</MenuItem>
            <MenuItem value={2}>HSC</MenuItem>
        </Select>
        <Button></Button>
    </div>
    </>);
}