"use client";

import { Button } from "@mui/material";
import "./grade.css"
import { deleteGrade } from "@/services/gradeService";

export default function DeleteGrade({grade, isOpen}) {
    const confirmDelete = async() => {
        const result = deleteGrade(grade.id);

        if (result) {
            alert("Deleted successed");
        }
        else{
            alert("Unable to delete.")
        }

        isOpen(false);
    }

    const closeDialog = async() =>{
        isOpen(false);
    }

    return (<>
    <h1 className="head">Are you sure you want to delete this Grade? </h1>
    <table className="delete-table">
        <tr>
            <td>Grade Name</td>
            <td> {grade.gradeName} </td>
        </tr>
        <tr>
            <td>Points</td>
            <td>{grade.points}</td>
        </tr>
        <tr>
            <td>Scale</td>
            <td> {grade.scale} </td>
        </tr>
    </table>
    <div className="field">
        <Button className="double" variant="outlined" onClick={()=> {closeDialog()}}> Cancel </Button>
        <label className="gap"></label>
        <Button className="double delete-button"  variant="contained" onClick={() => {confirmDelete()}}>Delete</Button>
    </div>
    </>)
}