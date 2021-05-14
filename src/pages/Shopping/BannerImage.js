import React from 'react';
import {
  withStyles,
  Theme,
  WithStyles,
  createStyles,
} from '@material-ui/core/styles';

import {
  Button, Typography
} from '@material-ui/core';

import BannerImageLayout from './BannerImageLayout';

const backgroundImage = 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';

const styles = (theme: Theme) =>
  createStyles({
    background: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundColor: '#7fc7d9', // Average color of the background image.
      backgroundPosition: 'center',
    },
    button: {
      minWidth: 200,
    },
    h5: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(10),
      },
    },
    more: {
      marginTop: theme.spacing(2),
    },
    titleMarked: {
      position: "relative",
      width: 100,
      background: "#ff3366",
      height: 4,
      bottom: -2,
      left: 'calc(50% - 50px)',
      transition: theme.transitions.create('opacity'),
    },
  });

function BannerImage(props: WithStyles<typeof styles>) {
  const { classes } = props;

  return (
    <BannerImageLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Dê um upgrade nos seus Estudos
        <div className={classes.titleMarked} />
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        Aproveite nossas ofertas especiais de até 70% off em produtos selecionados para se preparar para OAB.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href="/Signup"
      >
        Cadastre-se
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Descubra um novo jeito de estudar
      </Typography>
    </BannerImageLayout>
  );
}

export default withStyles(styles)(BannerImage);
