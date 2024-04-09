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
    <div className="delete-container">
        <h3>Are you sure you want to delete this Grade? </h3>
        <p> Grade : {grade.gradeName}</p>
        <p> Point: {grade.points} </p>
        <p> Scale : {grade.scale} </p>
        <Button className="cancel-button" variant="outlined" onClick={()=> {closeDialog()}}> Cancel </Button>
        <Button className="delete-button"  variant="contained" onClick={() => {confirmDelete()}}>Delete</Button>
    </div>
        
    </>)
}