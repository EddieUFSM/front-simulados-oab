import React, { useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField, Box, Typography, makeStyles, Container, CircularProgress } from '@material-ui/core';
import { MdLock } from 'react-icons/md';
import { signin, authenticate } from 'auth';
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function CellValidation() {
    const history = useHistory();
    const classes = useStyles();

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: false,
        loading: false,
        redirectToReferrer: false,
        message: '',
        success: false
    });

    const { email, password, loading, error, redirectToReferrer, success, message } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, message: data.message, loading: false });
                } else {
                    authenticate(data,
                        () => {
                            setValues({
                                ...values,
                                redirectToReferrer: true
                            });
                        });
                    history.push('/home', { success: data.success, message: data.message });
                }
            });
    };

    const showError = () => (
        <Alert severity="warning" style={{ display: error ? '' : 'none' }}>
            {message}
        </Alert>
    );
    const showSuccess = () => (
        <Alert severity="success" style={{ display: success ? '' : 'none' }}>
            {message}
        </Alert>
    );
    const showLoading = () => (
        loading && (
            <CircularProgress />
        )
    );
    const redirectUser = () => {
        if (redirectToReferrer) {
            return <Redirect to="/home" />;
        }
    };

    return (

        <Container component="main" maxWidth="xs">
            {redirectUser()}
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <MdLock />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Confirmação do Celular
                </Typography>
                {showLoading}
                {showError()}
                {showSuccess()}
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="code"
                        label="Código"
                        type="code"
                        id="code"
                        value={password}
                        onChange={handleChange('code')}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={clickSubmit}
                    >
                        Confirmar
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
