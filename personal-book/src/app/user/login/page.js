import { TextField } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css';

const Login = () =>{
    return (
        <div>
            <form>
                <div className='row'>
                    <TextField label="Username">  </TextField>
                </div>
                <div className='row'>
                    <TextField label="Password">  </TextField>
                </div>
            </form>
        </div>
    );
}

module.exports = Login