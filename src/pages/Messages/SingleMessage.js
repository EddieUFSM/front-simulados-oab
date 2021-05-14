import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography, IconButton, Divider, Grid, Avatar, Box, Container, Button } from '@material-ui/core';
import { MdFlag } from 'react-icons/md';
import { ArrowDropDown, DeleteForever, DragHandle, DragIndicator, Flag, FlagOutlined, Forward, Replay, Reply, ReplyAll, StarOutlined } from '@material-ui/icons';
import { GrDrag, GrTrash } from 'react-icons/gr';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    pageContent: {
        padding: theme.spacing(3),
        backgroundColor: 'transparent',
        border: 'none'
    },
    buttonMail: {
        margin: theme.spacing(1)
    }
}));


const message = {
    subject: "O Título da Mensagem",
    message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    flag: false,
    from: "email@email.com"
}

export default function EnhancedTable() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.pageContent} elevation={0}>
                <Container>
                    <Grid container>
                        <Grid item md={6}>
                            <Box display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1} >
                                <Avatar style={{ marginLeft: '10px', marginRight: '10px' }} />
                                <Typography variant="h5" style={{ paddingTop: '10px' }}>
                                    {message.subject}
                                </Typography>
                                <IconButton>
                                    {message.flag ? <Flag /> : <FlagOutlined />}
                                </IconButton>
                            </Box>
                        </Grid>



                    </Grid>
                    <Grid container>
                        <Grid item md={6}>
                            <Box display="flex" flexDirection="row">
                                <Typography variant='subtitle1' style={{ margin: '10px' }}>
                                    Para {message.from}
                                </Typography>
                                <IconButton>
                                    <ArrowDropDown />
                                </IconButton>
                            </Box>


                        </Grid>
                        <Grid item md={6} style={{ paddingBottom: '30px' }}>
                            <Box display="flex" flexDirection="row" justifyContent="flex-end">
                                <Typography variant='subtitle2' style={{ margin: '10px' }}> 6 de nov. de 2020 15:22 (há 5 dias)</Typography>
                                <IconButton>
                                    <StarOutlined />
                                </IconButton>
                                <IconButton>
                                    <Reply />
                                </IconButton>
                                <IconButton>
                                    <DeleteForever />
                                </IconButton>
                                <IconButton>
                                    <DragIndicator />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item md={12}>
                            <Divider />
                            <Typography variant="body1" style={{ padding: '50px' }}>
                                {message.message}
                            </Typography>
                        </Grid>

                        <Grid item md={12}>
                            <Button className={classes.buttonMail} variant="contained"><Reply />  Responder</Button>
                            <Button className={classes.buttonMail} variant="contained"><ReplyAll />  Responder a Todos</Button>
                            <Button className={classes.buttonMail} variant="contained"><Forward /> Encaminhar</Button>
                        </Grid>
                    </Grid>

                </Container>

            </Paper>
        </div>
    );
}
