import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { st } from '../../layouts/style';
import { loginUser } from '../../api/auth'
import { validateEmail } from '../../utils/validators';
import ErrorAlert from '../ErrorAlert';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (validateEmail(email) === null) {
            setAlertMessage('Please insert a valid email.')
            setIsAlertOpen(true);
        }

        // TODO: Implement AuthContext and useAuth to login.
        loginUser(email, password).then(data => {
            const { Token, Email } = data;
            if (!Token) {
                setAlertMessage('Invalid email or password')
                setIsAlertOpen(true);
                return
            } 
            localStorage.setItem('test-token', Token)
            localStorage.setItem('email', Email)
            navigate("/buildings");
        }).catch((error) => {
            setAlertMessage(error?.message || 'An error has occurred. Try again later.')
            setIsAlertOpen(true);
        })
    }

    const handleCloseAlert = () => {
        setIsAlertOpen(false);
        setAlertMessage('')
    }

    return (
        <div style={{ width: '100vw', height: '100vh', backgroundColor: st.bgColor }}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{ backgroundColor: st.appBarColor }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            My Buildings
                        </Typography>
                        <Button color="inherit" onClick={() => navigate("/register")}>Register</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Grid container spacing={0} style={{ width: '100%', height: 'calc(100% - 65px)' }} >
                <Grid item style={{ width: '100%', height: '10%', marginTop: '30%' }} >
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={st.center}>
                        Login
                    </Typography>
                </Grid>
                <Grid item style={{ width: '100%', height: '50%', marginBottom: '40%' }} >
                    <Grid item style={st.center}>
                        <TextField
                            id="standard-basic"
                            label="Email"
                            variant="standard"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Grid>
                    <Grid item style={st.center}>
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </Grid>
                    <Grid item style={st.center}>
                        <Button variant="contained" onClick={handleLogin}>Login</Button>
                    </Grid>
                </Grid>
            </Grid>
            <ErrorAlert open={isAlertOpen} onClose={handleCloseAlert} error={alertMessage}/>
        </div>
    );
}