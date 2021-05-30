import React, { useState, useEffect } from 'react'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core'
import { AppBar, Toolbar, IconButton, Drawer, CardHeader, Typography, Container, withStyles, Radio, Card, Button, Grid, CardContent, createMuiTheme } from '@material-ui/core'
import styled from "styled-components"
import Pagination from '@material-ui/lab/Pagination'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import { MdMenu } from 'react-icons/md'
import TopMenu from 'pages/Menus/TopMenu'
import SideBarMenu from 'pages/Menus/SidebarMenu'
import { getSimulated } from 'admin/apiAdmin';
import { isAuthenticated } from 'auth'
import { useParams } from 'react-router-dom'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { green, purple, red } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
const drawerWidth = 240;
const Row = styled.div`
  display: flex;
  align-items: center;
`

const useStyles = makeStyles((theme) => ({
    buttonSucess: {
        background: green[600],
        color: 'white',
    },
    buttonError: {
        background: red[600],
        color: 'white',
    },
    container: {
        marginLeft: "3rem"
    },
    title: {
        fontSize: "3.2rem",
        fontWeight: "600",
        display: "inline-block",
        position: "relative"
    },
    subtitle: {
        fontSize: "1.313rem",
        maxWidth: "500px",
        margin: "10px 0 0"
    },
    main: {
        background: "#FFFFFF",
        position: "relative",
        zIndex: "3"
    },
    mainRaised: {
        margin: "-60px 30px 0px",
        borderRadius: "6px",
        boxShadow:
            "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    root: {
        flexGrow: 1,
        display: 'flex',
        height: '100vh'
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
    /** Mui T */
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    questionCardContainer: {
        padding: theme.spacing(5),
    }

}))

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
})((props) => <Radio color="default" {...props} />);

const RedRadio = withStyles({
    root: {
        color: red[400],
        '&$checked': {
            color: red[600],
        },
    },
})((props) => <Radio color="default" {...props} />);


