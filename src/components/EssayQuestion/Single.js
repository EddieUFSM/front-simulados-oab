import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Radio, Button, Typography, Chip, CardActions, Grid } from '@material-ui/core';
import styled, { ThemeConsumer, ThemeContext } from "styled-components"
import { getEssayQuestion, deleteEssayQuestion } from 'admin/apiAdmin'

import { useParams } from 'react-router-dom'
import { isAuthenticated, signout, isAdmin } from "auth"

const Row = styled.div`
  display: flex;
  align-items: center;
`
const Text = styled.div`
  font-family: Roboto, sans-serif;
  font-size: 14px;
`
const AnswerContainer = styled(Button)`
  && {
    padding: 0;
    padding-right: 20px;
    text-transform: none;
  }
`
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
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
    }

}))

export default function EssayQuestionCard() {
    const classes = useStyles();
    const [essayQuestion, setEssayQuestion] = useState({})
    const [aEnunciated, setAEnunciated] = useState('')
    const [bEnunciated, setBEnunciated] = useState('')
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    let { idEssayQuestion } = useParams();

    const handleDelete = (essayQuestionId) => {
        deleteEssayQuestion(isAuthenticated().token, essayQuestionId).then(data => {
            if (data.error) {
                setError(data.error);
                setMessage(data.message)
            } else {
                console.log(data)
            }
        })
    }

    const init = () => {
        getEssayQuestion(isAuthenticated().token, idEssayQuestion).then(data => {
            if (data == undefined) {
                return
            } else if (data.error) {
                setEssayQuestion(data)
            } else {
                setEssayQuestion(data)
                setAEnunciated(data.questionA.enunciated)
                setBEnunciated(data.questionB.enunciated)
            }
        })
    }

    useEffect(() => {
        init()
    }, [])


    return (
        <Card id={essayQuestion._id} elevation={0}>
            <Card content style={{ overflowX: "hidden" }}>
                <CardHeader
                    style={{ paddingRight: 40, paddingLeft: 0 }}
                    title={
                        <>
                            <Typography variant="h5">
                                {essayQuestion.year}
                                <span> {essayQuestion.banca}</span>
                            </Typography>
                        </>
                    }
                />
                <CardContent style={{ overflowX: "hidden" }}>
                    <Typography variant="body1">
                        Questão: {essayQuestion.enunciated}
                    </Typography>

                    <Grid container>
                        <Grid item>
                            <Typography variant="body1"> A: {aEnunciated}</Typography>
                        </Grid>

                    </Grid>
                    <Grid container>
                        <Grid item>
                            <Typography variant="body1"> B: {bEnunciated}</Typography>
                        </Grid>
                    </Grid>
                    <Chip label={essayQuestion.theme} />

                </CardContent>

                <CardActions>
                    <Button size="small" color="primary" variant="contained" href={"/essayQuestion/" + essayQuestion._id + "/Edit"}> Editar </Button>
                    <Button size="small" variant="outlined" className={classes.danger} onClick={() => { handleDelete(essayQuestion._id) }} > Excluir </Button>
                </CardActions>


            </Card>
        </Card >
    )
}
