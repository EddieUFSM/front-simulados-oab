
import clsx from 'clsx';
import React from 'react'
import { AppBar, Toolbar, IconButton, Drawer, makeStyles, useTheme, Typography } from '@material-ui/core'
import { CenterFocusStrong, ChevronLeft, ChevronRight, Image } from '@material-ui/icons'
import { MdMenu } from 'react-icons/md'

import PriceSection from 'components/Pricing/Pricing'
import FooterSection from 'components/Footer/Footer'
import Parallax from 'components/Parallax/Parallax'
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import classNames from "classnames";
import { isAuthenticated, signout, isAdmin } from "auth"
import img from 'assets/img/simuladosOAB.png'
import logo from 'assets/img/logo.png'

import TopMenu from '../Menus/TopMenu'
import SideBarMenu from '../Menus/SidebarMenu'
import { CardMedia } from '@material-ui/core';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    container: {
        margin: "3rem",
        height: '100vh',
        textAlign: 'center'
    },
    title: {
        fontSize: "2rem",
        fontWeight: "600",
        position: "relative",
        marginBottom: '10px',
        marginTop: '30px'
    },
    subtitle: {
        fontSize: "1rem",
        margin: '0px 0px 0px',
        position: "relative",
        fontWeight: "200",
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
        height: '100vh',
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
        height: 20
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

}))

export default function Home(props, ref) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [onscroll, setOnscroll] = React.useState(false)

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            {/** Menu Topo */}
            <AppBar color='inherit' className={clsx(classes.appBar, classes.appBar, { [classes.appBarShift]: open, })} >
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
                {/** Main content */}        <div className={classes.container}>

                    <GridContainer>
                        <GridItem
                            className={classes.textBanner}
                            xs={6}
                            sm={6}
                            md={6}

                        >
                            <div
                                style={{
                                    margin: 'auto',
                                    maxWidth: 400
                                }}>
                                <img
                                    className={classes.title}
                                    height=''
                                    src={logo}
                                    title=""
                                />
                                <Typography className={classes.title}>
                                    Sua jornada para ser um advogado começa aqui
                                </Typography>
                                <Typography className={classes.subtitle}>
                                    Faça simulados, adquira material para estudo e ainda fica atualizado através do nosso blog.
                                    Tudo isso de graça.
                                    Seja assinante para conteúdos exclusivos do Simulados OAB
                                </Typography>
                            </div>

                        </GridItem>
                        <GridItem xs={6} sm={6} md={6}>
                            <img
                                style={{ maxHeight: 500 }}
                                src={img}
                                title=""
                            />

                        </GridItem>
                    </GridContainer>
                </div>

                <div className={classNames(classes.main, classes.mainRaised)}>
                    <PriceSection />
                </div>
                <FooterSection />
            </main>
        </div>
    )
}