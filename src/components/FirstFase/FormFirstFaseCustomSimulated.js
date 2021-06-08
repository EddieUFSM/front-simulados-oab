import React, { useState } from 'react';
import { Grid, makeStyles, Card, CardContent, Typography, TextField, Select, Button, CardActions, FormControl, InputLabel } from '@material-ui/core';
import { createCustomSimulatedByDiscipline } from 'admin/apiAdmin';
import { useHistory } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import { isAuthenticated } from 'auth';
import { Fragment } from 'react';

import MuiAlert from '@material-ui/lab/Alert';

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
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MenuGame() {
    const classes = useStyles();
    const [inputList, setInputList] = useState([{ discipline: '', quant: '' }]);
    const disciplines = [
        { discipline: 'PENAL' },
        { discipline: 'CIVIL' },
        { discipline: 'ADMINISTRATIVO' },
        { discipline: 'PROCESSUAL CIVIL' },
        { discipline: 'CONSTITUCIONAL' },
        { discipline: 'EMPRESARIAL' },
        { discipline: 'PROCESSUAL PENAL' },
        { discipline: 'TRABALHISTA' },
        { discipline: 'PROCESSUAL DO TRABALHO' },
        { discipline: 'TRIBUTÁRIO' },
        { discipline: 'HUMANOS' },
        { discipline: 'CÓDIGO DE DEFESA DO CONSUMIDOR' },
        { discipline: 'ESTATUTO DA CRIANÇA E ADOLESCENTE' },
        { discipline: 'AMBIENTAL' },
        { discipline: 'INTERNACIONAL' },
        { discipline: 'FILOSOFIA DO DIREITO' },
        { discipline: 'ESTATUTO DA ADVOCACIA' },
        { discipline: 'REGULAMENTO GERAL' },
        { discipline: 'CÓDIGO DE ÉTICA' },
        { discipline: 'DISCIPLINA DA OAB' },
        { discipline: 'CÓDIGO DE TRÂNSITO BRASILEIRO' }
    ];
    const history = useHistory();
    const [questionsAvailable, setQuestionsAvailable] = useState(80);
    const { user, token } = isAuthenticated();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [values, setValues] = useState({
        timeToAnswer: '',
        nQuestions: []
    });

    const {
        timeToAnswer,
        nQuestions
    } = values;
    const SomaMaxQuestion = 80;

    const handleChange = (e, index) => {
        const { name, value } = e.target;

        if (name == 'timeToAnswer') {
            setValues({ ...values, timeToAnswer: value });
            return;
        }

        const list = [...inputList];
        list[index][name] = value;

        setInputList(list);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;

        let soma = 0;
        list.map(m => {
            soma = Number(m.quant) + Number(soma);
        });

        setQuestionsAvailable(Number(SomaMaxQuestion) - Number(soma));
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { discipline: '', quant: '' }]);
    };

    const clickSumit = event => {
        event.preventDefault();

        if (questionsAvailable < 0) {
            setMessage('O simulado pode ter no máximo 80');
            setError(true);
            return;
        }

        inputList.map(questions => {
            nQuestions.push(questions);
        });


        createCustomSimulatedByDiscipline(user._id, token, values).then(data => {

            if (data.error) {
                setMessage(data.message);
                setError(data.error);
                setSuccess(data.success);
            } else {
                history.push(`/FirstFase/${data.simulated._id}/start`, { simulated: data.simulated, message: data.message, success: data.success, error: data.error });
                setMessage(data.message);
                setError(data.error);
                setSuccess(data.success);
            }
        });

    };

    return (
        <div className="App">
            <Card>
                <CardContent>
                    <Typography variant='h4'>
                        Simulado Personalizado
                    </Typography>
                    <Typography>
                        Maximo de questões: {questionsAvailable}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <TextField
                                    name="timeToAnswer"
                                    variant='outlined'
                                    label="Tempo para a prova(minutos)"
                                    placeholder="Ex: 60 para 1 hora"
                                    value={timeToAnswer}
                                    onChange={e => handleChange(e)}
                                    InputProps={{ inputProps: { min: 1, max: 360 } }}
                                    style={{ minWidth: 300 }}
                                    type='number'
                                />
                            </FormControl>

                        </Grid>
                        {inputList.map((x, i) => (
                            <Fragment key={i}>
                                <Grid

                                    item
                                    md={5}
                                    xs={12}
                                >
                                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                        <InputLabel id="disciplina">Disciplina</InputLabel>
                                        <Select
                                            fullWidth
                                            name="discipline"
                                            value={x.discipline}
                                            onChange={e => handleInputChange(e, i)}
                                        >
                                            {
                                                disciplines.map((discipline) => (
                                                    <option
                                                        key={discipline.discipline._id}
                                                        value={discipline.discipline}
                                                        onChange={handleChange}
                                                    >
                                                        {discipline.discipline}
                                                    </option>
                                                ))
                                            }

                                        </Select>

                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    md={5}
                                    xs={12}
                                >

                                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                        <TextField
                                            fullWidth
                                            className="ml10"
                                            name="quant"
                                            variant='outlined'
                                            placeholder="Quantidade de questões"
                                            value={x.quant}
                                            InputProps={{ inputProps: { min: 0, max: 60 } }}
                                            type='number'
                                            onChange={e => handleInputChange(e, i)}
                                            max={20}
                                        />
                                    </FormControl>

                                </Grid>
                                <Grid
                                    item
                                    md={2}
                                    xs={12}
                                >
                                    <div className="btn-box">

                                        {inputList.length - 1 === i &&

                                            <Button
                                                variant='contained'
                                                color='primary'
                                                onClick={handleAddClick}>Add</Button>
                                        }
                                        {inputList.length !== 1 &&

                                            <Button
                                                style={{ backgroundColor: 'red', color: 'white', margin: 10 }}
                                                variant='contained'
                                                className="mr10"
                                                onClick={() => handleRemoveClick(i)}
                                            >Del</Button>
                                        }
                                    </div>
                                </Grid>
                            </Fragment>
                        ))}
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
            <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
        </div >
    );
}