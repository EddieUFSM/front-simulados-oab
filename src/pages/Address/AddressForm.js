import React, { useState } from 'react';
import { getCep } from 'admin/apiAdmin';
import { Button, TextField, CssBaseline, makeStyles, Paper, FormControl, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { createAddress } from 'admin/apiAdmin';
import { isAuthenticated } from 'auth';
import { Search } from '@material-ui/icons';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}));

export default function AddressForm() {
    const [values, setValues] = useState({
        nick: '',
        buyer: '',
        cep: '',
        bairro: '',
        complemento: '',
        ddd: '',
        number: '',
        gia: '',
        ibge: '',
        localidade: '',
        logradouro: '',
        siafi: '',
        uf: '',
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const {
        nick,
        buyer,
        cep,
        bairro,
        complemento,
        ddd,
        number,
        gia,
        ibge,
        localidade,
        logradouro,
        siafi,
        uf,
    } = values;
    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const { user, token } = isAuthenticated();


    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    function handleClick() {
        const nCep = cep.replace(/-/g, '');
        if (nCep.length === 8) {
            setValues({ ...values, cep: nCep });
            getCep(nCep).then(data => {
                setValues({
                    ...values,
                    bairro: data.bairro,
                    complemento: data.complemento,
                    ddd: data.ddd,
                    gia: data.gia,
                    ibge: data.ibge,
                    localidade: data.localidade,
                    logradouro: data.logradouro,
                    siafi: data.siafi,
                    uf: data.uf
                });
                setError(false);
                console.log(data);


            });
        } else {
            console.log('error');
        }
    }


    const clickSumit = event => {
        event.preventDefault();
        setLoading(true);
        setError(false);
        setSuccess(false);

        setValues({ ...values, 'buyer': user._id });
        console.log(values);
        createAddress(user._id, token, values).then(data => {
            if (data.error) {
                setMessage(data.message);
                setError(data.error);
                setSuccess(data.success);
                setLoading(false);
            } else {
                setValues(values);
                setSuccess(data.success);
                setError(data.error);
                setSuccess(data.success);
                setLoading(false);
            }
        });
    };

    return (

        <Container component="main" maxWidth="xs">

            <CssBaseline />
            <Paper noValidate autoComplete="off" className={classes.form} style={{ padding: 30 }}>
                <TextField
                    onChange={handleChange('nick')}
                    margin="normal"
                    value={values.nick}
                    placeholder='Identificação. Ex: Casa, Trabalho'
                    variant="outlined"
                    label='Identificação. Ex: Casa, Trabalho'
                    fullWidth
                />

                <TextField
                    onChange={handleChange('cep')}
                    margin="normal"
                    name="cep"
                    label="CEP"
                    value={values.cep}
                    placeholder="CEP"
                    variant="outlined"
                />
                <IconButton onClick={handleClick} style={{ margin: 20 }}><Search /></IconButton>

                <TextField
                    onChange={handleChange('logradouro')}
                    margin="normal"
                    value={values.logradouro}
                    placeholder='Logradouro'
                    variant="outlined"
                    label='Logradouro'
                    fullWidth
                />


                <TextField
                    onChange={handleChange('number')}
                    margin="normal"
                    value={values.number}
                    type='number'
                    placeholder='Número'
                    variant="outlined"
                    label='Número'
                    fullWidth
                />

                <TextField
                    onChange={handleChange('complemento')}
                    margin="normal"
                    value={values.complemento}
                    placeholder='Complemento'
                    variant="outlined"
                    label='Complemento'
                    fullWidth
                />


                <TextField
                    onChange={handleChange('localidade')}
                    margin="normal"
                    value={values.localidade}
                    placeholder='Localidade'
                    variant="outlined"
                    label='Cidade'
                    fullWidth
                />

                <TextField
                    onChange={handleChange('bairro')}
                    margin="normal"
                    value={values.bairro}
                    placeholder='Bairro'
                    variant="outlined"
                    label='Bairro'
                    fullWidth
                />

                <FormControl variant="outlined" className={classes.formControl} style={{ width: '100%' }} >
                    <Button onClick={(e) => clickSumit(e)} variant="outlined" justify="center"> Adicionar </Button>
                </FormControl>
            </Paper>
        </Container>


    );
}