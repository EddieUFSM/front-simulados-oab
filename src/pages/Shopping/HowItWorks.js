import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PaymentIcon from '@material-ui/icons/PaymentOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOnOutlined';

const styles = (theme) => ({
  root: {
    display: 'flex',
    backgroundColor: "#E8F7FF",
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 55,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing(8),
  },
  titleMarked: {
    position: "relative",
    width: 50,
    background: "#ff3366",
    height: 4,
    bottom: -2,
    left: 'calc(50% - 25px)',
    transition: theme.transitions.create('opacity'),
  },
  icon: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
});

function HowItWorks(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="https://material-ui.com/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Typography
          variant="h4"
          marked="center"
          className={classes.title}
          component="h2"
        >
          Como Funciona?
          <div className={classes.titleMarked} />
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>1.</div>
                <ShoppingCartIcon fontSize="large" className={classes.icon} />
                <Typography variant="h5" align="center">
                  Escolha seus produtos preferidos e adicione ao carrinho
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>2.</div>
                <MonetizationOnIcon fontSize="large" className={classes.icon} />
                <Typography variant="h5" align="center">
                  Novas Ofertas toda semana. Aproveite as ofertas e tenha descontos.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>3.</div>
                <PaymentIcon fontSize="large" className={classes.icon} />
                <Typography variant="h5" align="center">
                  Complete o pagamento com Paypal, MasterCard, Visa e demais bandeiras.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          className={classes.button}
          component="a"
          href="/premium-themes/onepirate/sign-up/"
        >
          Começe agora
        </Button>
      </Container>
    </section>
  );
}

HowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HowItWorks);
