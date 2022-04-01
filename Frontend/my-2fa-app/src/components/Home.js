import React, { Component } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const steps = [
    'Iniciar sesión',
    'Verificación por SMS',
    'Disfruta de la APP',
];

class Home extends Component {

    render() {

        return (
            <Box sx={{ width: '100%' }}>
                <br/>
                <Stepper activeStep={2} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Divider />
                <br/>
                <br/>
                <h1>En hora buena</h1>
                <p>Has completado el 2FA</p>
                <br/>
                <Button variant='outlined'> <Link to = "/"> Volver </Link> </Button>
            </Box>
        )
    }
}

export default Home;