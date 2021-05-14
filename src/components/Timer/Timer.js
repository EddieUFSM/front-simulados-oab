import React, { Fragment, useEffect, useState } from "react"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Timer(props) {
  const [seconds, setSeconds] = useState(props.seconds);
  const { className } = props;
  const [finish, setFinish] = useState(false)

  const [open, setOpen] = React.useState(false);

  const [time, setTime] = useState(10)


  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setOpen(true)
    }
  });

  const minutes = Math.floor(seconds / 60)

  const hour = Math.floor(minutes / 60)

  return (
    <Fragment>
      <div className={className} >
        {hour}:{minutes - hour * 60}:{(seconds - minutes * 60)}
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"O Tempo Acabou!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Você acertou X de XX questões.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary">
            Visite o Resultado detalhado
          </Button>
          <Button color="primary">
            Finaliazar
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>

  );
}
