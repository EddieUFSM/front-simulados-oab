
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import Rating from '@material-ui/lab/Rating';
import { Container, Paper } from '@material-ui/core';
import ImageCarousel from 'components/Carousel/ImageCarousel';
import ProductsCarousel from 'components/Carousel/ProductsCarousel';
import { getProduct, addProduct } from 'apis';
import { isAuthenticated } from 'auth';
import { FaFacebook, FaPinterest, FaShoppingCart } from 'react-icons/fa';
import { AiFillTwitterCircle } from 'react-icons/ai';
import Comments from 'pages/Comments/Comments';
import Tags from 'components/Tags/Tags';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin: 'auto',
        marginTop: '30px'
    },
    page: {
        padding: '50px',
        marginTop: '30px',
        marginBottom: '30px'
    },
    media: {
        height: 0,
        width: '100%',
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function RecipeReviewCard() {
    const classes = useStyles();
    const { idProduct } = useParams();
    const [product, setProduct] = useState({});
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const { user, token } = isAuthenticated();

    const init = () => {
        getProduct(token, idProduct).then(data => {
            if (data.error) {
                setProduct(data);
            } else {
                setProduct(data);
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const clickSumit = event => {
        event.preventDefault();
        setLoading(true);
        setError(false);
        setSuccess(false);
        addProduct(user._id, token, product._id).then(data => {
            if (data.error) {
                setMessage(data.message);
                setError(data.error);
                setSuccess(data.success);
                setLoading(false);
            } else {
                setMessage(data.message);
                setError(data.error);
                setSuccess(data.success);
                setLoading(false);
            }
        });

    };

    return (
        <div>
            <Container>
                <Paper className={classes.page}>
                    <Grid container spacing={1} alignContent='center' alignItems='center'>
                        <Grid item xs={12} style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }} alignItems='center' alignContent='center'>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" href="/" onClick={handleClick}>
                  Shopping
                                </Link>
                                <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
                  Livros
                                </Link>
                                <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
                  Direito
                                </Link>
                                <Typography color="textPrimary">Direito do Trabalho</Typography>
                            </Breadcrumbs>
                        </Grid>

                        <Grid item xs={8} md={6} sm={12} alignContent='center' alignItems='center'>
                            <ImageCarousel
                                style={{ maxHeight: '440px', MaxWidth: '400px', margin: '10px' }}
                                item={product}
                            />

                        </Grid>
                        <Grid container xs={4} md={6} sm={12} alignContent='center' alignItems='center' style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                            <Grid item xs={12}>
                                <Typography variant="h4">{product.title}</Typography>
                                <Typography variant="subtitle1">{product.author}</Typography>
                                <Typography variant="h3">{product.price}</Typography>
                                <Typography variant="span">ou até 10x de R$ ?</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {product.description}
                                </Typography>
                                <Rating
                                    name="customized-empty"
                                    defaultValue={1}
                                    precision={0.5}
                                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="outlined" >Comprar</Button><IconButton onClick={(e) => clickSumit(e)}><FaShoppingCart /> </IconButton>
                            </Grid>
                            <Grid item xs={12}>
                                <IconButton aria-label="share"><ShareIcon /></IconButton>
                                <IconButton aria-label="share"><FaFacebook /></IconButton>
                                <IconButton aria-label="share"><AiFillTwitterCircle /></IconButton>
                                <IconButton aria-label="share"><FaPinterest /></IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Tags />
                    <ProductsCarousel
                        images={['/img/DireitoConstitucional.jpg', '/img/DireitoConstitucional.jpg', '/img/DireitoConstitucional.jpg', '/img/DireitoConstitucional.jpg', '/img/DireitoConstitucional.jpg', '/img/DireitoConstitucional.jpg', '/img/DireitoConstitucional.jpg', '/img/DireitoConstitucional.jpg', '/img/DireitoConstitucional.jpg', '/img/DireitoConstitucional.jpg']}
                    />
                    <Comments />
                </Paper>
            </Container>
        </div>
    );
}
