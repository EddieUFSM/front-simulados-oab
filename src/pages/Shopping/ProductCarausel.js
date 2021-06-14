import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { API } from 'config';
import {
    Typography, Container, Card, CardActionArea, CardActions,
    CardContent, CardMedia, Button, IconButton
} from '@material-ui/core';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Rating from '@material-ui/lab/Rating';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'assets/styles/owl_carousel_override.css';

import { getAllProducts } from 'apis';

const styles = (theme) => ({
    root: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(4),
    },
    productCarousel: {
        marginTop: theme.spacing(8)
    },
    titleMarked: {
        position: 'relative',
        width: 50,
        background: '#ff3366',
        height: 4,
        bottom: -2,
        left: 'calc(50% - 25px)',
        transition: theme.transitions.create('opacity'),
    },
});

function ProductCarausel(props) {
    const settings = {
        autoplay: true,
        lazyLoad: true,
        rewind: true,
        margin: 20,
        loop: true,
        responsiveClass: true,
        autoHeight: true,
        autoplayTimeout: 7000,
        smartSpeed: 800,
        nav: true,
        responsive: {
            0: {
                items: 1
            },

            600: {
                items: 3
            },

            1024: {
                items: 4
            },

            1366: {
                items: 4
            }
        }
    };
    const { classes } = props;
    const [productList, setProductList] = useState([]);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const init = () => {
        getAllProducts().then(data => {
            if (data.error) {
                setProductList(data.products);
                setMessage(data.message);
                setError(data.error);
                setSuccess(data.success);
            } else {
                setProductList(data.products);
                setMessage(data.message);
                setError(data.error);
                setSuccess(data.success);
            }
        });
    };

    useEffect(() => {
        init();
    }, []);


    return (
        <Container className={classes.root} component="section">
            <Typography variant="h4" marked="center" align="center" component="h2">
        Produtos
                <div className={classes.titleMarked} />
            </Typography>

            <OwlCarousel
                className={`owl-theme ${classes.productCarousel}`}
                {...settings}
            >
                {productList ? productList.map((product, index) => (
                    <div className="item" key={index}>
                        <ProductCard product={product} />
                    </div>
                )) : <></>}
            </OwlCarousel>
        </Container>
    );
}

function ProductCard({ product }) {
    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Produto"
                    height="210"
                    src={`${API}/product/photos/${product._id}/${0}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {product.name}
                    </Typography>
                    <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                    <Typography gutterBottom variant="h6" component="h3">
                        {product.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button variant="outlined" color="primary" href={'/product/' + product._id + '/Single'}>
          Conferir
                </Button>
                <IconButton color="primary" aria-label="add to shopping cart" style={{ marginLeft: '40%' }}>
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default withStyles(styles)(ProductCarausel);
