import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { isAuthenticated, signout } from 'auth'
import { editUser, deleteUser } from 'admin/apiAdmin'


const useStyles = makeStyles((theme) => ({
  root: {},
  bt: {
    margin: theme.spacing(1)

  }
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { user, token } = isAuthenticated()
  const [values, setValues] = useState({
    firstName: user.firstName,
    surname: user.surname,
    email: user.email,
    cell: user.cell,
  })

  const history = useHistory();
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, name) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const deleteProfile = (event) => {
    deleteUser(user._id, token).then(data => {
      if (data.error) {
        setMessage(data.message)
        setError(data.error)
        setSuccess(data.success)
      } else {
        setMessage(data.message)
        setError(data.error)
        setSuccess(data.success)
        signout(() => {
          history.push('/home')
        })
      }
    })
  }

  const clickSumit = event => {
    console.log(values)
    event.preventDefault();
    setMessage('')
    editUser(user._id, token, values).then(data => {
      if (data.error) {

        setMessage(data.message)
        setError(data.error)
        setSuccess(data.success)
      } else {
        setValues({
          ...values, firstName: data.firstName,
          surname: data.surname,
          email: data.email,
          cell: data.cell,
        })
        setMessage(data.message)
        setError(data.error)
        setSuccess(data.success)
      }
    });
  }

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Suas informações podem ser editadas aqui"
          title="Perfil"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Por Favor difgite seu primeiro nome"
                label="Nome"
                name="firstName"
                onChange={e => handleChange(e, 'firstName')}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Sobrenome"
                name="surname"
                onChange={e => handleChange(e, 'surname')}
                required
                value={values.surname}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={e => handleChange(e, 'email')}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="cell"
                onChange={e => handleChange(e, 'cell')}
                type="number"
                value={values.cell}
                variant="outlined"
              />
            </Grid>

          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
          m={1}

        >
          <Button
            color="primary"
            variant="contained"
            className={classes.bt}
            onClick={e => clickSumit(e)}
          >
            Atualizar
          </Button>
          <Button
            style={{ backgroundColor: "#CF3D33", color: "white" }}
            className={classes.bt}
            variant="contained"
            onClick={handleClickOpen}
          >
            Deletar Perfil
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Você tem certeza que gostaria de deletar seu perfil?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Ao Excluir sua conta, todos os seus dados não serão mantidos. Todo o seu progresso no simulados, todo seu histórico de pedidos e todas suas interações com nosso blog será deletado. Essa ação não tem volta.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Voltar
              </Button>
              <Button
                onClick={e => deleteProfile(e)}
                color="primary"
                className={classes.bt}
                variant="contained"
                autoFocus>
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
