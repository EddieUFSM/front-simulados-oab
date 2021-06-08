import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { IconButton, Grid, Box, Container, Button, TextField } from '@material-ui/core';
import { DeleteForever, Send } from '@material-ui/icons';

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
    subject: 'O Título da Mensagem',
    message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    flag: false,
    from: 'email@email.com'
};

export default function EnhancedTable() {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <Paper className={classes.pageContent} elevation={0}>

                <Container>
                    <Grid container spacing={1} alignItems="flex-end">


                        <Grid item md={12}>
                            <TextField
                                label='Assunto'
                                placeholder='Dúvidas sobre'
                                style={{ width: '100%' }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={12}>
                            <TextField
                                label='para'
                                placeholder='email@email.com'
                                style={{ width: '100%' }}
                                variant="outlined"
                                spacing={1} alignItems="flex-end"
                            />
                        </Grid>
                        <Grid item md={12} spacing={1} alignItems="flex-end">
                            <TextField
                                style={{ width: '100%' }}
                                label='Mensagem'
                                placeholder="Mensagem"
                                rows={8}
                                multiline
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item md={12}>
                            <Box display="flex" flexDirection="row" justifyContent="flex-end" m={1} p={1}>
                                <Button className={classes.buttonMail} variant="contained"><Send />  Enviar</Button>
                                <IconButton>
                                    <DeleteForever />
                                </IconButton>
                            </Box>

                        </Grid>
                    </Grid>

                </Container>

            </Paper>
        </div>
    );
}
