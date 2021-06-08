import React, { useState, useEffect, Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, CardHeader, CardContent, Grid, Container, Card, Radio, AppBar, Toolbar, Typography, IconButton, Button, useTheme } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdMenu } from 'react-icons/md';
import styled from 'styled-components';
import Pagination from '@material-ui/lab/Pagination';
import { isAuthenticated } from 'auth';
import { getSimulated, saveSimulated, endSimulated } from 'admin/apiAdmin';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TopMenu from 'pages/Menus/TopMenu';
import SideBarMenu from 'pages/Menus/SidebarMenu';
import { useHistory } from 'react-router-dom';
const drawerWidth = 240;
const Row = styled.div`
  display: flex;
  align-items: center;
`;
const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        alignItems: 'center'
    },
    root: {
        display: 'flex',
        flexGrow: 1,
        height: '100vh'
    }, container: {
        marginLeft: '3rem'
    },
    simulatedHeader: {
        backgroundColor: '#2076d2',
        color: '#fff',
    },
    timer: {
        paddingLeft: theme.spacing(4),
    },
    questionCardContainer: {
        paddingLeft: theme.spacing(4),
        paddingBottom: theme.spacing(2),
    },
    title: {
        fontSize: '3.2rem',
        fontWeight: '600',
        display: 'inline-block',
        position: 'relative',
        flexGrow: 1
    },
    subtitle: {
        fontSize: '1.313rem',
        maxWidth: '500px',
        margin: '10px 0 0'
    },
    main: {
        background: '#FFFFFF',
        position: 'relative',
        zIndex: '3'
    },
    mainRaised: {
        margin: '-60px 30px 0px',
        borderRadius: '6px',
        boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
    },
    appBar: {
        boxShadow: 'none',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuIcon: {
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(1)
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        borderRight: 'none',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    grow: {
        flexGrow: 1
    },
    iconsMenu: {
        marginRight: theme.spacing(1)
    },
    logo: {
        height: 30
    },
    ListItemText: {
        fontSize: 14
    },
    listItem: {
        paddingTop: 6,
        paddingBottom: 6
    },
    MuiList: {
        paddingTop: 0,
        paddingBottom: 0
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        alignItems: 'center',
        display: 'flex',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1
    },
    iconButton: {
        padding: 10
    },
    divider: {
        height: 28,
        margin: 4
    },
    rootSearch: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    button: {
        margin: '5px'
    }
}));

