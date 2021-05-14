import React, { forwardRef } from 'react';
import { Chip, Container } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },

  },
}));

const Tags = forwardRef(({
  tags = ["Livro", "Direito", "Direito", "Direito do Trabalho", "Vólia Bomfim Cassar"],
}) => {
  const classes = useStyles();


  return (
    <Container style={{ margin: "30px" }}>
      <div className={classes.root}>
        {tags.map((k) => (
          <Chip label={k} />
        ))}
      </div>
    </Container>

  );

}
)

export default Tags
