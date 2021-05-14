import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link, Grid, Container } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        margin: 'auto',
        marginTop: theme.spacing(4),
    },
    details: {
        display: "flex",
        flexDirection: "column"
    },
    content: {
        flex: "1 0 auto"
    },
    cover: {
        width: '100%'
    },
    controls: {
        display: "flex",
        alignItems: "center",
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    playIcon: {
        height: 38,
        width: 350
    }
}));

export default function MediaControlCard() {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Container>
            <Grid container spacing={6}>
                <Grid item md={6} sm={12}>
                    <Card className={classes.root}>
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography component="h5" variant="h5">
                                    Live From Space
                    </Typography>
                                <Typography component="subtitle1" variant="subtitle1">
                                    11 de Junho de 2021
                    </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Resumo are a widespread group of cakes, with over 6,000 species, ranging
                                    across all worlds except earth
                    </Typography>
                                <Link>
                                    Leia mais ...
                        </Link>
                            </CardContent>

                        </div>
                        <CardMedia
                            className={classes.cover}
                            image="https://images.unsplash.com/photo-1502465771179-51f3535da42c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80"
                            title="Live from space album cover"
                        />
                    </Card>

                </Grid>
                <Grid item md={6} sm={12}>
                    <Card className={classes.root}>
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography component="h5" variant="h5">
                                    Live From Space
                    </Typography>
                                <Typography component="subtitle1" variant="subtitle1">
                                    11 de Junho de 2021
                    </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Resumo are a widespread group of cakes, with over 6,000 species, ranging
                                    across all worlds except earth
                    </Typography>
                                <Link>
                                    Leia mais ...
                        </Link>
                            </CardContent>

                        </div>
                        <CardMedia
                            className={classes.cover}
                            image="https://images.unsplash.com/photo-1502465771179-51f3535da42c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80"
                            title="Live from space album cover"
                        />
                    </Card>

                </Grid>

            </Grid>
        </Container>

    );
}
