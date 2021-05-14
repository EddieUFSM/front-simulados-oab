import React, { makeStyles } from 'react';

import {
    Typography, Card, CardActionArea, CardActions,
    CardContent, CardMedia, Button, IconButton
} from '@material-ui/core';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Rating from '@material-ui/lab/Rating';

import livro from "assets/img/livro.png";


export default function ProductCard() {
    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Produto"
                    height="210"
                    image={livro}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Vade Mecum 2019
            </Typography>
                    <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                    <Typography gutterBottom variant="h6" component="h3">
                        R$ 89,90
            </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button variant="outlined" color="primary">
                    Conferir
          </Button>
                <IconButton color="primary" aria-label="add to shopping cart" style={{ marginLeft: "40%" }}>
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
