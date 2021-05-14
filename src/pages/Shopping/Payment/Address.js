import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { FormControl, RadioGroup, FormControlLabel, Radio, Typography, Paper, Button, Grid, Divider, Box } from '@material-ui/core'
import { AddCircleOutline } from '@material-ui/icons';
import { isAuthenticated } from 'auth'

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
}))

export default function AdressSelection() {
    const classes = useStyles()
    const { user, token } = isAuthenticated()
    let addresses = [
        {
            nick: 'Casa',
            addressLineOne: 'Avenida Paulista',
            addressLineTwo: 'Apto. 1002',
            number: '258',
            ZipCode: '00000-000',
            country: 'Brasil',
            city: 'São Paulo'

        },
        {
            nick: 'Trabalho',
            addressLineOne: 'Avenida Paulista',
            addressLineTwo: 'Apto. 1002',
            number: '258',
            ZipCode: '00000-000',
            country: 'Brasil',
            city: 'São Paulo'

        }
    ]
    const [value, setValue] = React.useState(addresses[0].nick);
    const handleChange = (event) => {
        setValue(event.target.value);
    }
    console.log(user)


    return (
        <Paper className={classes.paper}>
            <FormControl component="fieldset" className={classes.root}>
                <Typography component="legend" style={{ marginBottom: 30 }}>Endereço de entrega</Typography>
                <Box alignItems="flex-start" display="flex" flexWrap="nowrap" >
                    <Grid container>
                        <Grid item md={12} >
                            <RadioGroup aria-label="address" name="nick" value={value} onChange={handleChange}>
                                {addresses.map((address) => (
                                    <>
                                        <Box alignItems="flex-start" display="flex" flexWrap="nowrap"
                                            alignItems="center" >
                                            <FormControlLabel value={address.nick} control={<Radio />} />
                                            <Box>
                                                <Typography variant='h5'>
                                                    {address.nick}
                                                </Typography>
                                                <Typography>
                                                    Endereço: {address.addressLineOne}, {address.number} - {address.addressLineTwo}
                                                </Typography>
                                                <Typography>
                                                    CEP: {address.ZipCode}
                                                </Typography>
                                                <Typography>
                                                    {address.country}, {address.city}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                                    </>
                                ))}
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
    )
}