import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import profilePhoto from "assets/img/livro.png";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const classes = useStyles();
  const [productList, setProductList] = useState([
    { img: profilePhoto, name: 'Product 1', desc: 'A nice thing', qnt: 2, price: 9.99 },
    { img: profilePhoto, name: 'Product 2', desc: 'Another thing', qnt: 1, price: 3.45 },
    { img: profilePhoto, name: 'Product 3', desc: 'Something else', qnt: 4, price: 6.51 },
  ]);
  const frete = 20;
  const payments = [
    { name: 'Bandeira', detail: 'Visa' },
    { name: 'Nome no Cartão', detail: 'Eduardo' },
    { name: 'Número do cartão', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Validade', detail: '04/2024' },
  ];


  function mult(multiplicador, multiplicando) {
    return (multiplicando * multiplicador)
  }

  function subtotal() {
    let subtotal = 0;
    productList.map(({ price, qnt }) => {
      subtotal = subtotal + (price * qnt)
    })
    return subtotal
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Ordem do Pedido
      </Typography>
      <List disablePadding>
        {productList.map((product) => (

          <ListItem className={classes.listItem} key={product.name}>
            <Grid container>
              <Grid item sm={9}>
                <Box alignItems="flex-start" display="flex"
                  flexWrap="nowrap">
                  <img src={product.img} style={{ maxWidth: 100, height: 'auto' }} />
                  <ListItemText primary={product.name} secondary={product.desc} />

                </Box>

              </Grid>
              <Grid item sm={1}>
                <Typography variant="body2">{product.qnt}</Typography>

              </Grid>
              <Grid item sm={1}>
                <Typography variant="body2">{product.price}</Typography>
              </Grid>
              <Grid item sm={1}>
                <Typography variant="body2">{mult(product.qnt, product.price)}</Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Subtotal" />
          <Typography variant="subtitle1" className={classes.total}>
            {subtotal()}
          </Typography>

        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Frete" />
          <Typography variant="subtitle1" className={classes.total}>
            {frete}
          </Typography>

        </ListItem>
        <ListItem className={classes.listItem} >
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {subtotal() + frete}
          </Typography>

        </ListItem>
      </List>
      <Grid container spacing={2}>

        <Grid item container direction="column" xs={12} sm={12}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Detalhes de Pagamento
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
