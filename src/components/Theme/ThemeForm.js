import React, { useState } from 'react';
import { Box, Container, Grid, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { isAuthenticated } from '../../auth';
import { createTheme } from '../../admin/apiAdmin';


import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));



export default function NewForm() {
    const classes = useStyles;
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        theme: '',
        message: '',
        loading: false
    });
    const {
        theme,
        message,
        loading,
    } = values;


    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);


    const handleChange = name => (event) => {
        const value = event.target.value;
        setValues({ ...values, [name]: value });
    };


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    const clickSumit = event => {
    //
        event.preventDefault();
        setValues({ ...values, message: '', loading: true });
        createTheme(user._id, token, values).then(data => {
            if (data.error) {
                setError(data.error);
                setSuccess(data.success);
                setValues({ ...setValues, message: data.message, theme: '' });
            } else {
                setValues({ ...values, theme: '' });
                setError(data.error);
                setSuccess(data.success);
            }
        });
    };

    return (
        <Box component="form" onSubmit={clickSumit}>
            <Container>
                <Grid container xs={12} spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            name="theme"
                            placeholder="Tema"
                            value={theme}
                            label="Tema"
                            variant="outlined"
                            onChange={(handleChange('theme'))}
                            margin="normal"
                            required>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
              Adicionar
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
          This is a success message!
                </Alert>
            </Snackbar>

            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
          This is a error message!
                </Alert>
            </Snackbar>

        </Box>
    );
}

