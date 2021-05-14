import React, { useState, useEffect, Fragment } from "react"
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, CardHeader, CardContent, Grid, Container, Card, Radio, AppBar, Toolbar, Typography, IconButton, Button, useTheme, Box } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdMenu } from 'react-icons/md'
import styled from "styled-components"
import Pagination from '@material-ui/lab/Pagination'
import { isAuthenticated } from 'auth'
import { getSimulated, saveSimulated, getPoints } from 'admin/apiAdmin'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TopMenu from 'pages/Menus/TopMenu'
import SideBarMenu from 'pages/Menus/SidebarMenu'
const drawerWidth = 240
const Row = styled.div`
  display: flex;
  align-items: center;
`
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
        marginLeft: "3rem"
    },
    simulatedHeader: {
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
}))

export default function Simulated(props) {
    const { user, token } = isAuthenticated()
    const [simulated, setSimulated] = useState({})
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false)

    const init = async () => {
        await getSimulated(token, props.match.params.SimuladoId).then(data => {
            if (data.error) {
                setError(data.error);
                setMessage(data.message)
            } else {
                setSimulated(data.simulated)
            }
        })
    }
    useEffect(() => {
        init();
    }, [])
    const handleDrawerOpen = () => {
        setOpen(true);
    }
    const handleDrawerClose = () => {
        setOpen(false);
    }
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

            </main>
        </div >
    )
}

// export default simulated;
