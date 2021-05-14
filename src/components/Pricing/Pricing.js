import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { MdStarBorder } from "react-icons/md";


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  
  },
  subscriptionPlan: {
    paddingBottom:theme.spacing(10)
  }
}));

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: ['Acesso ao questionário', 'Acesso as respostas', 'material de apoio', 'suporte por e-mail Prioridade C'],
    buttonText: 'Assine de graça',
    buttonVariant: 'outlined',
  },
  {
    title: 'Full',
    subheader: 'Mais Popular',
    price: '20',
    description: [
      'Pro +', 'dúvidas com especialistas', 'Acesso a questões comentadas', 'suporte por e-mail Prioridade A'

    ],
    buttonText: 'Começe agora',
    buttonVariant: 'contained',
  },
  {
    title: 'Pro',
    price: '15',
    description: [
      'Free +', 'Suporte por e-mail Prioridade B', 'Promos Exclusivas da Loja', 'material adicional'
    ],
    buttonText: 'Assinatura econômica',
    buttonVariant: 'outlined',
  },
];


export default function Pricing() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent} >
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Planos
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Encontre o melhor plano sob-medida para seus estudos e passar na prova do exame da Ordem.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end" className={classes.subscriptionPlan}>
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
              
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    action={tier.title === 'Full' ? <MdStarBorder /> : null}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography component="h2" variant="h3" color="textPrimary">
                        R${tier.price}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        /mo
                    </Typography>
                    </div>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography component="li" variant="subtitle1" align="center" key={line}>
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant={tier.buttonVariant} color="primary">
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
