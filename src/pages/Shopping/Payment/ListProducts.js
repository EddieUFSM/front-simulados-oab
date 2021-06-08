import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import { Container } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { getCard } from 'admin/apiAdmin';

import { isAuthenticated } from 'auth';
import { Paper, TextField } from '@material-ui/core';
import ShowImage from 'pages/Shopping/Product/ShowImage';

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    }, paper: {
        padding: theme.spacing(3),
        margin: theme.spacing(3)
    }
}));

export default function ListOfProducts({ card }) {
    const classes = useStyles();
    const frete = 20;
    const payments = [
        { name: 'Bandeira', detail: 'Visa' },
        { name: 'Nome no Cartão', detail: 'Eduardo' },
        { name: 'Número do cartão', detail: 'xxxx-xxxx-xxxx-1234' },
        { name: 'Validade', detail: '04/2024' },
    ];

    const [Card, setCard] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    const init = () => {
        isAuthenticated() ?
            getCard(isAuthenticated().user.token, isAuthenticated().user.currentShoppingCard).then(data => {
                console.log(data);
                if (data.error) {
                    setSuccess(data.success);
                    setError(data.error);
                    setMessage(data.message);
                } else {
                    setCard(data.card.products);
                    setSuccess(data.success);
                    setError(data.error);
                    setMessage(data.message);
                }
            })
            : console.log('não autenticado');
    };

    useEffect(() => {
        init();
    }, []);


    function mult(multiplicador, multiplicando) {
        return (multiplicando * multiplicador);
    }

    function subtotal() {
        let subtotal = 0;
        Card.map(({ price, qnt }) => {
            subtotal = subtotal + (price * qnt);
        });
        return subtotal;
    }

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...Card];

        if (value == 0) {
            list.splice(index, 1);
            setCard(list);
            return;
        }
        list[index][name] = value;
        setCard(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...Card];
        list.splice(index, 1);
        setCard(list);
    };

    return (
        <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>  Carrinho de Compras </Typography>
            <List disablePadding>
                {Card ? Card.map((product, i) => (
                    <>
                        <ListItem className={classes.listItem} key={product.name}>
                            <Grid container>
                                <Grid item sm={12} md={2} style={{
                                    minHeight: '150px',
                                }}>
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        minHeight='100%'
                                    >
                                        <ShowImage item={product} url="product" index={0} />
                                    </Box>
                                </Grid>
                                <Grid item sm={12} md={5}
                                    style={{
                                        minHeight: '200px',
                                    }}>
                                    <Box display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        minHeight='100%'>
                                        <ListItem>
                                            <ListItemText primary={product.name} secondary={product.description} />
                                        </ListItem>
                                    </Box>
                                </Grid>
                                <Grid item sm={3} md={1}
                                    style={{
                                        minHeight: '200px',
                                    }}>
                                    <Box display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        minHeight='100%'>
                                        <TextField
                                            style={{ width: 60, height: 20, marginTop: -32, marginLeft: 10, marginRight: 10 }}
                                            variant='outlined'
                                            type='number'
                                            name='qnt'
                                            value={product.qnt}
                                            onChange={e => handleInputChange(e, i)}
                                        />
                                    </Box>

                                </Grid>
                                <Grid item sm={3} md={1}
                                    style={{
                                        minHeight: '200px',
                                    }}>
                                    <Box display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        minHeight='100%'>
                                        <Typography
                                            style={{ marginLeft: 10, marginRight: 10 }}
                                            variant="body2">R$ {product.price.toFixed(2)}</Typography>

                                    </Box>
                                </Grid>
                                <Grid item sm={3} md={1}
                                    style={{
                                        minHeight: '200px',
                                    }}>
                                    <Box display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        minHeight='100%'>
                                        <Typography variant="body2"
                                            style={{ marginLeft: 10, marginRight: 10 }}
                                        >R$ {mult(product.qnt, product.price).toFixed(2)}</Typography>

                                    </Box>
                                </Grid>
                                <Grid item sm={3} md={1}
                                    style={{
                                        minHeight: '200px',
                                    }}>
                                    <Box display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        minHeight='100%'>
                                        <IconButton edge="end" aria-label="delete"
                                            style={{ marginLeft: 10, marginRight: 10 }}>
                                            <DeleteIcon
                                                onClick={() => handleRemoveClick(product)}
                                            />

                                        </IconButton>

                                    </Box>
                                </Grid>
                            </Grid>
                        </ListItem>

                        <Divider></Divider>
                    </>
                )) : <></>}
                <Container>
                    <ListItem className={classes.listItem} style={{ marginRight: 50 }} >
                        <ListItemText primary="Subtotal" style={{ textAlign: 'right', marginRight: 20 }} />
                        <Typography variant="subtitle1" className={classes.total}>
                            R$ {subtotal().toFixed(2)}
                        </Typography>
                    </ListItem>
                </Container>

            </List>
            <Box

            >
                <Button
                    variant='outlined'
                >
                    Continuar
                </Button>
            </Box>

        </Paper>
    );
}
