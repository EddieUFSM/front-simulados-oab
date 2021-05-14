import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import { CardHeader, CardContent, Card, Radio, Button } from '@material-ui/core';

import styled from "styled-components"

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
    root: {
        display: 'flex',
        flexGrow: 1,
        height: '100vh'
    }, container: {
        marginLeft: "3rem"
    },
    questionnaireHeader: {
        backgroundColor: "#2076d2",
        color: "#fff",
    },
    timer: {
        paddingLeft: theme.spacing(4),
    },
    questionCardContainer: {
        paddingLeft: theme.spacing(4),
        paddingBottom: theme.spacing(2),
    },
    title: {
        fontSize: "3.2rem",
        fontWeight: "600",
        display: "inline-block",
        position: "relative",
        flexGrow: 1
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
        margin: "5px"
    }


}));

export default function QuestionCard(props) {
    const classes = useStyles();

    return (
        <Card id={props.question.name} className={classes.questionCardContainer}>
            <CardHeader
                style={{ paddingRight: 40, paddingLeft: 0 }}
                title={
                    <span>
                        {props.question.title || props.question.name}
                    </span>
                }
            />
            <CardContent style={{ overflowX: "hidden" }}>
                <span>
                    {props.question.description}
                </span>
            </CardContent>
            {
                props.question.options.map((option, index) => (
                    <Row key={index}>
                        <AnswerContainer
                            onClick={() => props.updateAnswer(props.questionIndex, index)}
                            style={{ marginRight: 20 }}
                            role="button"
                        >
                            <Radio checked={index === props.question.selectedAnswerIndex} />
                            <Text>{option}</Text>
                        </AnswerContainer>
                    </Row>
                ))
            }
        </Card>
    )
}