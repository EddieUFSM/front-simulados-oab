import React, { forwardRef } from 'react';
import { Chip, Container } from '@material-ui/core';
import { PropTypes } from 'prop-types';
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
    tags = ['Livro', 'Direito', 'Direito', 'Direito do Trabalho', 'Vólia Bomfim Cassar'],
}) => {
    const classes = useStyles();
    return (
        <Container style={{ margin: '30px' }}>
            <div className={classes.root}>
                {tags.map((k) => (
                    <Chip key={k} label={k} />
                ))}
            </div>
        </Container>
    );
});

Tags.displayName = 'Tags';
Tags.propTypes = {
    style: PropTypes.object
};

export default Tags;
export const proptype = Tags.PropTypes;