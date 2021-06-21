
import { Grid, InputLabel, Select, FormControl, Button, TextField, Radio, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { isAuthenticated } from 'auth';
import { listThemes, readQuestion, updateQuestion, listExams } from 'apis';
import { useForm, Form } from 'components/Form/useForm';
import { useParams } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        alignItems: 'center',
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',

        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },

    /**Menu TOP */

    title: {
        flexGrow: 1,
    },
    iconAppBarSvg: {
        margin: 10,
        height: 'auto',
        width: 15,
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    inputSelection: {
        minWidth: '45vh',
        maxWidth: '45vh'
    },
    inputSelection6: {
        minWidth: '68vh',
        maxWidth: '68vh'
    },
    imputExam: {
        minWidth: '45vh',
        maxWidth: '45vh'
    },
    btn: {
        margin: theme.spacing(3),
        justifyContent: 'center'
    }
}));
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const CustomRadio = withStyles({
    root: {
        color: '#3D61AD',
        '&$checked': {
            color: '#3D61AD',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);
const initialFValues = {
    _id: '',
    description: '',
    level: '1° fase',
    optionAnswers: [
        {
            id: 0,
            text: '',
            flag: true
        },
        {
            id: 1,
            text: '',
            flag: false
        },
        {
            id: 2,
            text: '',
            flag: false
        },
        {
            id: 3,
            text: '',
            flag: false
        }
    ],
    optionAnswerText0: '',
    optionAnswerText1: '',
    optionAnswerText2: '',
    optionAnswerText3: '',
    comment: '',
    banca: '',
    exam: '',
    year: '',
    discipline: '',
    themes: [],
    formData: '',
    loading: false

};

export default function Questionnaires() {
    const classes = useStyles();
    const [selectedValue, setSelectedValue] = React.useState('a');
    const { user, token } = isAuthenticated();
    const {
        values,
        setValues,
        handleInputChange
    } = useForm(initialFValues);
    const {
        _id,
        description,
        optionAnswers,
        optionAnswerText0,
        optionAnswerText1,
        optionAnswerText2,
        optionAnswerText3,
        comment,
        banca,
        exam,
        year,
        discipline,
        themes
    } = values;
    const [allThemes, setAllThemes] = useState([]);
    const [question, setQuestion] = useState({});
    const [message, setMessage] = useState('');
    let { idQuestion } = useParams();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [allExams, setAllExams] = useState([]);

    const loadThemes = () => {
        listThemes(token).then((data) => {
            if (data.error) {
                console.log(error);
            } else {
                setAllThemes(data);
            }
        });
    };
    const init = () => {
        readQuestion(isAuthenticated().token, idQuestion).then(data => {
            if (data.error) {
                setError(data.error);
                setMessage(data.message);
            } else {
                console.log('data.exam', data);
                setValues({
                    ...values,
                    _id: idQuestion,
                    description: data.description,
                    level: data.level,
                    optionAnswers: [
                        {
                            id: 0,
                            text: data.optionAnswers[0].text,
                            flag: data.optionAnswers[0].flag
                        },
                        {
                            id: 1,
                            text: data.optionAnswers[1].text,
                            flag: data.optionAnswers[1].flag
                        },
                        {
                            id: 2,
                            text: data.optionAnswers[2].text,
                            flag: data.optionAnswers[2].flag
                        },
                        {
                            id: 3,
                            text: data.optionAnswers[3].text,
                            flag: data.optionAnswers[3].flag
                        }
                    ],
                    optionAnswerText0: data.optionAnswers[0].text,
                    optionAnswerText1: data.optionAnswers[1].text,
                    optionAnswerText2: data.optionAnswers[2].text,
                    optionAnswerText3: data.optionAnswers[3].text,
                    comment: data.comment,
                    banca: data.banca,
                    exam: data.exam,
                    year: data.year,
                    discipline: data.discipline,
                    themes: data.themes,
                    formData: '',
                    loading: false

                });

            }
        });
    };
    useEffect(() => {
        init();
        loadThemes();
        loadExam();
    }, []);
    const loadExam = () => {
        listExams(token).then((data) => {
            if (data.error) {
                console.log(error);
            } else {
                setAllExams(data);
            }
        });
    };
    const handleExamChange = (e, seletectedExam) => [
        setValues({ ...values, exam: seletectedExam })
    ];
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
        setError(false);
    };
    const handleThemesChange = (e, seletectedThemes) => {
        setValues({ ...values, themes: seletectedThemes });
    };
    const handleChangeRadio = (event) => {
        setSelectedValue(event.target.name);
        console.log(event.target.name);
        if (event.target.name === 'a') {
            console.log(values);
            optionAnswers[0].flag = true;
            optionAnswers[1].flag = false;
            optionAnswers[2].flag = false;
            optionAnswers[3].flag = false;
        }
        if (event.target.name === 'b') {
            console.log(values);
            optionAnswers[0].flag = false;
            optionAnswers[1].flag = true;
            optionAnswers[2].flag = false;
            optionAnswers[3].flag = false;
        }
        if (event.target.name === 'c') {
            console.log(values);
            optionAnswers[0].flag = false;
            optionAnswers[1].flag = false;
            optionAnswers[2].flag = true;
            optionAnswers[3].flag = false;
        }
        if (event.target.name === 'd') {
            console.log(values);
            optionAnswers[0].flag = false;
            optionAnswers[1].flag = false;
            optionAnswers[2].flag = false;
            optionAnswers[3].flag = true;
        }
    };
    const handleChange = name => event => {
        optionAnswers[0].text = optionAnswerText0;

        optionAnswers[1].text = optionAnswerText1;

        optionAnswers[2].text = optionAnswerText2;

        optionAnswers[3].text = optionAnswerText3;
        const value = event.target.value;
        setValues({ ...values, [name]: value });
    };
    const clickSumit = event => {
        event.preventDefault();
        setMessage('');
        values.description.replace(/  +/g, ' ');
        updateQuestion(user._id, token, values).then(data => {
            if (data.error) {
                setError(data.error);
                setSuccess(data.success);
                setMessage(data.message);
            } else {
                setError(data.error);
                setSuccess(data.success);

                setMessage(data.message);
                setValues({
                    ...values,
                    description: '',
                    level: '1° fase',
                    optionAnswers: [
                        {
                            id: 0,
                            text: '',
                            flag: false
                        },
                        {
                            id: 1,
                            text: '',
                            flag: false
                        },
                        {
                            id: 2,
                            text: '',
                            flag: false
                        },
                        {
                            id: 3,
                            text: '',
                            flag: false
                        }
                    ],
                    optionAnswerText0: '',
                    optionAnswerText1: '',
                    optionAnswerText2: '',
                    optionAnswerText3: '',
                    comment: '',
                    banca: '',
                    exam: '',
                    year: '',
                    discipline: '',
                    theme: '',
                    loading: false,
                });
            }
        });
    };
    return (
        <Form>
            <Grid container>
                <Grid item xs={6}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Banca</InputLabel>
                        <Select

                            native
                            value={banca}
                            onChange={(handleChange('banca'))}
                            label="Banca"

                        >
                            <option aria-label="None" value="" />
                            <option value={'FGV'}>FGV</option>
                            <option value={'CESPE'}>CESPE</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Ano</InputLabel>
                        <Select

                            native
                            value={year}
                            onChange={(handleChange('year'))}
                            label="Ano"

                        >
                            <option aria-label="None" value="" />
                            <option value={2020}>2020</option>
                            <option value={2019}>2019</option>
                            <option value={2018}>2018</option>
                            <option value={2017}>2017</option>
                            <option value={2016}>2016</option>
                            <option value={2015}>2015</option>
                            <option value={2014}>2014</option>
                            <option value={2013}>2013</option>
                            <option value={2012}>2012</option>
                            <option value={2011}>2011</option>
                            <option value={2010}>2010</option>
                            <option value={2009}>2009</option>
                            <option value={2008}>2008</option>
                            <option value={2007}>2007</option>
                            <option value={2006}>2006</option>
                            <option value={2005}>2005</option>
                            <option value={2004}>2004</option>
                            <option value={2003}>2003</option>
                            <option value={2002}>2002</option>
                            <option value={2001}>2001</option>
                            <option value={2000}>2000</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Disciplina</InputLabel>
                        <Select

                            native
                            value={discipline}
                            onChange={(handleChange('discipline'))}
                            label="Disciplina"
                            style={{ width: '100%' }}
                        >
                            <option aria-label="None" value="" />
                            <option value={'PENAL'}>PENAL</option>
                            <option value={'CIVIL'}>CIVIL</option>
                            <option value={'ADMINISTRATIVO'}>ADMINISTRATIVO</option>
                            <option value={'PROCESSUAL CIVIL'}>PROCESSUAL CIVIL</option>
                            <option value={'CONSTITUCIONAL'}>CONSTITUCIONAL</option>
                            <option value={'EMPRESARIAL'}>EMPRESARIAL</option>
                            <option value={'PROCESSUAL PENAL'}>PROCESSUAL PENAL</option>
                            <option value={'TRABALHISTA'}>TRABALHISTA</option>
                            <option value={'PROCESSUAL DO TRABALHO'}>PROCESSUAL DO TRABALHO</option>
                            <option value={'CÓDIGO DE TRÂNSITO BRASILEIRO'}>CÓDIGO DE TRÂNSITO BRASILEIRO</option>
                            <option value={'TRIBUTÁRIO'}>TRIBUTÁRIO</option>
                            <option value={'HUMANOS'}>HUMANOS</option>
                            <option value={'CÓDIGO DE DEFESA DO CONSUMIDOR'}>CÓDIGO DE DEFESA DO CONSUMIDOR</option>
                            <option value={'ESTATUTO DA CRIANÇA E ADOLESCENTE'}>ESTATUTO DA CRIANÇA E ADOLESCENTE</option>
                            <option value={'AMBIENTAL'}>AMBIENTAL</option>
                            <option value={'INTERNACIONAL'}>INTERNACIONAL</option>
                            <option value={'FILOSOFIA DO DIREITO'}>FILOSOFIA DO DIREITO</option>
                            <option value={'ESTATUTO DA ADVOCACIA'}>ESTATUTO DA ADVOCACIA</option>
                            <option value={'REGULAMENTO GERAL'}>REGULAMENTO GERAL</option>
                            <option value={'CÓDIGO DE ÉTICA'}>CÓDIGO DE ÉTICA</option>
                            <option value={'DISCIPLINA DA OAB'}>DISCIPLINA DA OAB</option>
                            <option value={'CÓDIGO ELEITORAL'}>CÓDIGO ELEITORAL</option>
                            <option value={'CÓDIGO DE TRÂNSITO BRASILEIRO'}>CÓDIGO DE TRÂNSITO BRASILEIRO</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <Autocomplete
                            variant="outlined"
                            multiple
                            defaultValue={themes}
                            options={allThemes}
                            getOptionLabel={option => option.theme}
                            value={values.themes}
                            onChange={handleThemesChange}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    margin="normal"
                                    label='Temas'
                                    fullWidth
                                />
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <Autocomplete
                            variant="outlined"
                            options={allExams}
                            getOptionLabel={option => option.name}
                            value={exam}

                            defaultValue={exam}
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
                <Grid item xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField
                            variant="outlined"
                            required
                            name="description"
                            label="Enunciado"
                            value={description}
                            onChange={(handleChange('description'))}
                            rowsMax="8"
                            multiline
                            rows="6"
                            style={{ width: '95%' }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <CustomRadio
                        checked={optionAnswers[0].flag}
                        onChange={handleChangeRadio}
                        value={optionAnswers[0].flag}
                        inputProps={{ 'aria-label': 'A' }}
                        name='a'
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        multiline
                        value={optionAnswerText0}
                        onChange={(handleChange('optionAnswerText0'))}
                        rows="3"
                        id="a"
                        label="A"
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomRadio
                        checked={optionAnswers[1].flag}
                        value={optionAnswers[1].flag}
                        onChange={handleChangeRadio}
                        name='b'
                        inputProps={{ 'aria-label': 'B' }}

                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        multiline
                        rows="3"
                        value={optionAnswerText1}
                        onChange={(handleChange('optionAnswerText1'))}
                        small
                        id="b"
                        label="B"

                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomRadio
                        checked={optionAnswers[2].flag}
                        value={optionAnswers[2].flag}
                        onChange={handleChangeRadio}
                        name='c'

                        inputProps={{ 'aria-label': 'C' }}

                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        multiline
                        value={optionAnswerText2}
                        onChange={(handleChange('optionAnswerText2'))}
                        rows="3"
                        small
                        id="c"
                        label="C"

                    />
                </Grid>
                <Grid item xs={6}>

                    <CustomRadio
                        checked={optionAnswers[3].flag}
                        name='d'
                        onChange={handleChangeRadio}
                        value={optionAnswers[3].flag}
                        inputProps={{ 'aria-label': 'D' }}

                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        multiline
                        value={optionAnswerText3}
                        onChange={(handleChange('optionAnswerText3'))}
                        rows="3"
                        small
                        id="d"
                        label="D"

                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField
                            required
                            id="comment"
                            name="comment"
                            value={comment}
                            onChange={(handleChange('comment'))}
                            label="Comentário"
                            rowsMax="8"
                            variant="outlined"
                            multiline
                            rows="4"
                            fullWidth
                            autoComplete="given-name"
                            style={{ width: '95%' }}
                        />
                    </FormControl>

                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="primary" className={classes.btn} type="submit" onClick={clickSumit}>
                        Atualizar
                    </Button>
                </Grid>
            </Grid>
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
        </Form>
    );
}