export default function Simulated(props) {
    const { user, token } = isAuthenticated();
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeToAnswer, setTimeToAnswer] = useState(0);
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [end, setEnd] = useState(false);
    const [pointsTotal, setPointsTotal] = useState(0);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedOptionQuestion, setSelectedOptionQuestion] = useState([]);
    const [seconds, setSeconds] = useState(0);
    const [pause, setPause] = useState(false);
    const history = useHistory();
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    const [simulated, setSimulated] = useState({});
    const makeAllInivialValues = (number) => {
        for (let index = 0; index < number; index++) {
            setSelectedOptionQuestion(oldArray => [...oldArray, {
                options: {
                    0: false,
                    1: false,
                    2: false,
                    3: false
                },
                answerGiven: {},
            }]);
        }
    };
    const init = () => {
        getSimulated(token, props.match.params.SimuladoId).then(data => {
            if (data.error) {
                setError(data.error);
                setMessage(data.message);
            } else {
                setSeconds(data.simulated.timeToAnswer);
                setTimeToAnswer(data.simulated.timeToAnswer);
                setQuestions(data.simulated.questions);
                setPointsTotal(data.simulated.pointsTotal);
                setSimulated(data.simulated);
                setEnd(data.simulated.end);
                makeAllInivialValues(80);
                setLoading(false);
            }
        });
    };
    useEffect(() => {
        init();
    }, []);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const updateAnswer = (questionIndex, answerIndex) => {
        const ques = { ...questions };
        questions[questionIndex].selectedAnswerIndex = answerIndex;
        setQuestions(ques);
    };
    const handleChange = (event, value) => {
        setCurrentQuestion(value - 1);
        console.log(questions);
    };
    const handleChangeQuestion = async (value) => {
        if (questions) {
            if (value > 1 || value < questions.length) {
                setCurrentQuestion(value - 1);
                console.log(questions);
            }
        }
    };

    const clickContinue = () => {
        setPause(false);
    };
    const selectOptionQuestion = (event, index) => {
        let newArr = [...selectedOptionQuestion]; // copying the old datas array
        for (let i = 0; i <= 4; i++) {
            newArr[currentQuestion].answerGiven = questions[currentQuestion].question.optionAnswers[index];
            if (event.target.value == index) {
                newArr[currentQuestion].options[event.target.value] = true;
            }
            if (i < 4) {
                newArr[currentQuestion].options[i] = false;
            } else if (i == 4) {
                setSelectedOptionQuestion(newArr);
            }
        }
    };
    function QuestionCard(props) {
        const classes = useStyles();

        return (
            <Card id={props.questions[currentQuestion].question ? props.questions[currentQuestion].question.questionId : undefined} className={classes.questionCardContainer}>
                <CardHeader
                    style={{ paddingRight: 40, paddingLeft: 0 }}
                    title={
                        <span>
                            {props.questions[currentQuestion].question ? props.questions[currentQuestion].question.questionId : undefined}
                        </span>
                    }
                />
                <CardContent style={{ overflowX: 'hidden' }}>
                    <span>
                        {props.questions[currentQuestion].question ? props.questions[currentQuestion].question.description : undefined}
                    </span>
                </CardContent>
                {

                    props.questions[currentQuestion].question && props.questions[currentQuestion].question.optionAnswers ?
                        props.questions[currentQuestion].question.optionAnswers.map((option, index) => (
                            <Row key={index} style={{ paddingBottom: 20 }}>
                                <Button
                                    onClick={(e) => selectOptionQuestion(e, index)}
                                    style={{
                                        marginRight: 20,
                                        padding: 0,
                                        paddingRight: 20,
                                        textTransform: 'none'
                                    }}
                                >
                                    <Radio
                                        checked={selectedOptionQuestion[currentQuestion] ? selectedOptionQuestion[currentQuestion].options[index] : false}
                                        value={index}
                                    />
                                    <Typography style={{ textAlign: 'left' }} value={index}>{option.text}</Typography>
                                </Button>
                            </Row>
                        ))
                        :
                        <></>
                }
            </Card>
        );
    }
    function Timer(props) {
        const { className } = props;
        const [open, setOpen] = React.useState(false);
        useEffect(() => {
            if (seconds > 0 && !pause) {
                if (!end) {
                    setTimeout(() => setSeconds(seconds - 1), 1000);
                }
            } else if (seconds == 0) {

                if (!end) {
                    endSimulated(user._id, token, simulated._id, user.report, { 'questionsAnswers': selectedOptionQuestion, 'timeToAnswer': seconds }).then(data => {
                        setSimulated(data.simulated);
                        setPointsTotal(data.simulated.pointsTotal);
                    });
                    setEnd(true);
                    setOpen(false);
                }
            } else {
                setOpen(true);
            }
        });

        const minutes = Math.floor(seconds / 60);

        const hour = Math.floor(minutes / 60);

        return (
            <Fragment>
                <div className={className} >
                    {hour}:{minutes - hour * 60}:{(seconds - minutes * 60)}
                </div>

                <Dialog
                    open={end}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"

                >
                    <DialogTitle id="alert-dialog-slide-title">{'Simulado Encerrado!'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
              Você acertou {pointsTotal} de {questions.length} questões.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" variant='contained' onClick={(e) => { redirectToReport(e); }}>
              Relatório
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={open || pause}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">Jogo Pausado</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
              Retome o Simulados
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={() => clickContinue()} variant='contained'>
              Retomar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
    const clickSave = (event) => {
        event.preventDefault();
        setPause(true);
        saveSimulated(user._id, token, props.match.params.SimuladoId, { 'questionsAnswers': selectedOptionQuestion, 'timeToAnswer': seconds }).then(data => {
            console.log(data);
        });
    };
    const redirectToReport = async (event) => {
        event.preventDefault();
        history.push('/report/' + user.report);


    };
    const clickEnd = async (event) => {
        event.preventDefault();
        setEnd(true);
        setSeconds(0);
        console.log(selectedOptionQuestion);
        endSimulated(user._id, token, simulated._id, user.report, { 'questionsAnswers': selectedOptionQuestion, 'timeToAnswer': seconds }).then(data => {
            setSimulated(data.simulated);
            setPointsTotal(data.simulated.pointsTotal);
        });
    };
    return (
        <div className={classes.root}>
            {/** Menu Topo */}
            <AppBar color='inherit' className={clsx(classes.appBar, classes.appBar, { [classes.appBarShift]: open, })}>
                <Toolbar>
                    {/* left */}
                    <IconButton
                        edge="start"
                        className={clsx(classes.menuIcon, classes.menuButton, open && classes.hide)}
                        color="inherit"
                        onClick={handleDrawerOpen}
                        aria-label="menu">
                        <MdMenu />
                    </IconButton>
                    <TopMenu />
                </Toolbar>
            </AppBar>

            {/** Menu Lateral */}
            <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open} classes={{ paper: classes.drawerPaper, }} >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
                </div>
                <div className={classes.drawerContainer}>
                    <SideBarMenu />
                </div>
            </Drawer>

            {/** Main Space */}
            <main className={clsx(classes.content, { [classes.contentShift]: open, })}>

                {/** Timer */}
                <Toolbar style={{}} className={classes.simulatedHeader}>
                    <Typography align="center" variant="h6"></Typography>
                </Toolbar>

                <Container style={{ marginTop: '2%' }}>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <Row style={{ justifyContent: 'center' }}>
                                <Typography variant="h5" >
                                    {timeToAnswer > 0 && !loading ? <Timer seconds={timeToAnswer} className={classes.timer} /> : <></>}
                                </Typography>
                            </Row>
                        </Grid>
                        {
                            questions === undefined || questions.length <= 0 ?
                                <>

                                </>

                                : <>
                                    <Grid container spacing={5}>
                                        <Grid item sm={12} md={8} xs={8}>
                                            <Row style={{ justifyContent: 'center' }}>
                                                <Pagination
                                                    count={questions.length}
                                                    page={currentQuestion + 1}
                                                    onChange={handleChange}
                                                    showFirstButton
                                                    showLastButton
                                                />
                                            </Row>
                                            <Row style={{ marginTop: '30px' }}>
                                                <QuestionCard questions={questions} updateAnswer={updateAnswer} />
                                            </Row>
                                            <Row style={{ justifyContent: 'center', marginTop: '30px' }}>
                                                <Button size="medium" color="primary" onClick={() => { handleChangeQuestion(currentQuestion); }}>
                                                    <MdKeyboardArrowLeft />
                          Anterior
                                                </Button>
                                                <Button size="medium" color="primary" onClick={() => { handleChangeQuestion(currentQuestion + 2); }}>
                          Próxima
                                                    <MdKeyboardArrowRight />
                                                </Button>
                                            </Row>
                                        </Grid>
                                        <Grid item sm={12} md={4} xs={4}>
                                            <div>
                                                {
                                                    questions !== undefined ? questions.map((question, index) => (
                                                        <Button
                                                            key={index}
                                                            variant="contained"
                                                            value={index + 1}
                                                            onClick={() => { handleChangeQuestion(index + 1); }} question={questions[index]}
                                                            questionIndex={index}
                                                            className={classes.button}
                                                            color={
                                                                selectedOptionQuestion == undefined ? 'inherit' :
                                                                    selectedOptionQuestion[index] == undefined ?
                                                                        'inherit' :
                                                                        selectedOptionQuestion[index].options[0] ||
                                      selectedOptionQuestion[index].options[1] ||
                                      selectedOptionQuestion[index].options[2] ||
                                      selectedOptionQuestion[index].options[3]
                                                                            ? 'primary' : 'inherit'}> {index + 1} </Button>
                                                    )) : <></>
                                                }
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant='contained' color='primary' style={{ margin: 10 }} onClick={(e) => clickSave(e)}>Salvar Estado</Button>
                                        <Button variant='contained' style={{ margin: 10, backgroundColor: '#B00020', color: '#ffffff' }} onClick={(e) => clickEnd(e)}>Terminar</Button>
                                    </Grid>
                                </>
                        }
                    </Grid>
                </Container>
                {loading ?
                    <Dialog open={loading} TransitionComponent={Transition} keepMounted aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
                        <DialogTitle id="alert-dialog-slide-title">{'Aguarde! Estamos preparando o seu Simulado!'}</DialogTitle>
                        <DialogActions style={{ textAlign: 'center' }}>
              ...
                        </DialogActions>
                    </Dialog>
                    : <></>
                }

            </main>

        </div >
    );
}

// export default simulated;
