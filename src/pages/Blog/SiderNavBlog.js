import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, List, ListItem } from '@material-ui/core/';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin: 'auto',
        marginTop: theme.spacing(4),
        backgroundColor: '#eeeeee'

    },
    container: {
        margin: theme.spacing(4)
    },
    inputNewsLetter: {
        width: 345,
        spacing: theme.spacing(2)
    },
    formNewsletterPaper: {
        margin: theme.spacing(4)
    }
}));

export default function ImgMediaCard() {
    const classes = useStyles();

    return (
        <Container >
            <Grid container className={classes.container}>
                <Grid item sm={12} md={8}>
                    <Card className={classes.root}>
                    </Card>
                </Grid>
                <Grid item sm={12} md={4}>
                    <Grid container>
                        <Grid item sm={12}>
                            <Card className={classes.root} elevation={0}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom> Sobre Nós</Typography>
                                    <Typography variant="h5" component="h2">  Simulados </Typography>
                                    <Typography className={classes.pos} color="textSecondary"> Adjetivo</Typography>
                                    <Typography variant="body2" component="p"> Queremos ser o meio para você consquitar o sucesso </Typography>
                                    <Link size="small">Leia Mais ...</Link>
                                </CardContent>

                            </Card>

                        </Grid>
                        <Grid item sm={12}>
                            <Card elevation={0} className={classes.root}>
                                <CardContent>
                                    <List>
                                        <ListItem>
                                            <Link> Dezembro </Link>
                                        </ListItem>
                                        <ListItem>
                                            <Link> Novembro </Link>
                                        </ListItem>
                                        <ListItem>
                                            <Link> Outubro </Link>
                                        </ListItem>
                                        <ListItem>
                                            <Link> Setembro </Link>
                                        </ListItem>
                                        <ListItem>
                                            <Link> Agosto </Link>
                                        </ListItem>
                                        <ListItem>
                                            <Link> Julho </Link>
                                        </ListItem>
                                        <ListItem>
                                            <Link> Junho </Link>
                                        </ListItem>
                                        <ListItem>
                                            <Link> Maio </Link>
                                        </ListItem>
                                        <ListItem>
                                            <Link> Abril </Link>
                                        </ListItem>
                                        <ListItem>
                                            <Link> Março </Link>
                                        </ListItem>
                                        <ListItem>
                                            <Link> Fevereiro </Link>
                                        </ListItem>
                                        <ListItem>
                                            <Link> Janeiro </Link>
                                        </ListItem>
                                    </List>

                                </CardContent>

                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>

    );
}