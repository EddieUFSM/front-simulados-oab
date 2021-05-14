import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid } from '@material-ui/core/';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import imagePost from "assets/img/law.jpg";
import { Container } from '@material-ui/core';
import { ThemeConsumer } from 'styled-components';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        marginTop: theme.spacing(4),

    },
    container: {
    }
}))

export default function ImgMediaCard() {
    const classes = useStyles();

    return (
        <Container >
            <Grid container spacing={6}>
                <Grid item sm={12} md={4} >
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={imagePost}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2"> Título </Typography>
                                <Typography component="subtitle1" variant="subtitle1"> 11 de Junho de 2021 </Typography>
                                <Typography variant="body2" color="textSecondary" component="p"> Resumo are a widespread group of cakes, with over 6,000 species, ranging
                                    across all worlds except earth </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Compartilhar
                        </Button>
                            <Button size="small" color="primary">
                                Leia Mais
                        </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item sm={12} md={4}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={imagePost}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Título
                        </Typography>
                                <Typography component="subtitle1" variant="subtitle1">
                                    11 de Junho de 2021
                    </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Resumo are a widespread group of cakes, with over 6,000 species, ranging
                                    across all worlds except earth
                        </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Compartilhar
                        </Button>
                            <Button size="small" color="primary">
                                Leia Mais
                        </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item sm={12} md={4}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={imagePost}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Título
                        </Typography>
                                <Typography component="subtitle1" variant="subtitle1">
                                    11 de Junho de 2021
                    </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Resumo are a widespread group of cakes, with over 6,000 species, ranging
                                    across all worlds except earth
                        </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Compartilhar
                        </Button>
                            <Button size="small" color="primary">
                                Leia Mais
                        </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>


        </Container>
    );
}