import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { FormControl, RadioGroup, FormControlLabel, Radio, Typography, Paper, Button, Grid, Divider, Box } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';
import { isAuthenticated } from 'auth';
import { listAddresses } from 'apis/address';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        float: 'left'
    },
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    }, paper: {
        padding: theme.spacing(3),
        margin: theme.spacing(3)
    }
}));

export default function AddressSelection() {
    const classes = useStyles();
    const { user, token } = isAuthenticated();
    const [addresses, setAddresses] = useState([]);
    const [value, setValue] = useState(0);
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    function init (){
        listAddresses(user._id, token).then(data => {
            setAddresses(data.addresses);
        });
    }

    useEffect(() => {
        init();
    }, []);


    return (
        <Paper className={classes.paper}>
            <FormControl component="fieldset" className={classes.root}>
                <Typography component="legend" style={{ marginBottom: 30 }}>Endereço de entrega</Typography>
                <Box alignItems="flex-start" display="flex" flexWrap="nowrap" >
                    <Grid container>
                        <Grid item md={12} >
                            <RadioGroup aria-label="address" name="nick" value={value} onChange={handleChange}>
                                {addresses? addresses.map((address, index) => (
                                    <>
                                        {JSON.stringify(index)}
                                        <Box display="flex" flexWrap="nowrap"
                                            alignItems="center" >
                                            <FormControlLabel value={index} control={<Radio />} />
                                            <Box>
                                                <Typography variant='h5'>
                                                    {address.nick}
                                                </Typography>
                                                <Typography>
                                                    Endereço: {address.logradouro}, {address.number} - {address.bairro}
                                                </Typography>
                                                <Typography>
                                                    CEP: {address.cep}
                                                </Typography>
                                                <Typography>
                                                    {address.localidade}, {address.uf}
                                                </Typography>
                                                <Button variant='contained'>
                                                    Editar
                                                </Button>
                                                <Button variant='contained'>
                                                    Excluir
                                                </Button>
                                            </Box>
                                        </Box>
                                        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                                    </>
                                )): <></>}
                            </RadioGroup>
                        </Grid>
                    </Grid>
                </Box>
            </FormControl>
            <Box>
                <Button variant='outlined' style={{ marginRight: 10 }} href='/Address/create' >
                    <AddCircleOutline style={{ marginRight: 10 }} />
                    Adicionar Endereço
                </Button>
                <Button variant='outlined'>
                    Alterar Endereço
                </Button>
            </Box>
        </Paper>
    );
}