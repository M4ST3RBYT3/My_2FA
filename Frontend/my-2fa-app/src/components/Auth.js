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


class Auth extends Component {


    state = {
        next: false,
        err: false
    }

    token = React.createRef();

    ath = (e) => {
        e.preventDefault();

        const user = {
            name: localStorage.getItem('user'),
            token: this.token.current.value
        }
        axios.post(`http://localhost:3900/users`, { user })
            .then(res => {
                if (res.data.auth) {
                    this.setState({ next: true })
                } else {
                    this.setState({ err: true })
                }
            })

    }


    render() {
        let usuario = localStorage.getItem('user')
        if (this.state.next) {
            return (<Redirect to={'/Home'} />);
        }
        return (
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={1} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Divider />
                <CssBaseline />
                <Container maxWidth="sm">
                    {this.state.err &&
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <br/>
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                Token incorrecto — <strong>ingresalo nuevamente</strong>!
                            </Alert>
                        </Stack>
                    }
                    <h4>Hola {usuario}</h4>
                    <p>Te enviamos un codigo por SMS</p>
                    <Box
                        component="form"
                        id="lgf"
                        onSubmit={this.ath}>
                        <TextField
                            id="outlined-uncontrolled"
                            label="Token"
                            type='text'
                            name='token'
                            inputRef={this.token}
                        />
                        <br />
                        <br />
                        <Button type="submit" variant='outlined'>Enviar</Button>

                    </Box>

                </Container>
            </Box>
        )

    };

}

export default Auth