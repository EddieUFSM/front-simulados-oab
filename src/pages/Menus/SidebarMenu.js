import React, { Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { Box, List, ListItem, ListItemIcon, Typography, Button, ListItemText, Divider } from '@material-ui/core'
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { HomeOutlined, ShoppingCartOutlined, AccountBox, BallotOutlined, HistoryOutlined, ReportOutlined, SettingsOutlined, MarkunreadMailboxOutlined, AccountCircle, LibraryBooks, PostAdd, Description, Ballot, PeopleAlt } from '@material-ui/icons'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import { isAuthenticated, signout, isAdmin } from "../../auth"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import StarBorder from "@material-ui/icons/StarBorder";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        height: '100vh',
        listStyle: 'none',
        overflowX: 'hidden'
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
    divider: {
        height: 28,
        margin: 4
    },

    nested: {
        paddingLeft: theme.spacing(4)
    }
}))

export default function SideBarMenu() {
    const classes = useStyles();
    const [openBlogOptions, setOpenBlogOptions] = useState(false);
    const [openShoppingOptions, setOpenShoppingOptions] = useState(false);
    const [openSimuladosOptions, setOpenSimuladosOptions] = useState(false);
    const [openPrimeiraFaseOptions, setOpenPrimeiraFaseOptions] = useState(false);
    const history = useHistory();
    const [openUsersOptions, setOpenUsersOption] = useState(false);
    const { user, token } = isAuthenticated()

    const handleClickBlog = () => {
        setOpenBlogOptions(!openBlogOptions);
    }
    const handleClickPrimeiraFase = () => {
        setOpenPrimeiraFaseOptions(!openPrimeiraFaseOptions)
    }
    const handleClickShopping = () => {
        setOpenShoppingOptions(!openShoppingOptions);
    }
    const handleClickSimulados = () => {
        setOpenSimuladosOptions(!openSimuladosOptions);
    }
    const handleClickUsers = () => {
        setOpenUsersOption(!openUsersOptions)
    }

    return (
        <Fragment>
            {/** Menu Lateral parte 01*/}
            <List classes={{ root: classes.MuiList }} style={{ overflowX: 'hidden' }}>
                {/** Menu Lateral parte 01*/}

                <ListItem button key={'Início'} classes={{ root: classes.listItem }} component={RouterLink} to="/home">
                    <ListItemIcon> <HomeOutlined /> </ListItemIcon>
                    <ListItemText classes={{
                        primary: classes.ListItemText
                    }} primary={'Início'} />
                </ListItem>


                <List component="nav" aria-labelledby="nested-list-subheader" className={classes.listItem} >
                    <ListItem button onClick={handleClickPrimeiraFase}>
                        <ListItemIcon>
                            <Ballot />
                        </ListItemIcon>
                        <ListItemText primary="Primeira Fase" />
                        {openPrimeiraFaseOptions ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openPrimeiraFaseOptions} timeout="auto" unmountOnExit>
                        <ListItem button classes={{ root: classes.nested }} component={RouterLink} to="/FirstFase/Menu">
                            <ListItemIcon> <Ballot /> </ListItemIcon>
                            <ListItemText classes={{
                                primary: classes.ListItemText
                            }} primary={'Primeira Fase Customizada'} />
                        </ListItem>
                        <ListItem button classes={{ root: classes.nested }} component={RouterLink} to="/FirstFase/SimulatedByExam">
                            <ListItemIcon> <Ballot /> </ListItemIcon>
                            <ListItemText classes={{
                                primary: classes.ListItemText
                            }} primary={'Primeira Fase Por Prova'} />
                        </ListItem>
                        {isAdmin() &&
                            <Fragment>
                                <ListItem button key={'Buscar Questão'} classes={{ root: classes.nested }} component={RouterLink} to="/Questions/Search">
                                    <ListItemIcon> <BallotOutlined /> </ListItemIcon>
                                    <ListItemText classes={{
                                        primary: classes.ListItemText
                                    }} primary={'Buscar Questão'} />
                                </ListItem>
                                <ListItem button key={'Criar Questão'} classes={{ root: classes.nested }} component={RouterLink} to="/Question/create">
                                    <ListItemIcon> <BallotOutlined /> </ListItemIcon>
                                    <ListItemText classes={{
                                        primary: classes.ListItemText
                                    }} primary={'Criar Questão'} />
                                </ListItem>
                                <ListItem button key={'Criar Tema'} classes={{ root: classes.nested }} component={RouterLink} to="/Theme/Create">
                                    <ListItemIcon> <BallotOutlined /> </ListItemIcon>
                                    <ListItemText classes={{
                                        primary: classes.ListItemText
                                    }} primary={'Criar Tema'} />
                                </ListItem>
                                <ListItem button key={'Criar Exame'} classes={{ root: classes.nested }} component={RouterLink} to="/exam/Create">
                                    <ListItemIcon> <BallotOutlined /> </ListItemIcon>
                                    <ListItemText classes={{
                                        primary: classes.ListItemText
                                    }} primary={'Criar Exame'} />
                                </ListItem>
                            </Fragment>
                        }

                    </Collapse>
                </List>

                {/**
* Segunda Fase
*
*/}
                {/* 
                <List component="nav" aria-labelledby="nested-list-subheader" className={classes.listItem} >
                    <ListItem button onClick={handleClickSimulados}>
                        <ListItemIcon>
                            <Ballot />
                        </ListItemIcon>
                        <ListItemText primary="Segunda Fase" />
                        {openSimuladosOptions ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openSimuladosOptions} timeout="auto" unmountOnExit>
                        <ListItem button classes={{ root: classes.nested }} component={RouterLink} to="/FirstFase/Menu">
                            <ListItemIcon> <Ballot /> </ListItemIcon>
                            <ListItemText classes={{
                                primary: classes.ListItemText
                            }} primary={'Primeira Fase'} />
                        </ListItem>
                        {isAdmin() &&
                            <Fragment>

                                <ListItem button key={'Buscar Questão Dissertativa'} classes={{ root: classes.nested }} component={RouterLink} to="/EssayQuestion/search">
                                    <ListItemIcon> <BallotOutlined /> </ListItemIcon>
                                    <ListItemText classes={{
                                        primary: classes.ListItemText
                                    }} primary={'Buscar Questão Dissertativa 2° fase'} />
                                </ListItem>
                                <ListItem button key={'Criar Questão Dissertativa'} classes={{ root: classes.nested }} component={RouterLink} to="/EssayQuestion/create">
                                    <ListItemIcon> <BallotOutlined /> </ListItemIcon>
                                    <ListItemText classes={{
                                        primary: classes.ListItemText
                                    }} primary={'Criar Questão Dissertativa 2° fase'} />
                                </ListItem>
                                <ListItem button key={'Buscar Peça'} classes={{ root: classes.nested }} component={RouterLink} to="/Piece/Search">
                                    <ListItemIcon> <BallotOutlined /> </ListItemIcon>
                                    <ListItemText classes={{
                                        primary: classes.ListItemText
                                    }} primary={'Buscar Peça 2° fase'} />
                                </ListItem>
                                <ListItem button key={'Criar Peça'} classes={{ root: classes.nested }} component={RouterLink} to="/Piece/Create">
                                    <ListItemIcon> <BallotOutlined /> </ListItemIcon>
                                    <ListItemText classes={{
                                        primary: classes.ListItemText
                                    }} primary={'Criar Peça 2° fase'} />
                                </ListItem>

                            </Fragment>
                        }

                    </Collapse>
                </List>
 */}


                {/**
                    * Shopping
                    *
                    */}

                {/*
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.listItem}
                >
                    <ListItem button onClick={handleClickShopping}>
                        <ListItemIcon>
                            <ShoppingCart />
                        </ListItemIcon>
                        <ListItemText primary="Shopping" />
                        {openShoppingOptions ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openShoppingOptions} timeout="auto" unmountOnExit>

                        {isAuthenticated() &&
                            <Fragment>
                                <ListItem button classes={{ root: classes.nested }} component={RouterLink} to="/Checkout">
                                    <ListItemIcon> <BallotOutlined /> </ListItemIcon>
                                    <ListItemText classes={{
                                        primary: classes.ListItemText
                                    }} primary={'Checkout'} />
                                </ListItem>

                            </Fragment>

                        }
                        {isAdmin() &&
                            <Fragment>
                                <ListItem button classes={{ root: classes.nested }} component={RouterLink} to="/Products/Search">
                                    <ListItemIcon> <BallotOutlined /> </ListItemIcon>
                                    <ListItemText classes={{
                                        primary: classes.ListItemText
                                    }} primary={'Buscar Produto'} />
                                </ListItem>
                                <ListItem button classes={{ root: classes.nested }} component={RouterLink} to="/Product/Create">
                                    <ListItemIcon> <BallotOutlined /> </ListItemIcon>
                                    <ListItemText classes={{
                                        primary: classes.ListItemText
                                    }} primary={'Criar Produto'} />
                                </ListItem>
                                <ListItem button classes={{ root: classes.nested }} component={RouterLink} to="/Category/create">
                                    <ListItemIcon> <BallotOutlined /> </ListItemIcon>
                                    <ListItemText classes={{
                                        primary: classes.ListItemText
                                    }} primary={'Criar Categoria'} />
                                </ListItem>

                            </Fragment>
                        }
                        <ListItem button key={'Loja'} classes={{ root: classes.nested }} component={RouterLink} to="/Shopping">
                            <ListItemIcon> <ShoppingCartOutlined /> </ListItemIcon>
                            <ListItemText classes={{
                                primary: classes.ListItemText
                            }} primary={'Loja'} />
                        </ListItem>


                    </Collapse>
                </List>
 */}
                {/**
                    * ADM
                    *
                    */}
                {isAdmin() &&
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        className={classes.listItem}
                    >
                        <ListItem button onClick={handleClickUsers}>
                            <ListItemIcon>
                                <PeopleAlt />
                            </ListItemIcon>
                            <ListItemText primary="Usuários" />
                            {openUsersOptions ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openUsersOptions} timeout="auto" unmountOnExit>
                            <ListItem button classes={{ root: classes.nested }} component={RouterLink} to="/Users">
                                <ListItemIcon> <BallotOutlined /> </ListItemIcon>
                                <ListItemText classes={{
                                    primary: classes.ListItemText
                                }} primary={'Lista Usuários'} />
                            </ListItem>

                        </Collapse>
                    </List>
                }


                {/**
                    * Blog
                    *
                    */}
                {/*         <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.listItem}
                >
                    <ListItem button onClick={handleClickBlog}>
                        <ListItemIcon>
                            <LibraryBooks />
                        </ListItemIcon>
                        <ListItemText primary="Blog" />
                        {openBlogOptions ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openBlogOptions} timeout="auto" unmountOnExit>

                        <List component="div" disablePadding>
                            {
                                isAdmin() &&
                                <ListItem button classes={{ root: classes.nested }} component={RouterLink} to="/Post/Create">
                                    <ListItemIcon> <PostAdd /> </ListItemIcon>
                                    <ListItemText classes={{
                                        primary: classes.ListItemText
                                    }} primary={'Criar Post'} />
                                </ListItem>

                            }
                            <ListItem button classes={{ root: classes.nested }} component={RouterLink} to="/Post/Single">
                                <ListItemIcon> <Description /> </ListItemIcon>
                                <ListItemText classes={{
                                    primary: classes.ListItemText
                                }} primary={'Post'} />
                            </ListItem>
                            <ListItem button classes={{ root: classes.nested }} component={RouterLink} to="/Blog">
                                <ListItemIcon> <CollectionsBookmarkIcon /> </ListItemIcon>
                                <ListItemText classes={{
                                    primary: classes.ListItemText
                                }} primary={'Blog'} />
                            </ListItem>

                        </List>
                    </Collapse>
                </List>

 */}
            </List>







            <Divider />
            {/** Menu Lateral parte 02*/}
            {isAuthenticated() &&
                <Fragment>
                    <List classes={{ root: classes.MuiList }}>
                        <ListItem button key={'Configuração'} classes={{ root: classes.listItem }} component={RouterLink} to="/User/Account">
                            <ListItemIcon> <SettingsOutlined /> </ListItemIcon>
                            <ListItemText classes={{
                                primary: classes.ListItemText
                            }} primary={'Configurações'} />
                        </ListItem>
                        <ListItem button classes={{ root: classes.listItem }} component={RouterLink} to="/User/Account">
                            <ListItemIcon> <AccountBox /> </ListItemIcon>
                            <ListItemText classes={{
                                primary: classes.ListItemText
                            }} primary={'Conta do Usuário'} />
                        </ListItem>
                        <ListItem button key={'Relatórios'} classes={{ root: classes.listItem }} component={RouterLink} to={"/report/" + user.report}>
                            <ListItemIcon> <ReportOutlined /> </ListItemIcon>
                            <ListItemText classes={{
                                primary: classes.ListItemText
                            }} primary={'Relatórios'} />
                        </ListItem>
                        <ListItem button key={'Mensagens'} classes={{ root: classes.listItem }} component={RouterLink} to="/mailBox">
                            <ListItemIcon><MarkunreadMailboxOutlined /></ListItemIcon>
                            <ListItemText classes={{
                                primary: classes.ListItemText
                            }} primary={'Mensagens'} />
                        </ListItem>
                        <ListItem button key={'Historico'} classes={{ root: classes.listItem }} component={RouterLink} to="/Historic">
                            <ListItemIcon> <HistoryOutlined /> </ListItemIcon>
                            <ListItemText classes={{
                                primary: classes.ListItemText
                            }} primary={'Histórico'} />
                        </ListItem>
                    </List>
                    <Divider />

                </Fragment>

            }


            {/** Menu Lateral parte 03*/}

            {!isAuthenticated() &&
                <Box p={4}>
                    <Typography variant="body2">
                        Faça login para responder o Simulado da OAB
                    </Typography>
                    <Button
                        variant='outlined'
                        color='primary'
                        startIcon={<AccountCircle />}
                        href="/signin"
                    >
                        Fazer Login
                    </Button>
                </Box>

            }

            {isAuthenticated() &&
                <Box p={4}>
                    <Typography variant="body2">
                        Faça login para responder o Simulado da OAB
                    </Typography>
                    <Button
                        variant='outlined'
                        color='primary'
                        startIcon={<AccountCircle />}
                        onClick={() => signout(() => {
                            history.push('/home')
                        })}
                    >
                        Logout
                    </Button>
                </Box>

            }
            <Divider />
        </Fragment>
    )
}