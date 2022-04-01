import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import axios from 'axios';

const steps = [
    'Iniciar sesión',
    'Verificación por SMS',
    'Disfruta de la APP',
];


class Login extends Component {
    state = {
        users: [],
        rd: false,
        err: false,
        path: ''
    }

    token = React.createRef();
    name = React.createRef();
    password = React.createRef();


    checkIn = (e) => {
        e.preventDefault();
        console.log(this.name.current.value)
        axios.get("http://localhost:3900/users/" + this.name.current.value)
            .then(res => {
                const user = res.data;
                if (user != null) {
                    console.log(user)
                    if (user[0].password == this.password.current.value) {
                        axios.put("http://localhost:3900/users/" + this.name.current.value)
                            .then(res => {
                                localStorage.setItem('user', this.name.current.value);
                                this.setState({ rd: true, path: '/2fa' })
                            })
                    } else {
                        this.setState({ err: true })
                    }
                } else {
                    this.setState({ err: true })
                    
                }

            })

    }

    auth = (e) => {
        e.preventDefault();
        console.log('we did it');
        console.log(this.state.nombre)
    }

    render() {

        if (this.state.rd) {
            return (<Redirect to={this.state.path} />);
        }

        return (
            <Box sx={{ width: '100%' }}>
                <br />
                <Stepper activeStep={0} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Divider />
                <br/>
                <br/>
                <CssBaseline />
                <Container maxWidth="sm">
                    {this.state.err &&
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                Usuario o contraseña incorrecta — <strong>revisalo nuevamente</strong>!
                            </Alert>
                        </Stack>
                    }
                    <br />
                    <Box
                        component="form"
                        id="lgf"
                        onSubmit={this.checkIn}>
                        <TextField
                            id="outlined-name"
                            label="Nombre"
                            name='nombre'
                            inputRef={this.name}
                        />
                        <br />
                        <br />
                        <TextField
                            id="outlined-uncontrolled"
                            label="Contraseña"
                            type='password'
                            name='password'
                            inputRef={this.password}
                        />
                        <br />
                        <br />
                        <Button type="submit" variant='outlined'>Entrar</Button>
                    </Box>
                </Container>
            </Box>
        )
    };

}

export default Login
