import React, { useState, useEffect, Fragment, forwardRef } from "react"
import { CardHeader, CardContent, Grid, Container, Card, Toolbar, Typography, Button, TextField, makeStyles, useTheme } from '@material-ui/core';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdMenu } from 'react-icons/md'
import Pagination from '@material-ui/lab/Pagination'
import { isAuthenticated } from 'auth'
import { endSimulated } from 'admin/apiAdmin'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
}))

export default function GameSecondFase() {
    const classes = useStyles()
    const theme = useTheme()
    const { user, token } = isAuthenticated()
    const [secondFaseSimulated, setSecondFaseSimulated] = useState({})

    return (
        <>

        </>
    )
}