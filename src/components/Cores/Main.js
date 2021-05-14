import React from "react"
import clsx from 'clsx';
import {
  Modal,
  Container,
  Grid,
  Paper,
  Fade,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Backdrop
} from '@material-ui/core';
import useStyles from "../../assets/styles/Dashboard"
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";

export default function Main() {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    history.push("/AddQuestion")
  };

  const handleClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Card>
            <CardContent>
              
            <button type="button" onClick={handleOpen}>
              <mdAdd></mdAdd>
            </button>

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <h2 id="transition-modal-title">Transition modal</h2>
                  <p id="transition-modal-description">react-transition-group animates me.</p>
                </div>
              </Fade>
            </Modal>
              
            </CardContent>
          </Card>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>

          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>

          </Paper>
        </Grid>
      </Grid>

      <Box pt={4}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="">
            Simulados OAB
                </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>

      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition

        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Card className={classes.root}>
            <CardContent>
              <TextField
                id="outlined-multiline-static"
                label="Enuncado"
                multiline
                rows={4}
                defaultValue="Escreva o enúnciado"
                variant="outlined"
              />
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    </Container>
  )
}

