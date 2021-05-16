import React, { useState, useEffect } from 'react'
import { Grid, makeStyles, Card, CardContent, Typography, TextField, Button, CardActions, FormControl } from '@material-ui/core'
import { createSimulatedByExam, getExams } from 'admin/apiAdmin'
import { useHistory } from "react-router-dom"
import Snackbar from '@material-ui/core/Snackbar'
import { isAuthenticated } from 'auth'
import MuiAlert from '@material-ui/lab/Alert'

import Autocomplete from '@material-ui/lab/Autocomplete'

const useStyles = makeStyles((theme) => ({
    /** Mui T */

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '50px'

    }, formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}))

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function MenuGame() {
    const classes = useStyles();
    const history = useHistory();
    const [allExams, setAllExams] = useState([])
    const { user, token } = isAuthenticated()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    const [values, setValues] = useState({
        exam: "",
    })
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSuccess(false);
        setError(false)
    }


    const loadExam = () => {
        getExams(token).then((data) => {
            if (data.error) {
                console.log(error)
            } else {
                console.log(data)
                setAllExams(data)
            }
        })
    }
    useEffect(() => {
        loadExam()
    }, [])

    const handleExamChange = (e, seletectedExam) => [
        setValues({ ...values, exam: seletectedExam })
    ]

    const clickSumit = event => {
        event.preventDefault()
        createSimulatedByExam(user._id, token, values).then(data => {
            if (data.error) {
                setMessage(data.message)
                setError(data.error)
                setSuccess(data.success)
            } else {
                history.push(`/FirstFase/${data.simulated._id}/start`, { simulated: data.simulated, message: data.message, success: data.success, error: data.error });
                setMessage(data.message)
                setError(data.error)
                setSuccess(data.success)
            }
        });

    }

    return (
        <div className="App">
            <Card>
                <CardContent>
                    <Typography variant='h4'>
                        Simulado Primeira Fase Prova Objetiva
                    </Typography>

                    <Grid container spacing={2}>

                        <Grid
                            item
                            md={5}
                            xs={12}
                        >

                            <FormControl variant="outlined" className={classes.formControl}>

                                <Autocomplete
                                    variant="outlined"
                                    options={allExams}
                                    getOptionLabel={option => option.name}
                                    value={values.exam}
                                    onChange={handleExamChange}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            margin="normal"
                                            label='Exame'
                                            fullWidth
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>

                    </Grid>


                </CardContent>
                <CardActions >
                    <FormControl variant="outlined" className={classes.formControl}>
                        <Button
                            onClick={(e) => clickSumit(e)}
                            variant='contained'
                            color='secondary'>
                            Iniciar Simulado
                        </Button>
                    </FormControl>


                </CardActions>
            </Card>
            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {message}
                </Alert>
            </Snackbar>

            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>

        </div >
    )
}