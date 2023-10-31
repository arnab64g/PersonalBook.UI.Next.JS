import { Box, Button } from "@mui/material";

export default function DeleteSemester({semester, isOpenDialog}) {
    return(<>
        <Box>
            <h1> Are you sure you want ro delete this semester </h1>
            <div>
                <Button onClick={() => {isOpenDialog(false)}}> Cancel </Button>
            </div>
        </Box>
    </>);
}