import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Avatar, Badge, Paper, Typography, Box, IconButton, FormControl, TextField } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { MdSend } from 'react-icons/md';
import { FaShare } from 'react-icons/fa';
import { Form } from 'components/Form/useForm';
import { AiFillLike, AiTwotoneDislike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';

import imgProfile from 'assets/img/Sandro.jpg';

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);




const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    commentContent: {
        padding: theme.spacing(3),

    },
    newComment: {


    }

}));



function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

let like = 78;
let dislike = 9;


export default function Comments() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.commentContent} elevation={0}>
                <Grid container className={classes.newComment}>

                    <Grid item xs={2}>
                        <Box display="flex" justifyContent="center" m={1} p={1}>
                            <StyledBadge overlap="circle" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                                <Avatar alt="Remy Sharp" src={imgProfile} style={{ width: '40px', height: '40px' }} />
                            </StyledBadge>
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <Form>
                            <FormControl>
                                <TextField placeholder="adicione seu comentário" />
                            </FormControl>
                            <IconButton>
                                <MdSend />
                            </IconButton>
                        </Form>
                    </Grid>

                </Grid>





                <Grid container>
                    <Grid item xs={2}>
                        <Box display="flex" justifyContent="center" m={1} p={1}>
                            <StyledBadge overlap="circle" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                                <Avatar alt="Remy Sharp" src={imgProfile} style={{ width: '40px', height: '40px' }} />
                            </StyledBadge>
                        </Box>

                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="h5" >
                            Eddie Rocha
                            <Typography variant="span" style={{ color: '#bbbbbb', fontSize: '20px', paddingLeft: '10px' }} >
                                7 minutes ago
                            </Typography>
                        </Typography>
                        <Typography variant="body1">
                            `&quot;`  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco `&quot;`
                        </Typography>
                        <Typography align='right'>
                            <IconButton size='small' align='right'>
                                <AiFillLike />
                                {like}
                            </IconButton>
                            <IconButton size='small' align='right'>
                                <AiOutlineLike />
                                {like}
                            </IconButton>
                            <IconButton size='small' align='right'>
                                <AiOutlineDislike />
                                {dislike}
                            </IconButton>
                            <IconButton size='small' align='right'>
                                <AiTwotoneDislike />
                                {dislike}
                            </IconButton>
                            <IconButton size='small' align='right'>
                                <FaShare /> Compartilhar
                            </IconButton>
                        </Typography>


                    </Grid>

                </Grid>


            </Paper>



        </div>
    );
}
