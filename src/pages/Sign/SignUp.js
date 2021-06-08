import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { signup } from 'auth';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, makeStyles, Container } from '@material-ui/core';

import { MdLock } from 'react-icons/md';
import Alert from '@material-ui/lab/Alert';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" to="/">
        Simulados OAB
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const history = useHistory();
    const [values, setValues] = useState({
        firstName: '',
        surname: '',
        cell: '',
        email: '',
        password: '',
        message: '',
        error: ''
    });
    const [acceptTheTermsOfUse, setAcceptTheTermsOfUse] = useState(false);

    const { email, firstName, surname, cell, password, temporaryPassword, confirmPassword, error, message } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickAcceptTheTermsOfUse = () => {
        if (acceptTheTermsOfUse === false) {
            setAcceptTheTermsOfUse(true);
            setValues({ ...values, error: false });
        } else {
            setAcceptTheTermsOfUse(false);
        }
    };

    const clickSubmit = event => {
        event.preventDefault();
        if (acceptTheTermsOfUse === false) {
            setValues({ ...values, error: true, message: 'leia e aceite os termos de uso' });

        } else {
            signup({ firstName, surname, cell, email, password, temporaryPassword, confirmPassword })
                .then(data => {
                    if (data.error) {
                        setValues({ ...values, message: data.message, error: data.error });
                    } else {
                        setValues({
                            ...values,
                            firstName: '',
                            surname: '',
                            cell: '',
                            email: '',
                            password: '',
                            error: '',
                            message: ''
                        });
                        history.push('/signin', { message: 'Visite Seu E-mail para confirmar seu cadastro', success: true });
                    }
                });
            setValues({ ...values, error: false });
        }
    };

    const showError = () => (
        <Alert severity="warning" style={{ display: error ? '' : 'none' }}>
            {message}
        </Alert>
    );

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <MdLock />
                </Avatar>
                <Typography component="h1" variant="h5">
          Inscreva-se
                </Typography>
                {showError()}
                {JSON.stringify(values)}
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Nome"
                                onChange={handleChange('firstName')}
                                value={firstName}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Sobrenome"
                                name="lastName"
                                autoComplete="name"
                                onChange={handleChange('surname')}
                                value={surname}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange('email')}
                                value={email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="cell"
                                label="Cell"
                                name="cell"
                                autoComplete="cell"
                                onChange={handleChange('cell')}
                                value={cell}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange('password')}
                                value={password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="acceptTheTermsOfUse" color="primary" onClick={clickAcceptTheTermsOfUse} />}
                                label="Eu concordo com os termos de uso"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={clickSubmit}
                    >
            Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/Signin" variant="body2">
                Já tem uma conta? Faça Login
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
