import React, { Component } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

class Example extends Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm">
                    <div>
                        <br />
                        <br />
                        <Button variant='outlined'> <Link to="/iniciar" > Inicio </Link> </Button>
                        <br />
                        <br />
                        <Divider />
                        <br />
                        <br />
                        <center>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://cdn.mos.cms.futurecdn.net/sQCDubVjAXbWkhEZeDwVpU-1024-80.jpg.webp"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        2FA
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        La identificación en dos pasos sirve para evitar que
                                        otras personas puedan acceder a tu cuenta, incluso en
                                        el caso de que hayan conseguido averiguar la contraseña
                                        que utilizas de alguna manera. De esta forma, incluso si
                                        te roban las credenciales siempre quedará ese segundo paso
                                        en el que tú tienes que verificar el inicio de sesión.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Stack direction="row" spacing={1}>
                                        <Chip label="Node Js" variant="outlined"/>
                                        <Chip label="MongoDB" variant="outlined"/>
                                        <Chip label="React" variant="outlined"/>
                                        <Chip label="Twilio" variant="outlined" />
                                    </Stack>
                                </CardActions>
                            </Card>
                        </center>
                    </div>
                </Container>
            </React.Fragment>

        )
    }
}

export default Example;