export default function Main() {
    const classes = useStyles();
    const { user, token } = isAuthenticated()
    const theme = useTheme();
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState("")
    const [open, setOpen] = React.useState(false);
    const [simulated, setSimulated] = useState({})
    const [timeToAnswer, setTimeToAnswer] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [loading, setLoading] = useState(false)
    const [end, setEnd] = useState(false)
    const [pointsTotal, setPointsTotal] = useState(0)
    const [selectedOptionQuestion, setSelectedOptionQuestion] = useState([])
    const { simulatedId } = useParams()
    const makeAllInivialValues = (number) => {
        for (let index = 0; index < number; index++) {
            setSelectedOptionQuestion(oldArray => [...oldArray, {
                options: {
                    0: false,
                    1: false,
                    2: false,
                    3: false
                },
                hit: false
            }])
        }
    }
    const handleDrawerOpen = () => {
        setOpen(true);
    }
    const handleDrawerClose = () => {
        setOpen(false);
    }
    const updateAnswer = (questionIndex, answerIndex) => {
        const ques = { ...questions };
        questions[questionIndex].selectedAnswerIndex = answerIndex
        setQuestions(ques)
    }
    const init = async () => {
        await getSimulated(token, simulatedId).then(data => {
            console.log(data)
            if (data === undefined || data === {} || data === null) {
                setError(true)
                setMessage("Id inválido")
            } else if (data.error) {
                setError(data.error)
                setMessage(data.message)
            } else {

                if (data.error) {
                    setError(data.error);
                    setMessage(data.message)
                } else {
                    setSeconds(data.simulated.timeToAnswer)
                    setTimeToAnswer(data.simulated.timeToAnswer)
                    setQuestions(data.simulated.questions)
                    setPointsTotal(data.simulated.pointsTotal)
                    setSimulated(data.simulated)
                    setEnd(data.simulated.end)
                    setLoading(false)
                }
            }
        })
    }

    function QuestionCard(props) {
        const classes = useStyles()
        console.log(props)

        return (
            props.questions.length > 0 ?
                <Card id={props.questions[currentQuestion].question ? props.questions[currentQuestion].question.questionId : undefined} className={classes.questionCardContainer}>
                    <CardContent style={{ overflowX: "hidden" }}>
                        <Typography>
                            {props.questions[currentQuestion].question ? props.questions[currentQuestion].question.questionId : undefined}
                        </Typography>
                        <Typography>
                            {props.questions[currentQuestion].question ? props.questions[currentQuestion].question.description : undefined}
                        </Typography>
                        <>
                            {
                                props.questions[currentQuestion].question && props.questions[currentQuestion].question.optionAnswers ?
                                    props.questions[currentQuestion].question.optionAnswers.map((option, index) => (
                                        <Row key={index} style={{ paddingBottom: 20 }}>
                                            {
                                                option._id == props.questions[currentQuestion].correctAnswer._id ?
                                                    <GreenRadio
                                                        checked={true}
                                                        value={index}
                                                    />
                                                    :
                                                    option._id == props.questions[currentQuestion].answerGiven._id && props.questions[currentQuestion].answerGiven._id != props.questions[currentQuestion].correctAnswer._id ?
                                                        <RedRadio
                                                            checked={true}
                                                            value={index}
                                                        />
                                                        :
                                                        <Radio
                                                            color='success'
                                                            checked={false}
                                                            value={index}
                                                            disabled
                                                        />
                                            }

                                            <Typography style={{ textAlign: "left" }} value={index}>{option.text}</Typography>

                                        </Row>
                                    ))
                                    :
                                    <></>
                            }
                        </>
                        <Typography>
                            {props.questions[currentQuestion].question ? props.questions[currentQuestion].question.comment : undefined}
                        </Typography>
                    </CardContent>
                </Card>
                : <></>
        )
    }
    const handleChange = (event, value) => {
        setCurrentQuestion(value - 1)
        console.log(questions)
    }
    const handleChangeQuestion = async (value) => {
        if (questions) {
            if (value < 1) {
            } else if (value > questions.length) {
            } else {
                setCurrentQuestion(value - 1)
                console.log(questions)
            }
        }
    }
    const selectOptionQuestion = (event, index) => {
        let newArr = [...selectedOptionQuestion]; // copying the old datas array

        for (let i = 0; i <= 4; i++) {
            if (event.target.value == index) {
                newArr[currentQuestion].options[event.target.value] = true; // replace e.target.value with whatever you want to change it to
            }
            if (i < 4) {
                newArr[currentQuestion].options[i] = false;
            } else if (i == 4) {
                setSelectedOptionQuestion(newArr)
                console.log(selectedOptionQuestion[currentQuestion])
            }
        }
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <div className={classes.root}>
            {/** Menu Topo */}
            <AppBar color='inherit' className={clsx(classes.appBar, { [classes.appBarShift]: open, })}>
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
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >

                <div className={classes.drawerHeader} />
                {/** Main content */}

                <Container style={{ marginTop: '2%' }}>
                    <Grid container spacing={5}>
                        <Grid item sm={12} md={12} xs={12}>
                            <Typography variant="h4"> Revisão </Typography>
                        </Grid>
                        <Grid item sm={12} md={8} xs={8}>
                            <Row style={{ justifyContent: "center" }}>
                                <Pagination
                                    count={questions.length}
                                    page={currentQuestion + 1}
                                    onChange={handleChange}
                                    showFirstButton
                                    showLastButton
                                />
                            </Row>
                            <Row style={{ marginTop: "30px" }}>
                                {questions.length > 0 ? <QuestionCard questions={questions} updateAnswer={updateAnswer} /> : <></>}
                            </Row>
                            <Row style={{ justifyContent: "center", marginTop: "30px" }}>
                                <Button size="medium" color="primary" onClick={() => { handleChangeQuestion(currentQuestion) }}>
                                    <MdKeyboardArrowLeft />
                                    Anterior
                                </Button>
                                <Button size="medium" color="primary" onClick={() => { handleChangeQuestion(currentQuestion + 2) }}>
                                    Próxima
                                    <MdKeyboardArrowRight />
                                </Button>
                            </Row>
                        </Grid>
                        <Grid item sm={12} md={4} xs={4}>
                            <div>
                                {
                                    simulated.questions !== undefined ? simulated.questions.map((question, index) => (


                                        questions == undefined ? <></> :
                                            questions[index] == undefined ?
                                                <></> :
                                                questions[index].hit ?
                                                    <Button

                                                        value={index + 1}
                                                        onClick={() => { handleChangeQuestion(index + 1) }} question={questions[index]}
                                                        questionIndex={index}
                                                        className={classes.button}
                                                        variant="contained"
                                                        className={classes.buttonSucess}
                                                    > {index + 1} </Button>

                                                    : <Button

                                                        value={index + 1}
                                                        onClick={() => { handleChangeQuestion(index + 1) }} question={questions[index]}
                                                        questionIndex={index}
                                                        className={classes.button}
                                                        variant="contained"
                                                        className={classes.buttonError}> {index + 1} </Button>

                                    )) : <></>
                                }
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    )

}