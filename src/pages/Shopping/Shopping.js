
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Box, AppBar, Toolbar, Typography, IconButton, Link, useTheme } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { MdMenu } from 'react-icons/md';
import BannerImage from 'pages/Shopping/BannerImage';
import ProductCategories from 'pages/Shopping/ProductCategories';
import HowItWorks from 'pages/Shopping/HowItWorks';
import ContactUsSection from 'pages/Shopping/ContactUsSection';
import { listProducts } from 'apis';
import ProductCarausel from 'pages/Shopping/ProductCarausel';
import FooterSection from 'components/Footer/Footer';

import TopMenu from 'pages/Menus/TopMenu';
import SideBarMenu from 'pages/Menus/SidebarMenu';

function Copyright() {
    return (
        <>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="#">
          Simulados OAB
                </Link>{' '}
                {new Date().getFullYear()}
                {'. Produzido por '}
                <Link color="inherit" href="https://uonni.com">
          Uonni
                </Link>{'.'}
            </Typography>

        </>

    );
}
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
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
        height: '100vh',
        overflow: 'auto',
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
    icon: {
        marginRight: theme.spacing(2),
    },
    cardRoot: {
        maxWidth: 345,
    },
    
   
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    productFilter: {
        root: {
            flexGrow: 1,
        },
        filterDiv: {
            backgroundColor: 'white'
        }
    },
    filterStyles: {
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightBold,
        },
    },
    filterContainerStyles: {
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightBold,
        },
        filterAccordion: {
            boxShadow: 'none',
            margin: '0px !important',
        },
        filterAccordionSummary: {
            margin: '0px !important',
        },
    },
    checkBoxFilterStyle: {
        root: {
            display: 'flex',
        },
        formControl: {
        },
    }
}));

export default function Shopping() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = useState({
        products: []
    });

    const init = () => {
        listProducts().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    products: data
                });
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
                <div className={classes.drawerHeader} />
                <BannerImage />
                <ProductCarausel />
                <ProductCategories />
                <HowItWorks />
                <ContactUsSection />

                <Box pt={4}>

                    <FooterSection />
                </Box>
            </main>
        </div>
    );
}
