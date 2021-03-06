import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
    Grid, makeStyles, useTheme, Container, Tab, AppBar, Card,
    CardActions,
    CardContent,
    Button,
    Toolbar, IconButton, Drawer, Typography
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { MdMenu } from 'react-icons/md';
import TopMenu from 'pages/Menus/TopMenu';
import SideBarMenu from 'pages/Menus/SidebarMenu';
import BarChart from './components/BarChart';
import RadarChart from './components/RadarChart';
import LineChart from './components/LineChart';
import { readReport } from 'apis';
import { isAuthenticated } from 'auth';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    buttonCardRoot: {
        justifyContent: 'center'
    },
    container: {
        marginLeft: '3rem'
    },
    title: {
        fontSize: '3.2rem',
        fontWeight: '600',
        display: 'inline-block',
        position: 'relative'
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
        padding: theme.spacing(3),
        backgroundColor: 'transparent',
        border: '0px',
        boxShadow: 'none'
    },



}));

export default function Simulado(props) {
    const { user, token } = isAuthenticated();
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [report, setReport] = useState({});
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const init = async () => {
        await readReport(token, user.report).then(data => {
            if (data === undefined) {
                setError(true);
                setMessage('usu??rio n??o tem Report');
            } else if (data.error) {
                setError(data.error);
                setMessage(data.message);
            } else {
                console.log(data.report);
                setReport(data.report);
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

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
                <Container>
                    <Grid container>
                        <TabContext value={value}>
                            <AppBar position="static">
                                <TabList onChange={handleChange} aria-label="simple tabs example">
                                    <Tab label="Por Disciplina - Radar" value="1" />
                                    <Tab label="Por Disciplina - Barra" value="2" />
                                    <Tab label="Geral - Linha" value="3" />
                                    <Tab label="Simulados" value="4" />
                                </TabList>
                            </AppBar>
                            <TabPanel value="1" style={{ width: '100%' }}>
                                <Grid container style={{ width: '100%' }} >
                                    {report.totalQuestions ? <RadarChart report={report} /> : <></>}
                                </Grid>
                            </TabPanel>
                            <TabPanel value="2" style={{ width: '100%' }}>
                                <Grid container style={{ width: '100%' }}>
                                    {report.totalQuestions ? <BarChart report={report} /> : <></>}
                                </Grid>
                            </TabPanel>
                            <TabPanel value="3" style={{ width: '100%' }}>
                                <Grid container style={{ width: '100%' }}>
                                    {report.totalQuestions ? <LineChart report={report} /> : <></>}
                                </Grid>
                            </TabPanel>
                            <TabPanel value="4" style={{ width: '100%' }}>
                                <Grid container style={{ width: '100%' }} spacing={2}>
                                    {
                                        report.simulateds ? report.simulateds.map((item) => (
                                            <Grid key={item._id} item xd={3} >
                                                <Card>
                                                    <CardContent>
                                                        <Typography variant="h5">
                                                            {item.simulated.createdAt.substring(0, 10)} {item.simulated.createdAt.substring(11, 16)}
                                                        </Typography>
                                                        <Typography className={classes.pos} color="secondary">
                                                            Total de Pontos: {item.simulated.pointsTotal}/{item.simulated.questions.length}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions className={classes.buttonCardRoot}>
                                                        <Button size="small" variant="contained" color="secondary" href={'/simulated/' + item.simulated._id + '/overview'} >Detalhes</Button>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        )) : <></>
                                    }
                                </Grid>
                            </TabPanel>
                        </TabContext>

                    </Grid>
                </Container>
            </main>
        </div>
    );
}