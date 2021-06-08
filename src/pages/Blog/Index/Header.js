import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles, Card, CardMedia, Typography, Box, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {

    },

    media: {
        height: 'auto',
        color: 'white'
    },
    bannerContent: {
        height: '100%',
        fontWeight: '600',
        backgroundColor: '#00000080',
        padding: theme.spacing(8),
    }
}));

export default function Header() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                title="Contemplative Reptile"
            >

                <Box className={classes.bannerContent} spacing={2}>
                    <Container>
                        <Typography variant="h2">Title of a longer featured blog post</Typography>
                        <Typography variant="h5">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what is most interesting in this post is contents.</Typography>
                        <Link
                            component="button"
                            variant="subtitle1"
                        >
                            Button Link ...
                        </Link>

                    </Container>
                </Box>



            </CardMedia>
        </Card>
    );
}