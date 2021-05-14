import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },

  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));


const footers = [
  {
    title: 'Empresa',
    description: ['Time', 'História', 'Entre em contato', 'Localização'],
  },
  {
    title: 'Lançamentos',
    description: ['Blog', 'Shopping', 'Novos Membros', 'Developers', 'Another one'],
  },
  {
    title: 'Recursos',
    description: ['OAB', 'Provas', 'Universidade', 'Ultimo recurso'],
  },
  {
    title: 'Legal',
    description: ['política de privacidade', 'termos de uso'],
  },
];

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
        Simulados OAB
        </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
      {' Developed by '}
      <Link href="https://curriculo-eduardo.rj.r.appspot.com/">
        Eduardo Rocha
        </Link>
    </Typography>
  );
}


export default function Footer() {
  const classes = useStyles();

  return (
    <Fragment>
      <Container maxWidth="lg" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>

        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </Fragment>
  )
}