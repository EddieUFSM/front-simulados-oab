
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button } from '@material-ui/core';
import { ImageOutlined } from '@material-ui/icons';
import { useForm, Form } from '../Form/useForm';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
    },
    toolbar: {
        alignItems: 'center',
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',

        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },


}));

const initialFValues = {
    name: '',
    description: '',
    autor: '',
    price: 0,
    category: [],
    qnt: 0,
    photo: [],
    shipping: ''
};

export default function UserForm() {
    const classes = useStyles();
    const {
        values,
        setValues,
        handleInputChange
    } = useForm(initialFValues);


    return (

        <Form className={classes.root}>

            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        label="Nome"
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <input accept="image/*" name="image" className={classes.input} style={{ display: 'none' }} id="raised-button-file" multiple type="file" />
                    <label htmlFor="raised-button-file">
                        <Button color="primary" variant="outlined" component="span" aria-label="add" size="large">
                            <ImageOutlined /> Adicionar Imagem
                        </Button>
                    </label>

                </Grid>

            </Grid>

        </Form>

    );
}