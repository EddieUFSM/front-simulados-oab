
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core';
import { Grid, AppBar, Toolbar, IconButton, Drawer, Typography } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { DataGrid } from '@material-ui/data-grid';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Chip, Button } from '@material-ui/core';
import { MdMenu } from 'react-icons/md';
import { listQuestions, deleteQuestion } from 'apis';

import TopMenu from 'pages/Menus/TopMenu';
import SideBarMenu from 'pages/Menus/SidebarMenu';
import { isAuthenticated } from 'auth';
const drawerWidth = 240;

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
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const handleDelete = (questionId) => {
        deleteQuestion(isAuthenticated().token, questionId).then(data => {
            if (data.error) {
                setError(data.error);
                setMessage(data.message);
            } else {
                setRows(rows.filter(r => r.id !== data.deletedQuestion._id));
            }
        });
    };


    let columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'banca', headerName: 'Banca', width: 80 },
        {
            field: 'exam',
            headerName: 'Exame',
            width: 100,
            renderCell: (params) => (
                <Chip variant="outlined" size="small" label={params.row.exam.name} />
            ),

        },
        { field: 'year', headerName: 'Ano', width: 80 },
        { field: 'discipline', headerName: 'Disciplina', width: 150 },
        {
            field: 'themes', headerName: 'Temas', width: 250,
            renderCell: (params) => (
                params.row.themes.map(theme => <Chip key={theme._id} variant="outlined" size="small" label={theme.theme} />)
            ),
        },

        {
            field: 'description', headerName: 'Descrição', width: 200,
            renderCell: (params) => (
                <Typography>{params.row.description}</Typography>
            ),
        },
        {
            field: 'editar',
            headerName: '',
            width: 70,
            renderCell: (params) => (
                <IconButton
                    size="small"
                    href={'/question/' + params.id + '/Edit'}
                    style={{ marginLeft: 16 }}
                    color="warning"

                >
                    <EditIcon />
                </IconButton>

            ),
        },
        {
            field: 'deletar',
            headerName: '',
            width: 70,
            renderCell: (params) => (

                <IconButton
                    size="small"
                    color="error"
                    className={classes.danger} onClick={() => { handleDelete(params.id); }}
                >
                    <DeleteIcon />
                </IconButton>


            ),
        },

    ];

    const init = () => {
        listQuestions().then(async data => {
            if (data.error) {
                setError(data.error);
                setMessage(data.message);
                console.log('err:' + data.message);
            } else {
                data.questions.forEach(function (obj) {
                    obj.id = obj._id;
                    delete obj._id;
                    delete obj.optionAnswers;
                });


                console.log('questions:' + data);
                setRows(data.questions);
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


                <Grid container
                    justify="flex-end"
                    spacing={4}>
                    <Grid item justify="flex-end">
                        <Button
                            href="/Question/create"
                            color="success"
                            variant="contained"
                        >
                            Criar Questão
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ height: 500, width: '100%' }}>
                            <DataGrid loading={loading} rows={rows} columns={columns} pageSize={10} checkboxSelection />
                        </div>
                    </Grid>
                </Grid>

                {/* End hero unit */}
            </main>
        </div>
    );
}