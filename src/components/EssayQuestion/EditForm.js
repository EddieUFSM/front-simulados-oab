
import { Grid, InputLabel, Select, FormControl, Button, TextField, Radio, withStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { isAuthenticated } from 'auth'
import { useParams } from 'react-router-dom'
import { getExams, getEssayQuestion, editEssayQuestion } from 'admin/apiAdmin'
import { useForm, Form } from 'components/Form/useForm'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
    toolbar: {
        alignItems: "center",
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
        minWidth: "45vh",
        maxWidth: "45vh"
    },
    inputSelection6: {
        minWidth: "68vh",
        maxWidth: "68vh"
    },
    imputExam: {
        minWidth: "45vh",
        maxWidth: "45vh"
    },
    btn: {
        margin: theme.spacing(3),
        justifyContent: 'center'
    }
}))
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomRadio = withStyles({
    root: {
        color: "#3D61AD",
        '&$checked': {
            color: "#3D61AD",
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />)

const initialFValues = {
    enunciated: "",
    questionA: "",
    commentA: "",
    questionB: "",
    commentB: "",
    comment: "",
    banca: "",
    exam: "",
    year: "",
    theme: "",
    formData: "",
    loading: false
}

export default function Questionnaires() {
    const classes = useStyles();
    const { user, token } = isAuthenticated()
    const [allExams, setAllExams] = useState([])
    let { idEssayQuestion } = useParams();
    const {
        values,
        setValues,
        handleInputChange
    } = useForm(initialFValues)
    const [message, setMessage] = useState('')
    const {
        enunciated,
        banca,
        questionA,
        commentA,
        questionB,
        commentB,
        year,
        exam,
        theme,
    } = values
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const loadEssayQuestion = () => {
        getEssayQuestion(token, idEssayQuestion).then((data) => {
            console.log(data)
            if (data.error) {
                console.log(error)
            } else {
                console.log(data)
                setValues({
                    ...values,
                    enunciated: data.enunciated,
                    exam: data.exam,
                    banca: data.banca,
                    questionA: data.questionA.enunciated,
                    commentA: data.questionA.comment,
                    questionB: data.questionB.enunciated,
                    commentB: data.questionB.comment,
                    year: data.year,
                    theme: data.theme,
                })
            }
        })
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

    const handleExamChange = (e, seletectedExam) => [
        setValues({ ...values, exam: seletectedExam })
    ]

    useEffect(() => {
        loadEssayQuestion()
        loadExam()
    }, [])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
        setError(false)
    };

    const handleChange = name => event => {
        console.log(event.target.value)
        const value = event.target.value
        setValues({ ...values, [name]: value })
    }

    const clickSumit = event => {
        event.preventDefault()
        setMessage('')
        editEssayQuestion(user._id, token, idEssayQuestion, values).then(data => {
            if (data.error) {
                setError(data.error)
                setSuccess(data.success)
                setMessage(data.message)
            } else {
                setError(data.error)
                setSuccess(data.success)
                setMessage(data.message)
                setValues({
                    ...values,
                    enunciated: "",
                    level: "1° fase",
                    comment: "",
                    banca: "",
                    exam: "",
                    year: "",
                    theme: "",
                    loading: false,
                })
            }
        })
    }

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
                        <InputLabel htmlFor="outlined-age-native-simple">Tema</InputLabel>
                        <Select
                            native
                            value={theme}
                            onChange={(handleChange('theme'))}
                            style={{ width: "100%" }}
                        >
                            <option aria-label="None" value="" />
                            <option value={"Direito Administrativo"}>Direito Administrativo</option>
                            <option value={"Direito Civil"}> Direito Civil</option>
                            <option value={"Direito Constitucional"}>Direito Constitucional</option>
                            <option value={"Direito Empresarial"}>Direito Empresarial</option>
                            <option value={"Direito Penal"}>Direito Penal</option>
                            <option value={"Direito Tributário"}>Direito Tributário</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="outlined" className={classes.formControl}>

                        <Autocomplete
                            value={values.exam}
                            variant="outlined"
                            options={allExams}
                            getOptionLabel={option => option.name}
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
                            name="enunciated"
                            label="Enunciado"
                            value={enunciated}
                            onChange={(handleChange('enunciated'))}
                            rowsMax="8"
                            multiline
                            rows="6"
                            style={{ width: "95%" }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField
                            variant="outlined"
                            required
                            name="questionA"
                            label="Enunciado A"
                            value={questionA}
                            onChange={(handleChange('questionA'))}
                            rowsMax="8"
                            multiline
                            rows="6"
                            style={{ width: "95%" }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField
                            required
                            id="commentA"
                            name="commentA"
                            value={commentA}
                            onChange={(handleChange('commentA'))}
                            label="Comentário A"
                            rowsMax="8"
                            variant="outlined"
                            multiline
                            rows="4"
                            fullWidth
                            autoComplete="given-name"
                            style={{ width: "95%" }}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField
                            variant="outlined"
                            required
                            name="questionB"
                            label="Enunciado B"
                            value={questionB}
                            onChange={(handleChange('questionB'))}
                            rowsMax="8"
                            multiline
                            rows="6"
                            style={{ width: "95%" }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField
                            required
                            id="commentB"
                            name="commentB"
                            value={commentB}
                            onChange={(handleChange('commentB'))}
                            label="Comentário B"
                            rowsMax="8"
                            variant="outlined"
                            multiline
                            rows="4"
                            fullWidth
                            autoComplete="given-name"
                            style={{ width: "95%" }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="primary" className={classes.btn} type="submit" onClick={clickSumit}>Editar</Button>
                </Grid>
            </Grid>

            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">This is a success message!</Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error"> This is a error message!</Alert>
            </Snackbar>
        </Form>
    )
}