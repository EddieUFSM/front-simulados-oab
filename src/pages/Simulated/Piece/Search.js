
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core';
import { Card, CardContent, CardActions, Grid, AppBar, Toolbar, IconButton, Drawer, Typography, Button } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

import Chip from '@material-ui/core/Chip';
import { MdMenu } from 'react-icons/md';
import SearchSection from 'components/Piece/Search';
import FooterSection from 'components/Footer/Footer';
import { getAllPieces, deletePiece } from 'apis';

import TopMenu from 'pages/Menus/TopMenu';
import SideBarMenu from 'pages/Menus/SidebarMenu';
import { isAuthenticated } from 'auth';

import DoneIcon from '@material-ui/icons/Done';


const drawerWidth = 240;

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        height: '100vh',
        listStyle: 'none',
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
        padding: theme.spacing(3),
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
    modal: {

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
    },
    paper: {
        width: 800,
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        padding: theme.spacing(2, 4, 3),
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    danger: {

        backgroundColor: '#F01300',
        borderColor: '#F01300',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#932822',
            borderColor: '#932822',
            boxShadow: 'none'
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#932822',
            borderColor: '#932822'
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem #93282200'
        }
    }

}));

export default function Home() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [allPieces, setAllPieces] = useState([]);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    const init = () => {
        getAllPieces().then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
                setMessage(data.message);
                console.log('err:' + data.message);
            } else {

                console.log('questions:' + data);
                setAllPieces(data);
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleDelete = (questionId) => {
        deletePiece(isAuthenticated().token, questionId).then(data => {
            if (data.error) {
                setError(data.error);
                setMessage(data.message);
            } else {
                getAllPieces().then(data => {
                    if (data.error) {
                        setError(data.error);
                        setMessage(data.message);
                    } else {
                        setAllPieces(data);
                        console.log(data);
                    }
                });
            }
        });
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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
                <SearchSection style={{ display: 'none' }} />
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {allPieces.map((piece) => (
                        <Grid item key={piece._id} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>

                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5">
                                        {piece.exam.substring(0, 15)}..
                                    </Typography>
                                    <Typography gutterBottom variant="h6">
                                        {piece.banca} {piece.year}
                                    </Typography>

                                    <Typography>
                                        {piece.enunciated.substring(0, 80)}..
                                    </Typography>
                                    <Chip
                                        label={piece.theme}
                                        clickable
                                        color="primary"
                                        deleteIcon={<DoneIcon />}
                                        variant="outlined"
                                    />
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" variant="contained" href={'/piece/' + piece._id + '/Single'}>
                                        Ver Questão
                                    </Button>
                                    <Button size="small" color="primary" variant="contained" href={'/piece/' + piece._id + '/edit'}>
                                        Editar
                                    </Button>
                                    <Button size="small" variant="outlined" className={classes.danger} onClick={() => { handleDelete(piece._id); }} >
                                        Excluir
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <FooterSection />
            </main>
        </div>
    );
}