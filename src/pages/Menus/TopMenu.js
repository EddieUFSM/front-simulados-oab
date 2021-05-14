import React, { Fragment, useEffect, useState } from "react"
import { API } from 'config'
import { IconButton, Badge, Button, ButtonBase, Avatar, makeStyles, Menu, Tooltip, Grid } from '@material-ui/core'
import { GrDrag, } from 'react-icons/gr'
import { MdAccountCircle, MdMail, MdShoppingCart, MdNotifications, MdBuild, MdExitToApp } from 'react-icons/md'
import { useHistory } from "react-router-dom"
import { isAuthenticated, signout, isAdmin } from "auth"

import { getListProductsCard } from 'admin/apiAdmin'

import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import logo from "assets/img/logoB.png";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        height: '100vh'
    },
    menuIcon: {
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(1)
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

    iconButton: {
        padding: 10
    },

    icon: {
        marginRight: theme.spacing(2),
    }

}))

export default function TopMenu({ card, ...rest }) {
    const history = useHistory();
    const classes = useStyles();
    const { user } = isAuthenticated()

    const [listProducts, setListProducts] = useState({})
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')

    const init = () => {
        isAuthenticated() ?
            getListProductsCard(isAuthenticated().user.token, isAuthenticated().user.currentShoppingCard).then(data => {
                if (data.error) {
                    setSuccess(data.success)
                    setError(data.error)
                    setMessage(data.message)
                } else {
                    console.log("lista de produtos: " + data.listProducts)
                    setListProducts(data.listProducts)
                    setSuccess(data.success)
                    setError(data.error)
                    setMessage(data.message)
                }
            })
            : console.log('não autenticado')
    }

    useEffect(() => {
        init()
    }, [])

    const goToProfile = (e) => {
        history.push("/User/Account")
    }

    return (
        <Fragment>
            <img src={logo} alt="logo" className={classes.logo} />
            <div className={classes.grow} />
            {isAuthenticated() &&
                <Fragment>
                    <PopupState variant="popover">
                        {(popupState) => (
                            <Fragment>
                                <IconButton className={classes.iconsMenu} color='inherit'  {...bindTrigger(popupState)} >
                                    <GrDrag />
                                </IconButton>
                                <Menu {...bindMenu(popupState)}>
                                    <Grid container justify="center">
                                        <Grid item md={4} >
                                            <Tooltip title="Notificações" aria-label="Notificações">
                                                <IconButton color="inherit">
                                                    <Badge badgeContent={0} color="secondary">
                                                        <MdNotifications />
                                                    </Badge>
                                                </IconButton>
                                            </Tooltip>

                                        </Grid>
                                        <Grid item md={4} >
                                            <Tooltip title="Configurações" aria-label="Configurações">
                                                <IconButton color="inherit" >
                                                    <Badge color="secondary">
                                                        <MdBuild />
                                                    </Badge>
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item md={4} >
                                            <Tooltip title="Mensagens" aria-label="Mensagens">
                                                <IconButton
                                                    className={classes.iconsMenu}
                                                    color='inherit'
                                                    badgeContent={4}
                                                    href="/MailBox"
                                                >
                                                    <MdMail />
                                                </IconButton>
                                            </Tooltip>

                                        </Grid>
                                        <Grid item md={4} >
                                            <Tooltip title="Carrinho" aria-label="Carrinho">
                                                <IconButton
                                                    className={classes.iconsMenu}
                                                    color='inherit'
                                                    badgeContent={4}
                                                    href="/Card"
                                                >
                                                    <Badge badgeContent={listProducts ? listProducts.length : 0} color="secondary">
                                                        <MdShoppingCart />
                                                    </Badge>

                                                </IconButton>
                                            </Tooltip>

                                        </Grid>
                                        <Grid item md={4} >
                                            <Tooltip title="Sair" aria-label="Sair">
                                                <IconButton
                                                    className={classes.iconsMenu}
                                                    color='inherit'
                                                    badgeContent={4}
                                                    onClick={() => signout(() => {
                                                        history.push('/home')
                                                    })}
                                                >
                                                    <MdExitToApp />
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </Menu>
                            </Fragment>
                        )}
                    </PopupState>
                    {isAdmin() &&
                        <Badge color="primary" badgeContent={"Admin"} anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                            style={{ marginLeft: '25px' }}
                        >
                            <ButtonBase color="primary" variant="outlined" component="span" aria-label="add" size="large" onClick={(e) => goToProfile(e)}>
                                <Avatar src={`${API}/user/photo/${user._id}`} />
                            </ButtonBase>
                        </Badge>
                    }
                    {!isAdmin() &&
                        <Badge color="primary" style={{ marginLeft: '25px' }}>
                            <ButtonBase color="primary" variant="outlined" component="span" aria-label="add" size="large" style={{ borderRadius: '50%' }} onClick={(e) => goToProfile(e)}>
                                <Avatar src={`${API}/user/photo/${user._id}`} />
                            </ButtonBase>
                        </Badge>
                    }
                </Fragment>
            }
            {
                !isAuthenticated() &&
                <Button color="primary" variant="outlined" href="/signin" startIcon={<MdAccountCircle></MdAccountCircle>}>Login</Button>
            }
        </Fragment >
    );
}
